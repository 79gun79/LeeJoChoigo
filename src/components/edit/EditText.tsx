import { StickyNote } from 'lucide-react';
import TagItem from '../ui/TagItem';
import type { EditTextProps, EditTextHandle } from './EditText.types';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// @ts-expect-error: prismjs has no type declarations
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import supabase from '../../utils/supabase';

const EditText = forwardRef<EditTextHandle, EditTextProps>(function EditText(
  { tags, onAddTag, onRemoveTag, problems },
  ref,
) {
  const editorRef = useRef<Editor>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getPostData: () => {
      const title = titleRef.current?.value.trim() || '';
      const content = editorRef.current?.getInstance().getMarkdown() || '';
      const match = content.match(/!\[.*?\]\((.*?)\)/g);
      const imageUrl = match?.[0]?.match(/\((.*?)\)/)?.[1] || null;
      const imageFileName = imageUrl?.split('/').pop() || null;
      return { title, content, imageUrl, imageFileName, tags };
    },
  }));
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {problems && (
          <div className="h-full w-full lg:grid lg:grid-rows-[auto_1fr] lg:pb-9">
            <p className="mb-2.5 text-sm md:text-base lg:text-lg">문제</p>
            <div className="mb-7 h-[250px] overflow-auto rounded-sm bg-[var(--color-bg-white)] p-2.5 text-xs md:text-sm lg:h-full lg:text-base">
              문제내용..
            </div>
          </div>
        )}
        <form className={`col-span-2 w-full ${problems && 'lg:col-span-1'}`}>
          <div className="mb-[25px] md:mb-[35px]">
            <p className="mb-2.5 text-sm md:text-base lg:text-lg">제목</p>
            <input
              className="edit-input mb-5"
              type="text"
              placeholder="제목을 입력하세요"
              name="title"
              ref={titleRef}
            />
            <div className="mb-2.5 flex items-end">
              <p className="text-sm md:text-base lg:text-lg">내용</p>
              <div className="ml-auto flex gap-2">
                <button className="button-sm">
                  <StickyNote className="h-[14px] w-[12px] shrink-0" /> 템플릿
                  불러오기
                </button>
                <button className="button-sm">
                  <StickyNote className="h-[14px] w-[12px] shrink-0" />
                  템플릿 저장
                </button>
              </div>
            </div>

            <div className="mb-5 min-h-[300px] rounded-sm border border-[#ccc] text-xs md:text-sm lg:text-base">
              <Editor
                ref={editorRef}
                initialValue="내용을 입력하세요."
                previewStyle="tab"
                initialEditType="markdown"
                useCommandShortcut={true}
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                hooks={{
                  addImageBlobHook: async (
                    blob: Blob,
                    callback: (url: string, altText: string) => void,
                  ) => {
                    const fileExt = blob.type.split('/')[1];
                    const today = new Date();
                    const yyyymmdd = today
                      .toISOString()
                      .slice(0, 10)
                      .replace(/-/g, '');
                    const fileName = `${yyyymmdd}/${Date.now()}.${fileExt}`;

                    const { error } = await supabase.storage
                      .from('post-images')
                      .upload(fileName, blob);

                    if (error) {
                      console.error('이미지 업로드 실패:', error.message);
                      return;
                    }

                    const { data } = supabase.storage
                      .from('post-images')
                      .getPublicUrl(fileName);

                    const imageUrl = data?.publicUrl;
                    if (imageUrl) {
                      callback(imageUrl, 'image');
                    }
                  },
                }}
              />
            </div>

            <p className="mb-2.5 text-sm md:text-base lg:text-lg">태그</p>
            <input
              className="edit-input mb-2.5"
              type="text"
              placeholder="태그를 입력하세요"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const value = e.currentTarget.value.trim();
                  if (value) {
                    onAddTag(value);
                    e.currentTarget.value = '';
                  }
                }
              }}
            />
            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <TagItem
                  key={tag}
                  label={tag}
                  onDelete={() => onRemoveTag(tag)}
                />
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
});
export default EditText;

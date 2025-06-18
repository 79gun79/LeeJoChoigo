import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { EditTextHandle, SolutionQuizProps } from './EditText.types';
import { Editor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// @ts-expect-error: prismjs has no type declarations
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import supabase from '../../utils/supabase';
import TagItem from '../ui/TagItem';

export default forwardRef<EditTextHandle, SolutionQuizProps>(
  function CreateQuizSolution({ pTitle, tags, onAddTag, onRemoveTag }, ref) {
    const editorRef = useRef<Editor>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
      const editorInstance = editorRef.current?.getInstance();
      if (editorInstance) {
        editorInstance.setMarkdown(markdown);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      getPostData: () => {
        const title = titleRef.current?.value.trim() || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';
        const match = content.match(/!\[.*?\]\((.*?)\)/g);
        const imageUrl = match?.[0]?.match(/\((.*?)\)/)?.[1] || null;
        const imageFileName = imageUrl?.split('/').pop() || null;
        return { title, content, imageUrl, imageFileName, tags };
      },
      setPostData: ({ title, content }) => {
        if (titleRef.current) titleRef.current.value = title;
        editorRef.current?.getInstance().setMarkdown(content);
      },
    }));

    // const currentPos = useRef<HTMLDivElement | null>(null);

    return (
      <>
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <form className="col-span-2 w-full">
            <div className="mb-[25px] md:mb-[35px]">
              <p className="mb-2.5 text-sm md:text-base lg:text-lg">제목</p>
              <input
                className="edit-input mb-5"
                type="text"
                defaultValue={`Re: ${pTitle}`}
                placeholder="제목을 입력하세요"
                ref={titleRef}
              />
              <div className="mb-2.5 flex items-end">
                <p className="text-sm md:text-base lg:text-lg">내용</p>
              </div>
              <div className="mb-5 min-h-[300px] rounded-sm border border-[#ccc] text-xs md:text-sm lg:text-base">
                <Editor
                  ref={editorRef}
                  placeholder="내용을 입력하세요"
                  previewStyle="tab"
                  initialEditType="markdown"
                  useCommandShortcut={true}
                  plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  onChange={() => {
                    const updated =
                      editorRef.current?.getInstance().getMarkdown() || '';
                    setMarkdown(updated);
                  }}
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
  },
);

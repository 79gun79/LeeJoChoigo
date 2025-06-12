import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { EditTextHandle, SolutionQuizProps } from './EditText.types';
import { Editor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// @ts-expect-error: prismjs has no type declarations
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import supabase from '../../utils/supabase';

export default forwardRef<EditTextHandle, SolutionQuizProps>(
  function CreateQuizSolution({ pTitle, tag }, ref) {
    const editorRef = useRef<Editor>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      getPostData: () => {
        const title = titleRef.current?.value.trim() || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';
        const match = content.match(/!\[.*?\]\((.*?)\)/g);
        const imageUrl = match?.[0]?.match(/\((.*?)\)/)?.[1] || null;
        const imageFileName = imageUrl?.split('/').pop() || null;
        const tags = [tag];
        return { title, content, imageUrl, imageFileName, tags };
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
                  initialValue="내용을 입력하세요"
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
              <div className="flex flex-wrap gap-2.5">
                <div className="mb-2">
                  <p className="mb-1.5 text-sm md:text-base">카테고리</p>
                  <div className="flex flex-wrap gap-2.5">
                    <div className="mb-4 flex flex-wrap gap-2.5">
                      <label className="rounded-sm bg-[#1BBFBF] px-2 py-1 text-xs text-white md:px-2.5 md:py-1.5 md:text-sm">
                        {tag}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  },
);

import { StickyNote } from 'lucide-react';
import TagItem from '../ui/TagItem';
import type { EditTextProps } from './EditText.types';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// @ts-expect-error: prismjs has no type declarations
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { useRef } from 'react';

export default function EditText({
  tags,
  onAddTag,
  onRemoveTag,
  problems,
}: EditTextProps) {
  const editorRef = useRef<Editor>(null);

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
                initialValue="내용을 입력하센"
                previewStyle="tab"
                initialEditType="markdown"
                useCommandShortcut={true}
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
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
}

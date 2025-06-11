// import { StickyNote } from 'lucide-react';
import { Plus } from 'lucide-react';
import QuizComponent from '../detail/QuizComponent';
import CheckItem from '../ui/CheckItem';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { QuizItem } from '../../types/quizList';
import type { CreateQuizHandle, CreateQuizProps } from './EditText.types';
import { Editor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// @ts-expect-error: prismjs has no type declarations
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import supabase from '../../utils/supabase';

export default forwardRef<CreateQuizHandle, CreateQuizProps>(
  function CreateQuiz({ problems }, ref) {
    const editorRef = useRef<Editor>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      getPostData: () => {
        const title = titleRef.current?.value.trim() || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';
        const match = content.match(/!\[.*?\]\((.*?)\)/g);
        const imageUrl = match?.[0]?.match(/\((.*?)\)/)?.[1] || null;
        const imageFileName = imageUrl?.split('/').pop() || null;
        return { title, content, imageUrl, imageFileName };
      },
    }));

    const [quizList, setQuizList] = useState<QuizItem[]>([]);
    const currentPos = useRef<HTMLDivElement | null>(null);

    const addQuiz = () => {
      const newQuiz: QuizItem = {
        description: '',
        quiz: [
          { id: 'A', selected: false, value: '' },
          { id: 'B', selected: false, value: '' },
          { id: 'C', selected: false, value: '' },
          { id: 'D', selected: false, value: '' },
        ],
      };

      setQuizList((v) => [...v, newQuiz]);
      setTimeout(() => {
        currentPos.current?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }, 100);
    };

    const deleteQuiz = (index: number) => {
      setQuizList((v) => v.filter((_, i) => i !== index));
    };

    const updateQuiz = (index: number, value: QuizItem) => {
      setQuizList((v) => v.map((q, i) => (i === index ? value : q)));
    };
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
                ref={titleRef}
              />
              <div className="mb-2.5 flex items-end">
                <p className="text-sm md:text-base lg:text-lg">내용</p>
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
              <div className="flex flex-wrap gap-2.5">
                <div className="mb-2">
                  <p className="mb-1.5 text-sm md:text-base">카테고리</p>
                  <div className="flex flex-wrap gap-2.5">
                    <div className="mb-4 flex flex-wrap gap-2.5">
                      <CheckItem id="1" title="프론트엔드" />
                      <CheckItem id="2" title="백엔드" />
                      <CheckItem id="3" title="모바일 앱" />
                      <CheckItem id="4" title="기타" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2 flex flex-col gap-[10px]">
                <p className="text-sm md:text-base">퀴즈생성</p>
                {quizList.map((v, i) => (
                  <div
                    key={i}
                    ref={i === quizList.length - 1 ? currentPos : null}
                  >
                    <QuizComponent
                      index={i}
                      item={v}
                      onDelete={deleteQuiz}
                      onChange={updateQuiz}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addQuiz}
                  disabled={quizList.length >= 10 ? true : false}
                  className="bg-gray3 t3 flex h-[40px] w-full cursor-pointer items-center justify-center rounded-[4px] text-white transition hover:shadow-lg active:bg-black disabled:hidden"
                >
                  <Plus size={24} />
                  <span className="ml-[3px]">문제 추가</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  },
);

import { Plus } from 'lucide-react';
import QuizComponent from './QuizComponent';
import CheckItem from '../ui/CheckItem';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { QuizItem } from '../../types/quizList';
import type { CreateQuizHandle, CreateQuizProps } from './EditText.types';
import { Editor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// @ts-expect-error: prismjs has no type declarations
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import supabase from '../../utils/supabase';
import { notify } from '../../utils/customAlert';
import { useThemeStore } from '../../stores/themeStore';
import { getToolbarItems } from '../../utils/editorToolbar';

export default forwardRef<CreateQuizHandle, CreateQuizProps>(
  function CreateQuiz({ quizValid }, ref) {
    const editorRef = useRef<Editor>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const [category, setCategory] = useState<string>('기타');

    useImperativeHandle(ref, () => ({
      getPostData: () => {
        const title = titleRef.current?.value.trim() || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';
        const match = content.match(/!\[.*?\]\((.*?)\)/g);
        const imageUrl = match?.[0]?.match(/\((.*?)\)/)?.[1] || null;
        const imageFileName = imageUrl?.split('/').pop() || null;
        const tags = [category];
        const quizData = quizList;
        return { title, content, imageUrl, imageFileName, tags, quizData };
      },
      setPostData: ({ title, content, tags, quizData }) => {
        if (titleRef.current) titleRef.current.value = title;
        editorRef.current?.getInstance().setMarkdown(content);
        setQuizList(quizData);
        setCategory(tags[0]);
      },
    }));

    const [quizList, setQuizList] = useState<QuizItem[]>([]);
    const [validList, setValidList] = useState<boolean[]>([]);
    const currentPos = useRef<HTMLDivElement | null>(null);
    const isDark = useThemeStore().isDark;

    const [markdown, setMarkdown] = useState(' ');

    useEffect(() => {
      const editorInstance = editorRef.current?.getInstance();
      if (editorInstance) {
        editorInstance.setMarkdown(markdown);
      }
    }, []);

    const addQuiz = () => {
      if (!allValid) {
        notify('퀴즈가 완성되지 않았습니다!', 'warning');
        return;
      }

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
      setValidList((v) => v.filter((_, i) => i !== index));
    };

    const updateQuiz = (index: number, value: QuizItem) => {
      setQuizList((v) => v.map((q, i) => (i === index ? value : q)));
    };

    const changeValid = (index: number, valid: boolean) => {
      setValidList((v) => {
        const copyValid = [...v];
        copyValid[index] = valid;
        return copyValid;
      });
    };

    const allValid = validList.every((v) => v);
    useEffect(() => {
      quizValid?.(allValid);
    }, [quizValid, allValid]);

    const toolbarItems = getToolbarItems(window.innerWidth);
    return (
      <>
        <form className="md:grid md:grid-cols-2 md:gap-12">
          <div className="mb-2 flex flex-col gap-[10px]">
            <p className="text-sm md:text-base lg:text-lg">퀴즈생성</p>
            {quizList.map((v, i) => (
              <div key={i} ref={i === quizList.length - 1 ? currentPos : null}>
                <QuizComponent
                  index={i}
                  item={v}
                  onDelete={deleteQuiz}
                  onChange={updateQuiz}
                  onValid={(valid) => changeValid(i, valid)}
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
          <div className="col-span-2 w-full md:col-span-1">
            <div className="mb-[25px] md:mb-[35px]">
              <p className="mb-2.5 text-sm md:text-base lg:text-lg">제목</p>
              <input
                className="edit-input mb-5 text-black"
                type="text"
                placeholder="제목을 입력하세요"
                ref={titleRef}
              />
              <div className="mb-2.5 flex items-end">
                <p className="text-sm md:text-base lg:text-lg">내용</p>
              </div>
              <div className="mb-5 min-h-[300px] rounded-sm text-xs md:text-sm lg:text-base">
                <Editor
                  toolbarItems={toolbarItems}
                  key={isDark ? 'dark' : 'light'}
                  ref={editorRef}
                  initialValue={markdown}
                  previewStyle="tab"
                  initialEditType="markdown"
                  useCommandShortcut={true}
                  plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  theme={isDark ? 'dark' : 'light'}
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
              <div className="flex flex-wrap gap-2.5">
                <div className="mb-2">
                  <p className="mb-1.5 text-sm md:text-base">카테고리</p>
                  <div className="flex flex-wrap gap-2.5">
                    <div className="mb-4 flex flex-wrap gap-2.5">
                      <CheckItem
                        id="1"
                        title="프론트엔드"
                        onChange={setCategory}
                        checked={category === '프론트엔드'}
                      />
                      <CheckItem
                        id="2"
                        title="백엔드"
                        onChange={setCategory}
                        checked={category === '백엔드'}
                      />
                      <CheckItem
                        id="3"
                        title="모바일 앱"
                        onChange={setCategory}
                        checked={category === '모바일 앱'}
                      />
                      <CheckItem
                        id="4"
                        title="기타"
                        onChange={setCategory}
                        checked={category === '기타'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  },
);

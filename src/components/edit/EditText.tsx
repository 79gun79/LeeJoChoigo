import { Globe, StickyNote } from 'lucide-react';
import TagItem from '../ui/TagItem';
import type { EditTextProps, EditTextHandle } from './EditText.types';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// @ts-expect-error: prismjs has no type declarations
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import supabase from '../../utils/supabase';
import { PulseLoader } from 'react-spinners';
import ProblemDescRender from '../common/ProblemDescRender';
import { useAuthStore } from '../../stores/authStore';
import { notify } from '../../utils/customAlert';
import 'prismjs/themes/prism-tomorrow.css';
import { useThemeStore } from '../../stores/themeStore';
import { getToolbarItems } from '../../utils/editorToolbar';

//import { te } from 'date-fns/locale';

const EditText = forwardRef<EditTextHandle, EditTextProps>(function EditText(
  { tags, onAddTag, onRemoveTag, isLoading, problem },
  ref,
) {
  // const problemDescRef = useRef<Editor>(null);
  const editorRef = useRef<Editor>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [markdown, setMarkdown] = useState('');

  const userId = useAuthStore((state) => state.session)?.user.id;
  const isDark = useThemeStore().isDark;

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.setMarkdown(markdown);
    }
  }, [isDark]);

  // useEffect(() => {
  //   if (!isLoading && problemDescRef.current && problemId && problemDesc) {
  //     const instance = problemDescRef.current.getInstance();
  //     instance.setMarkdown(
  //       `### 아래 문제 요약은 부정확할 수 있습니다. \n### 정확한 문제는 '백준 문제 보러가기' 버튼을 클릭해 확인하세요.\n\n\n` +
  //         problemDesc,
  //     );

  //     console.timeEnd('Mount → Render'); // ✅ 실제 화면에 나타나는 시점
  //     instance.getCurrentModeEditor().moveCursorToStart();
  //   }
  // }, [problemId, problemDesc, isLoading]);

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

  const openPopup = () => {
    window.open(`https://www.acmicpc.net/problem/${problem?.id}`, '_blank');
  };

  const saveTemplate = async () => {
    const content = editorRef.current?.getInstance().getMarkdown() || null;

    try {
      if (userId) {
        const { error } = await supabase
          .from('template')
          .upsert({ content, user: userId }, { onConflict: 'user' })
          .select();

        if (error) {
          console.error('템플릿 저장에 실패했습니다 ', error.message);
        }

        notify('템플릿이 저장되었습니다', 'success');
      }
    } catch (e) {
      console.error('템플릿 저장에 실패했습니다 ', e);
    }
  };

  const fetchTemplate = async () => {
    try {
      if (userId) {
        const { data: template, error } = await supabase
          .from('template')
          .select('content')
          .eq('user', userId)
          .single();

        if (error) {
          console.error('템플릿 불러오기에 실패했습니다 ', error.message);
        }
        if (template && template.content) {
          const instance = editorRef.current?.getInstance();
          instance.setMarkdown(template.content);
          instance.getCurrentModeEditor().moveCursorToStart();
        }
      }
    } catch (e) {
      console.error('템플릿 불러오기에 실패했습니다', e);
    }
  };

  const toolbarItems = getToolbarItems(window.innerWidth);

  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {problem && (
          <div className="h-full w-full lg:grid lg:grid-rows-[auto_1fr] lg:pb-9">
            <div className="mb-2.5 flex justify-between text-sm md:text-base lg:text-lg">
              <p>{problem.title}</p>
              <button onClick={openPopup} className="button-sm">
                <Globe className="h-[14px] w-[12px] shrink-0" />
                백준 문제 보러가기
              </button>
            </div>
            <div
              className={`problem-desc mb-7 h-[250px] overflow-y-auto rounded-sm p-2.5 text-xs md:text-sm lg:h-[63vh] lg:text-base`}
            >
              {isLoading && (
                <div className="flex items-center gap-[2px] font-semibold text-[var(--color-main)]">
                  {/* {problemDesc} */}
                  제미나이의 문제 요약 기다리는 중
                  <PulseLoader size={3} speedMultiplier={0.5} />
                </div>
              )}
              {!isLoading && problem.desc && (
                <ProblemDescRender isHeadingHidden={false}>
                  {problem.desc}
                </ProblemDescRender>
              )}
              {
                // 에디터로 렌더링
                /* <Editor
                ref={problemDescRef}
                initialValue={problemDesc}
                height="100%"
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
              /> */
              }
            </div>
          </div>
          /* {problems && (
            <div className="mb-7 h-[250px] overflow-auto rounded-sm bg-[var(--color-bg-white)] p-2.5 text-xs md:text-sm lg:h-full lg:text-base">
              {problems}
            </div>
          )} */
        )}

        <form className={`col-span-2 w-full ${problem && 'lg:col-span-1'}`}>
          <div className="mb-[25px] md:mb-[35px]">
            <p className="mb-2.5 text-sm md:text-base lg:text-lg">제목</p>
            <input
              className="edit-input mb-5 text-black"
              type="text"
              placeholder="제목을 입력하세요"
              name="title"
              ref={titleRef}
            />
            <div className="mb-2.5 flex items-end">
              <p className="text-sm md:text-base lg:text-lg">내용</p>

              {problem && (
                <div className="ml-auto flex gap-2">
                  <button
                    className="button-sm"
                    type="button"
                    onClick={fetchTemplate}
                  >
                    <StickyNote className="h-[14px] w-[12px] shrink-0" /> 템플릿
                    불러오기
                  </button>
                  <button
                    className="button-sm"
                    type="button"
                    onClick={saveTemplate}
                  >
                    <StickyNote className="h-[14px] w-[12px] shrink-0" />
                    템플릿 저장
                  </button>
                </div>
              )}
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
                onChange={() => {
                  const updated =
                    editorRef.current?.getInstance().getMarkdown() || '';
                  setMarkdown(updated);
                }}
                theme={isDark ? 'dark' : 'light'}
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
              className="edit-input mb-2.5 text-black"
              type="text"
              placeholder="태그를 입력하세요"
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) {
                  return;
                }

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

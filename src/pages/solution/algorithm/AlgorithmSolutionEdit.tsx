import { useEffect, useRef, useState, useTransition } from 'react';
import EditText from '../../../components/edit/EditText';
import PageName from '../../../components/ui/PageName';
import type { EditTextHandle } from '../../../components/edit/EditText.types';
import { useParams } from 'react-router';
// import { fetchBjProblemById } from '../../../utils/fetchBjProblems';
import { GoogleGenAI } from '@google/genai';
import supabase from '../../../utils/supabase';

const APIKEY = import.meta.env.VITE_API_GEMINI_KEY;

export default function AlgorithmSolutionEdit() {
  const [tags, setTags] = useState<string[]>([]);
  const editTextRef = useRef<EditTextHandle>(null);
  const params = useParams<string>().id;
  const [isLoading, startTransition] = useTransition();
  const [responseLoading, setResponseLoading] = useState(true);
  const [problemTitle, setProblemTitle] = useState<string>();
  const [problemDesc, setProblemDesc] = useState<string>(
    '### 백준 문제 보러가기를 클릭해 문제 확인 후 요약해보세요. \n\n제미나이의 문제 요약 기다리는중...',
  );

  const ai = new GoogleGenAI({ apiKey: APIKEY });

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  async function fetchProblemDesc() {
    console.time('Gemini → Render');
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `백준 문제 ${params}번 문제내용과 입출력 형식만 알려줘.`,
    });
    return response.text;
  }

  useEffect(() => {
    if (!params) return;

    startTransition(async () => {
      try {
        const { data: post, error } = await supabase
          .from('post')
          .select(`title, content`)
          .eq('solved_problem_id', parseInt(params, 10))
          .single();

        if (error) {
          console.error('알고리즘 문제를 가져오는 것에 실패했습니다.');
          return;
        }

        if (post.title) {
          setProblemTitle(`백준 ${params}번 : ${post.title}`);
        }

        if (post.content) {
          setProblemDesc(post.content);
        } else {
          console.log('제미나이에게 요청을 보냈습니다.');
          const content = await fetchProblemDesc();
          if (content) {
            setProblemDesc(content);

            const { error } = await supabase
              .from('post')
              .update({
                content,
                updated_at: new Date().toISOString(),
              })
              .eq('solved_problem_id', parseInt(params, 10));

            if (error) {
              console.error('문제 설명 저장 실패: ', error);
            }
          }
        }
      } catch (e) {
        console.error('문제 설명을 받아오는데 실패했습니다.', e);
      } finally {
        setResponseLoading(false);
      }
      // console.log(params);
    });
  }, [params]);

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="알고리즘풀이" />
        </div>

        <EditText
          ref={editTextRef}
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          isLoading={responseLoading}
          problemId={params}
          problemDesc={problemDesc}
          problemTitle={problemTitle}
        />
        <div className="mb-[25px] flex gap-3 md:mb-[35px] lg:justify-center">
          <button className="button-lg gray">취소</button>
          <button className="button-lg">작성하기</button>
        </div>
      </div>
    </>
  );
}

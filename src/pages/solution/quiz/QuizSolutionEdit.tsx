import PageName from '../../../components/ui/PageName';
import { useLoaderData, useNavigate } from 'react-router';
import supabase from '../../../utils/supabase';
import type { CreateQuizHandle } from '../../../components/edit/EditText.types';
import { useRef, useState } from 'react';
import { notify } from '../../../utils/customAlert';
import type { PostDetail } from '../../../types';
import type { QuizItem } from '../../../types/quizList';
import QuizShowComponent from '../../../components/edit/QuizShowComponent';
import CreateQuizSolution from '../../../components/edit/CreateQuizSolution';

export default function QuizSolutionEdit() {
  const problem = useLoaderData<PostDetail>();
  const problemTitle = (problem.title || '문제 정보 없음') as string;
  const [tags, setTags] = useState<string[]>(problem.tags || ['기타']);
  const quizData = (problem.quiz_data || []) as QuizItem[]; // 문제 가져오기

  const editTextRef = useRef<CreateQuizHandle>(null);
  const navigate = useNavigate();

  const handleAddTag = (tag: string) => {
    if (tags.length >= 5) return;
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    const postData = editTextRef.current?.getPostData();
    if (!postData) return;
    const { title, content, imageUrl, imageFileName } = postData;

    if (title === '') return notify('제목을 입력하세요!', 'info');
    if (content === '') return notify('내용을 입력하세요!', 'info');

    const { data: userData } = await supabase.auth.getUser();
    const authorId = userData.user?.id;
    if (!authorId) return;

    const { error } = await supabase.from('post').insert([
      {
        title,
        content,
        tags,
        image: imageUrl,
        image_public_id: imageFileName,
        channel: 4,
        is_yn: true,
        author: authorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        problem_id: problem.id,
      },
    ]);

    if (error) {
      console.error('저장 실패', error);
      notify('등록 실패!', 'warning');
    } else {
      notify('등록 성공!', 'success');
    }
    navigate('/solutions/job');
  };
  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="개발직군 풀이" />
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-[10px]">
            <p className="text-sm md:text-base lg:text-lg">문제 모음</p>
            {quizData.map((v, i) => (
              <QuizShowComponent key={i} index={i} item={v} />
            ))}
          </div>
          <CreateQuizSolution
            pTitle={problemTitle}
            tags={tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            ref={editTextRef}
          />
        </div>
        <div className="flex gap-3 lg:justify-center">
          <button onClick={() => navigate(-1)} className="button-lg gray">
            취소
          </button>
          <button onClick={handleSubmit} className="button-lg">
            작성하기
          </button>
        </div>
      </div>
    </>
  );
}

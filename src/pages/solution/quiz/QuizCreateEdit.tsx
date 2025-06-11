import PageName from '../../../components/ui/PageName';
import CreateQuiz from '../../../components/edit/CreateQuiz';
import { useNavigate } from 'react-router';
import supabase from '../../../utils/supabase';
import type { CreateQuizHandle } from '../../../components/edit/EditText.types';
import { useRef, useState } from 'react';
import { notify } from '../../../utils/customAlert';

export default function QuizCreateEdit() {
  const editTextRef = useRef<CreateQuizHandle>(null);
  const navigate = useNavigate();
  const [quizValid, setQuizValid] = useState<boolean>(false);

  const handleSubmit = async () => {
    const postData = editTextRef.current?.getPostData();
    if (!postData) return;
    const { title, content, imageUrl, imageFileName, tags, quizData } =
      postData;

    if (title === '') return notify('제목을 입력하세요!', 'info');
    if (content === '') return notify('내용을 입력하세요!', 'info');
    if (quizData.length === 0)
      return notify('최소 1개의 퀴즈를 추가하셔야 합니다.', 'info');
    if (!quizValid) return notify('퀴즈를 완성하세요!', 'warning');

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
        channel: 2,
        is_yn: true,
        author: authorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        quiz_data: quizData,
      },
    ]);

    if (error) {
      console.error('저장 실패', error);
      notify('등록 실패!', 'warning');
    } else {
      notify('등록 성공!', 'success');
    }
    navigate('/problems/job');
  };
  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="문제 만들기" />
        </div>
        <CreateQuiz
          ref={editTextRef}
          quizValid={(valid) => setQuizValid(valid)}
        />
        <div className="mb-[25px] flex gap-3 md:mb-[35px] lg:justify-center">
          <button
            onClick={() => navigate('/problems/job')}
            className="button-lg gray"
          >
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

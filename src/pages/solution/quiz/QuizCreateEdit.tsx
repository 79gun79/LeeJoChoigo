import PageName from '../../../components/ui/PageName';
import CreateQuiz from '../../../components/edit/CreateQuiz';
import { useNavigate } from 'react-router';
import supabase from '../../../utils/supabase';
import type { EditTextHandle } from '../../../components/edit/EditText.types';
import { useRef } from 'react';

export default function QuizCreateEdit() {
  const editTextRef = useRef<EditTextHandle>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const postData = editTextRef.current?.getPostData();
    if (!postData) return;

    const { title, content, imageUrl, imageFileName } = postData;

    const { data: userData } = await supabase.auth.getUser();
    const authorId = userData.user?.id;

    if (!authorId) {
      alert('로그인이 필요합니다.');
      return;
    }

    const { error } = await supabase.from('post').insert([
      {
        title,
        content,
        image: imageUrl,
        image_public_id: imageFileName,
        channel: 2,
        is_yn: true,
        author: authorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('저장 실패', error);
      alert('등록 실패');
    } else {
      alert('등록 성공!');
    }
    navigate('/problems/job');
  };
  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="문제 만들기" />
        </div>
        <CreateQuiz ref={editTextRef} />
        <div className="mb-[25px] flex gap-3 md:mb-[35px] lg:justify-center">
          <button className="button-lg gray">취소</button>
          <button onClick={handleSubmit} className="button-lg">
            작성하기
          </button>
        </div>
      </div>
    </>
  );
}

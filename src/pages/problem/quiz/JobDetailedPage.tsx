import { useEffect, useState } from 'react';
import DetailText from '../../../components/detail/DetailText';
import PageName from '../../../components/ui/PageName';
import Button from '../../../components/ui/Button';
import { useLoaderData, useNavigate } from 'react-router';
import type { PostDetailType } from '../../../types';
import supabase from '../../../utils/supabase';
import { useAuthStore } from '../../../stores/authStore';
import { getUser } from '../../../api/userApi';

export default function JobDetailedPage() {
  const [answerConfirm, setAnswerConfirm] = useState(false);
  const post = useLoaderData<PostDetailType>();
  const navigate = useNavigate();

  const session = useAuthStore((state) => state.session);

  // 푼 상태 갱신
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(session?.user.id as string);
      const prevSolved = userData?.solved ?? [];
      try {
        if (!prevSolved.includes(post.id)) {
          const { data } = await supabase
            .from('user')
            .update({ solved: [...prevSolved, post.id] })
            .eq('id', userData?.id as string)
            .select();
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (answerConfirm) {
      fetchData();
    }
  }, [answerConfirm, session, post]);

  const solutionHandler = () => {
    navigate(`/solutions/job/write/${post.id}`);
  };

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        {/* 페이지 제목 */}
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="개발직군 문제" />
        </div>

        {/* 문제 상세 설명 */}
        <div className="mb-[25px] md:mb-[35px]">
          <DetailText data={post} answerConfirm={answerConfirm} />
        </div>

        {/* 정답 확인 버튼 */}
        <div className="flex justify-end md:justify-around">
          {!answerConfirm && (
            <Button onClick={() => setAnswerConfirm(true)} variant="main">
              정답 확인
            </Button>
          )}

          {answerConfirm && (
            <Button onClick={solutionHandler} variant="sub">
              풀이 작성
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

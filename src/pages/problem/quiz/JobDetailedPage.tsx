import { useState } from 'react';
import DetailText from '../../../components/detail/DetailText';
import PageName from '../../../components/ui/PageName';
import Button from '../../../components/ui/Button';

export default function JobDetailedPage() {
  const [answerConfirm, setAnswerConfirm] = useState(false);

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        {/* 페이지 제목 */}
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="개발직군 문제" />
        </div>

        {/* 문제 상세 설명 */}
        <div className="mb-[25px] md:mb-[35px]">
          <DetailText />
        </div>

        {/* 문제 설명 컴포넌트 */}

        {/* 정답 확인 버튼 */}
        <div className="flex justify-end md:justify-around">
          {!answerConfirm && (
            <Button onClick={() => setAnswerConfirm(true)} variant="main">
              정답 확인
            </Button>
          )}

          {answerConfirm && <Button variant="sub">풀이 작성</Button>}
        </div>
      </div>
    </>
  );
}

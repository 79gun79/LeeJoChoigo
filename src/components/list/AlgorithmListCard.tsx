import { Check, Heart } from 'lucide-react';

// 임시로 지정한 props 입니다
export default function AlgorithmListCard({
  solve, //문제 풀이여부 확인
}: {
  solve?: boolean;
}) {
  return (
    <>
      {/* 스켈레톤 */}
      {/* <div className="w-full rounded-sm border border-[#ccc]">
        <div className="px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
          <div className="mb-2.5 h-3.5 w-2/3 bg-gray-200 md:h-4.5 lg:h-5.5"></div>
          <div className="mb-1 h-3 w-full bg-gray-200 md:h-4 lg:h-5"></div>
          <div className="mb-2.5 h-3 w-4/5 bg-gray-200 md:h-4 lg:h-5"></div>
          <div className="h-2.5 w-1/3 bg-gray-200 md:h-3.5 lg:h-4.5"></div>
        </div>
        <div className="flex w-full border-t border-[#ccc] px-3 py-2 md:px-4 md:py-2.5">
          <div className="h-3 w-1/2 bg-gray-200 md:h-4 lg:h-5"></div>
        </div>
      </div> */}

      <div className="w-full rounded-sm border border-[#ccc]">
        <div className="px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
          <p className="mb-2.5 text-sm font-semibold md:text-base lg:text-lg">
            게시글 제목
          </p>
          <p className="mb-2.5 line-clamp-2 text-xs md:text-sm lg:text-base">
            게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
            내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
            내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
            내용게시글 내용게시글 내용게시글 내용
          </p>
          <div className="flex items-end">
            <span className="text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
              2025.06.06
            </span>
            <div className="ml-auto flex shrink-0 gap-3">
              <div className="flex items-center gap-1">
                <Heart className="w-3.5 md:w-4 lg:w-4.5" />
                <span className="text-[10px] md:text-xs lg:text-sm">5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center border-t border-[#ccc] px-3 py-2 md:px-4 md:py-2.5">
          <p className="text-xs md:text-sm lg:text-base">알고리즘문제 유형</p>
          {solve && (
            <p className="ml-auto flex items-center gap-1 text-[10px] md:text-xs lg:text-sm">
              <Check className="w-4 text-[var(--color-green-info)] md:w-5 lg:w-6" />
              풀이됨
            </p>
          )}
        </div>
      </div>
    </>
  );
}

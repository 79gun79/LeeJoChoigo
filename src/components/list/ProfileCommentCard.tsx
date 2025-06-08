import { Heart, MessageSquare, Reply } from 'lucide-react';

export default function ProfileCommentCard() {
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
      </div> */}

      <div className="w-full rounded-sm border border-[#ccc]">
        <div className="px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
          <div className="flex gap-2.5">
            <div className="w-full">
              <p className="mb-2.5 text-sm font-semibold md:text-base lg:text-lg">
                게시글 제목
              </p>
              <div className="flex w-full items-start gap-1.5">
                <Reply className="h-4 w-4 shrink-0 rotate-180 md:mt-0.5 lg:h-5 lg:w-5" />
                <p className="mb-2.5 line-clamp-2 text-xs md:text-sm lg:text-base">
                  게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
                  내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
                  내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
                  내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
              2025.06.06
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

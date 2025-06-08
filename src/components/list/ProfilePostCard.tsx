import { Heart, MessageSquare } from 'lucide-react';

export default function ProfilePostCard({
  image, //게시글에 사진 여부 확인
}: {
  image?: string;
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
      </div> */}

      <div className="w-full rounded-sm border border-[#ccc]">
        <div className="px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
          <div className="flex gap-2.5">
            <div className="w-full">
              <p className="mb-2.5 text-sm font-semibold md:text-base lg:text-lg">
                게시글 제목
              </p>
              <p className="mb-2.5 line-clamp-2 text-xs md:text-sm lg:text-base">
                게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
                내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
                내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
                내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용
              </p>
            </div>
            {image && (
              <div className="ml-auto h-[65px] w-[85px] shrink-0 overflow-hidden md:h-[75px] md:w-[105px] lg:h-[85px] lg:w-[125px]">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
          <ul className="mb-2.5 flex gap-3">
            <li className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm">
              태그명
            </li>
            <li className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm">
              태그명
            </li>
          </ul>
          <div className="flex items-end">
            <span className="text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
              2025.06.06
            </span>
            <div className="ml-auto flex shrink-0 gap-3">
              <div className="flex items-center gap-1">
                <Heart className="w-3.5 md:w-4 lg:w-4.5" />
                <span className="text-[10px] md:text-xs lg:text-sm">5</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3.5 md:w-4 lg:w-4.5" />
                <span className="text-[10px] md:text-xs lg:text-sm">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

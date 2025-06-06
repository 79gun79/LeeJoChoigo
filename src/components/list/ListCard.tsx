import { Check, Heart, MessageSquare } from 'lucide-react';
import Avartar from '../ui/Avartar';

// 임시로 지정한 props 입니다
export default function ListCard({
  image, //게시글에 사진 여부 확인
  solve, //문제 풀이여부 확인
}: {
  image?: string;
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
        <div className="flex w-full items-center gap-2 border-t border-[#ccc] px-3 py-2 md:px-4 md:py-2.5">
          <div className="h-[24px] w-[24px] rounded-full bg-gray-200 md:h-[26px] md:w-[26px] lg:h-[28px] lg:w-[28px]"></div>
          <div className="h-3 w-1/2 bg-gray-200 md:h-4 lg:h-5"></div>
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
            <li className="rounded-sm bg-[#e3e3e3] px-2 py-0.5 text-[10px] text-[#464646] md:text-xs lg:text-sm">
              태그명
            </li>
            <li className="rounded-sm bg-[#e3e3e3] px-2 py-0.5 text-[10px] text-[#464646] md:text-xs lg:text-sm">
              태그명
            </li>
          </ul>
          <div className="flex items-end">
            <span className="text-[10px] text-[#aaaaaa] md:text-xs lg:text-sm">
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
        <div className="flex w-full items-center border-t border-[#ccc] px-3 py-2 md:px-4 md:py-2.5">
          <Avartar />
          {solve && (
            <p className="ml-auto flex items-center gap-1 text-[10px] md:text-xs lg:text-sm">
              <Check className="w-4 text-[#5DA92E] md:w-5 lg:w-6" />
              풀이됨
            </p>
          )}
        </div>
      </div>
    </>
  );
}

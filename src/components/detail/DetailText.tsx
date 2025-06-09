import { Heart, MessageSquare } from 'lucide-react';

export default function DetailText({ problems }: { problems?: boolean }) {
  return (
    <>
      {/* 게시글 상단 */}
      <div className="border-b border-[#ccc]">
        <p className="mb-2.5 text-lg font-semibold md:text-xl lg:text-2xl">
          게시글 제목
        </p>
        <div className="flex items-end pb-3.5">
          <div className="flex items-center gap-2.5 md:gap-3 lg:gap-3.5">
            <div className="h-[32px] w-[32px] overflow-hidden rounded-full border border-[#eee] md:h-[36px] md:w-[36px] lg:h-[40px] lg:w-[40px]">
              <img
                className="h-full w-full object-cover"
                src="https://www.studiopeople.kr/common/img/default_profile.png"
              />
            </div>
            <div>
              <p className="text-xs text-[#464646] md:text-sm lg:text-base">
                사용자이름
              </p>
              <button className="rounded-sm bg-[var(--color-gray4)] px-2 py-0.5 text-[10px] text-white md:text-xs lg:text-sm">
                팔로우
              </button>
            </div>
          </div>
          <p className="ml-auto text-right text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
            2025.06.24
          </p>
        </div>
      </div>
      {/* 게시글 내용 (문제가 존재하면 문제보여줌)*/}
      <div className="py-7">
        {problems && (
          <div className="mb-7 h-[250px] overflow-auto rounded-sm bg-[var(--color-bg-white)] p-2.5 text-xs md:text-sm lg:text-base">
            문제내용..
          </div>
        )}
        <div className="mb-7 text-xs md:text-sm lg:text-base">
          게시글의 내용입니다.
        </div>
        <div className="flex gap-2">
          <p className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm">
            태그명
          </p>
          <p className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm">
            태그명
          </p>
        </div>
      </div>
      {/* 게시글 하단 */}
      <div className="flex w-full border-t border-[#ccc] py-2.5">
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
    </>
  );
}

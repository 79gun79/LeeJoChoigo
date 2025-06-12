import { Heart, MessageSquare } from 'lucide-react';
import type { PostDetail } from '../../types';
import { format } from 'date-fns';

export default function DetailText({ data }: { data: PostDetail }) {
  return (
    <>
      {/* 게시글 상단 */}
      <div className="border-b border-[#ccc]">
        <p className="mb-2.5 text-lg font-semibold md:text-xl lg:text-2xl">
          {data.title}
        </p>
        <div className="flex items-end pb-3.5">
          <div className="flex items-center gap-2.5 md:gap-3 lg:gap-3.5">
            <div className="h-[32px] w-[32px] overflow-hidden rounded-full border border-[#eee] md:h-[36px] md:w-[36px] lg:h-[40px] lg:w-[40px]">
              <img
                className="h-full w-full object-cover"
                src={
                  data.user.image ||
                  'https://www.studiopeople.kr/common/img/default_profile.png'
                }
              />
            </div>
            <div>
              <p className="text-xs text-[#464646] md:text-sm lg:text-base">
                {data.user.fullname}
              </p>
              <button className="rounded-sm bg-[var(--color-gray4)] px-2 py-0.5 text-[10px] text-white md:text-xs lg:text-sm">
                팔로우
              </button>
            </div>
          </div>
          <p className="ml-auto text-right text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
            {format(new Date(data.created_at), 'yyyy-MM-dd')}
          </p>
        </div>
      </div>
      <div className="py-7">
        <div className="mb-7 text-xs md:text-sm lg:text-base">
          {data.content}
        </div>
        <div className="flex gap-2">
          {data.tags &&
            data.tags.map((tag, i) => (
              <p
                key={i}
                className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm"
              >
                {tag}
              </p>
            ))}
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

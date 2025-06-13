import { Heart, MessageSquare } from 'lucide-react';
import type { ProfilePosts } from '../../pages/profile/Profile';
import { useAuthStore } from '../../stores/authStore';
import dateFormat from '../../utils/dateFormat';
import { Link } from 'react-router';

export default function ProfilePostCard({
  data,
}: {
  data: ProfilePosts[number];
}) {
  const session = useAuthStore((state) => state.session);
  const {
    id,
    image,
    created_at,
    title,
    content,
    tags,
    like,
    comment,
    channel,
  } = data;

  const isLiked = like?.some((f) => f.user === session?.user.id);

  const channelLocation = (channel: number) => {
    switch (channel) {
      case 2:
        return '/problems/job';
      case 3:
        return '/solutions/coding';
      case 4:
        return '/solutions/job';
      case 5:
        return '/questions';
    }
  };
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
        <Link to={`${channelLocation(channel)}/${id}`}>
          <div className="flex h-full w-full flex-col px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
            <div className="flex w-full gap-2.5">
              <div className="w-full min-w-0">
                <p className="mb-2.5 text-sm font-semibold md:text-base lg:text-lg">
                  {title}
                </p>
                <p className="mb-2.5 line-clamp-2 text-xs md:text-sm lg:text-base">
                  {content}
                </p>
              </div>
              {image && (
                <div className="ml-auto h-[65px] w-[85px] shrink-0 overflow-hidden md:h-[75px] md:w-[105px] lg:h-[85px] lg:w-[125px]">
                  <img src={image} className="h-full w-full object-cover" />
                </div>
              )}
            </div>
            <ul className="mt-auto mb-2.5 flex gap-3">
              {tags &&
                tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm"
                  >
                    {tag}
                  </li>
                ))}
            </ul>
            <div className="mt-auto flex items-end">
              <span className="text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
                {dateFormat(created_at)}
              </span>
              <div className="ml-auto flex shrink-0 gap-3">
                <div className="flex items-center gap-1">
                  {isLiked ? (
                    <Heart className="w-3.5 fill-[#E95E5E] text-[#E95E5E] md:w-4 lg:w-4.5" />
                  ) : (
                    <Heart className="w-3.5 md:w-4 lg:w-4.5" />
                  )}

                  <span className="text-[10px] md:text-xs lg:text-sm">
                    {like.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 md:w-4 lg:w-4.5" />
                  <span className="text-[10px] md:text-xs lg:text-sm">
                    {comment.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

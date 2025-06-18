import { Reply } from 'lucide-react';
import dateFormat from '../../utils/dateFormat';
import { useNavigate } from 'react-router';
import type { ProfileComments } from '../profile/ProfileList';
import { useModalStore } from '../../stores/modalStore';
import { useAuthStore } from '../../stores/authStore';

export default function ProfileCommentCard({
  data,
}: {
  data: ProfileComments[number];
}) {
  const { created_at, comment, post } = data;
  const session = useAuthStore((state) => state.session);
  const { setLogInModal } = useModalStore();
  const navigate = useNavigate();
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

  const problemHandler = (path: string) => {
    if (!session?.user) {
      setLogInModal(true);
      return;
    }
    navigate(path);
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
      {data.post && (
        <div className="w-full rounded-sm border border-[#ccc]">
          <button
            className="h-full w-full text-left"
            onClick={() =>
              problemHandler(`${channelLocation(post.channel)}/${post.id}`)
            }
          >
            <div className="px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
              <div className="flex gap-2.5">
                <div className="w-full">
                  <p className="mb-2.5 text-sm font-semibold md:text-base lg:text-lg">
                    {post.title}
                  </p>
                  <div className="flex w-full items-start gap-1.5">
                    <Reply className="h-4 w-4 shrink-0 rotate-180 md:mt-0.5 lg:h-5 lg:w-5" />
                    <p className="mb-2.5 line-clamp-2 text-xs md:text-sm lg:text-base">
                      {comment}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <span className="text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
                  {dateFormat(created_at)}
                </span>
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
}

import { Check, Heart } from 'lucide-react';
import Avartar from '../ui/Avartar';
import type { PostType, User } from '../../types';
import { getUser } from '../../api/userApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../stores/authStore';
import { useModalStore } from '../../stores/modalStore';
import dateFormat from '../../utils/dateFormat';
import { previewMarkdown } from '../../utils/markdown';

export default function QuizListCard({ data }: { data: PostType }) {
  const session = useAuthStore((state) => state.session);
  const [user, setUser] = useState<User>(null);
  const [me, setMe] = useState<User>(null);
  const [isPending, setPending] = useState(false);

  const { setLogInModal } = useModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        const userData = await getUser(data.author);
        const myData = await getUser(session?.user.id as string);
        setUser(userData);
        setMe(myData);
      } catch (e) {
        console.error(e);
      } finally {
        setPending(false);
      }
    };
    fetchData();
  }, [data, session]);

  const handleClick = () => {
    if (!session?.user.id) {
      setLogInModal(true);
      return;
    }
    navigate(`/problems/job/${data.id}`);
  };
  return (
    <>
      {isPending ? (
        <div className="w-full rounded-sm border border-[#ccc]">
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
        </div>
      ) : (
        <div onClick={handleClick} className="cursor-pointer">
          <div className="w-full rounded-sm border border-[#ccc]">
            <div className="px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
              <div className="flex gap-2.5">
                <div className="w-[calc(100%-110px)] md:w-[calc(100%-130px)] lg:w-[calc(100%-150px)]">
                  <p className="mb-2.5 text-sm font-semibold md:text-base lg:text-lg">
                    {data.title}
                  </p>
                  <p className="mb-2.5 line-clamp-2 text-xs md:text-sm lg:text-base">
                    {data.content
                      ? previewMarkdown(data.content).slice(0, 100)
                      : ''}
                  </p>
                </div>
                {data.image && (
                  <div className="ml-auto h-[65px] w-[85px] shrink-0 overflow-hidden md:h-[75px] md:w-[105px] lg:h-[85px] lg:w-[125px]">
                    <img
                      src={data.image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <ul className="mb-2.5 flex gap-3">
                {data.tags &&
                  data.tags.map((tag, i) => (
                    <li
                      key={i}
                      className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm"
                    >
                      {tag}
                    </li>
                  ))}
              </ul>
              <div className="flex items-end">
                <span className="text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
                  {dateFormat(data.created_at)}
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
              <Avartar user={user} />
              {(me?.solved ?? []).includes(data.id) && (
                <p className="ml-auto flex items-center gap-1 text-[10px] md:text-xs lg:text-sm">
                  <Check className="w-4 text-[var(--color-green-info)] md:w-5 lg:w-6" />
                  풀이됨
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

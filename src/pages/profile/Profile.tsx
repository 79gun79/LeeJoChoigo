import { Settings } from 'lucide-react';

import { useState } from 'react';
import ProfileEdit from './ProfileEdit';
import { useLoaderData, useNavigate } from 'react-router';
import {
  fetchProfileComments,
  fetchProfilePost,
  type fetchProfile,
} from '../../loader/profile.loader';
import { useAuthStore } from '../../stores/authStore';
import ProfileList from '../../components/profile/ProfileList';
import FollowButton from '../../components/atoms/FollowButton';
import FollowInfo from '../../components/atoms/FollowInfo';

export type User = NonNullable<Awaited<ReturnType<typeof fetchProfile>>>;
export type ProfilePosts = NonNullable<
  Awaited<ReturnType<typeof fetchProfilePost>>
>;
export type ProfileComments = NonNullable<
  Awaited<ReturnType<typeof fetchProfileComments>>
>;
export default function Profile() {
  const session = useAuthStore((state) => state.session);
  const user = useLoaderData<User>();
  const navigate = useNavigate();
  const authProfile = user.id === session?.user.id;

  const [isSetting, setIsSetting] = useState(false);
  const modalCloseHandle = () => {
    setIsSetting(false);
    document.body.classList.remove('overflow-hidden');
  };
  const modalSaveHandle = () => {
    setIsSetting(false);
    navigate(`/profile/${user.id}`, { replace: true });
    document.body.classList.remove('overflow-hidden');
  };

  const tabData = [{ title: '작성게시글' }, { title: '작성댓글' }];

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <div className="xl:mx-auto xl:max-w-6xl">
        <div className="relative mb-6">
          <div className="h-[253px] w-full overflow-hidden md:h-[300px] lg:h-[400px]">
            <img
              className="h-full w-full object-cover"
              src={
                user.cover_image ||
                'https://mblogthumb-phinf.pstatic.net/MjAxODAzMTVfMTcg/MDAxNTIxMDc4ODQxOTcz.xwMJjV-EQADbMRb4KkT6D5j5L5cZWbZFzYi1aJeoDiAg.hZBcdzAIOEgFzDqKsaHBx_QLZEoRIpCPL5uh0aWqeOYg.PNG.osy2201/53.png?type=w800'
              }
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/60 to-white/0 px-4 pt-6 pb-4 backdrop-blur-sm md:px-8 md:py-5 md:pt-7 lg:px-14">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full md:h-[48px] md:w-[48px] lg:h-[56px] lg:w-[56px]">
                <img
                  className="h-full w-full object-cover"
                  src={
                    user.image ||
                    'https://www.studiopeople.kr/common/img/default_profile.png'
                  }
                />
              </div>
              <div>
                <p className="text-sm font-semibold md:text-base lg:text-lg">
                  {user.fullname}
                </p>
                <p className="text-xs md:text-sm lg:text-base">{user.email}</p>
              </div>
              <div className="flex gap-2.5 self-end">
                {!authProfile && <FollowButton targetUserId={user.id} />}
                {authProfile && (
                  <button
                    onClick={() => {
                      setIsSetting(true);
                      document.body.classList.add('overflow-hidden');
                    }}
                    className="rounded-sm bg-[var(--color-gray2)] p-1 text-[var(--color-gray4)]"
                  >
                    <Settings className="h-4 w-4 lg:h-5 lg:w-5" />
                  </button>
                )}
              </div>
              <FollowInfo />
            </div>
          </div>
        </div>
        <div>
          {/* 게시글, 댓글 탭 */}
          <ul className="flex">
            {tabData.map((tab, index) => (
              <li
                key={tab.title + index}
                className={`w-full border-b border-[var(--color-gray1)] py-1.5 text-center text-sm font-medium text-[var(--color-gray3)] md:text-base lg:text-lg ${currentTab === index && 'border-black text-black'}`}
              >
                <button
                  className="h-full w-full"
                  onClick={() => setCurrentTab(index)}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>

          <ProfileList userId={user.id || ''} currentTab={currentTab} />
        </div>
      </div>
      {isSetting && (
        <ProfileEdit
          closeProfile={modalCloseHandle}
          saveProfile={modalSaveHandle}
          user={user}
        />
      )}
    </>
  );
}

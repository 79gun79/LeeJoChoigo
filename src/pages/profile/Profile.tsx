import { ArrowDownUp, ChevronDown, Settings } from 'lucide-react';
import ProfilePostCard from '../../components/list/ProfilePostCard';
import { useState } from 'react';
import ProfileCommentCard from '../../components/list/ProfileCommentCard';
import ProfileEdit from './ProfileEdit';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import type { fetchProfile } from '../../loader/profile.loader';
import { useAuthStore } from '../../stores/authStore';

export type User = NonNullable<Awaited<ReturnType<typeof fetchProfile>>>;
export default function Profile() {
  const session = useAuthStore((state) => state.session);
  const user = useLoaderData<User>();
  const navigate = useNavigate();
  const params = useParams();
  const authProfile = user.id === session?.user.id;
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const modalCloseHandle = () => {
    setIsSetting(false);
  };
  const modalSaveHandle = () => {
    setIsSetting(false);
    navigate(`/profile/${params.userId}`, { replace: true });
  };
  const posts = [
    {
      id: 'post1',
      created_at: '1717901273000',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDiI66AVC6_XzHo9sBpWoC2n3_w3bobWfUxQ&s',
      title: {
        title: '알고리즘문제 풀이',
        body: '알고리즘을 이러한 방식으로 작성했습니다.1',
      },
      channel: 2,
    },
    {
      id: 'post2',
      created_at: '1717901273400',
      title: {
        title: '개발직군문제 풀이',
        body: '',
        tags: ['프론트엔드'],
      },
      channel: 3,
    },
    {
      id: 'post3',
      created_at: '1717901273400',
      title: {
        title: '개발직군문제1',
        body: '프론트엔드 관련 문제입니다.',
        tags: ['프론트엔드', 'Javascripts'],
      },
      channel: 1,
    },
    {
      id: 'post4',
      created_at: '1717901273400',
      title: {
        title: '질문있습니다.',
        body: '질문있습니다! 이런 방식으로 푸는게 맞나요?',
        tags: ['Javascripts'],
      },
      channel: 1,
    },
  ];
  const comments = [
    {
      id: 'comment1',
      created_at: '1717901273400',
      comment: '많이 배워갑니다!',
      post: 'post1',
    },
    {
      id: 'comment2',
      created_at: '1717901273456',
      comment: '생각못했던 방식이네요',
      post: 'post1',
    },
  ];

  const tabData = [
    { title: '작성게시글', list: posts },
    { title: '작성댓글', list: comments },
  ];
  const [currnetTab, setCurrnetTab] = useState(0);

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
          <div className="absolute bottom-0 left-0 w-full bg-white/20 px-4 py-4 backdrop-blur-md md:px-8 md:py-5 lg:px-14">
            <div className="mb-2.5 flex items-center gap-2.5">
              <div className="h-[40px] w-[40px] overflow-hidden rounded-full md:h-[48px] md:w-[48px] lg:h-[56px] lg:w-[56px]">
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
            </div>
            <div className="flex gap-2.5">
              {!authProfile && (
                <button className="min-w-[94px] rounded-sm bg-[var(--color-gray2)] p-1 text-center text-[10px] text-[var(--color-gray4)] md:text-xs lg:min-w-[120px] lg:text-sm">
                  팔로우
                </button>
              )}
              {authProfile && (
                <button
                  onClick={() => setIsSetting(true)}
                  className="rounded-sm bg-[var(--color-gray2)] p-1 text-[var(--color-gray4)]"
                >
                  <Settings className="h-4 w-4 lg:h-5 lg:w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          {/* 게시글, 댓글 탭 */}
          <ul className="flex">
            {tabData.map((tab, index) => (
              <li
                className={`w-full border-b border-[var(--color-gray1)] py-1.5 text-center text-sm font-medium text-[var(--color-gray3)] md:text-base lg:text-lg ${currnetTab === index && 'border-black text-black'}`}
              >
                <button
                  className="h-full w-full"
                  onClick={() => setCurrnetTab(index)}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>

          <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
            {/* 전체글, 최신순 select */}
            <div className="mb-3 flex items-center">
              <div className="relative">
                <button
                  className="relative text-xs md:text-sm lg:text-base"
                  onClick={() => setIsSelectActive(!isSelectActive)}
                >
                  <p className="cursor-pointer py-1 pr-6.5 pl-1.5 md:pr-6.5">
                    전체
                  </p>
                  <ChevronDown className="top0 absolute top-1/2 right-1 h-[17px] w-[17px] -translate-y-1/2 md:h-[19px] md:w-[19px]" />
                </button>
                <ul
                  className={`absolute top-full left-0 z-10 hidden flex-col gap-1.5 rounded-sm border border-[#ccc] bg-white px-3 py-2.5 text-xs text-nowrap md:text-sm lg:text-base ${isSelectActive && 'flex!'}`}
                >
                  <li>
                    <button>전체</button>
                  </li>
                  <li>
                    <button>개발직군 출제 문제</button>
                  </li>
                  <li>
                    <button>알고리즘풀이</button>
                  </li>
                  <li>
                    <button>개발직군풀이</button>
                  </li>
                  <li>
                    <button>질문 게시판</button>
                  </li>
                </ul>
              </div>

              <div className="relative ml-auto">
                <select className="cursor-pointer appearance-none py-1 pr-5.5 pl-1.5 text-xs md:pr-6.5 md:text-sm lg:text-base">
                  <option>최신순</option>
                  <option>인기순</option>
                </select>
                <ArrowDownUp className="top0 absolute top-1/2 right-1 h-[12px] w-[12px] -translate-y-1/2 md:h-[16px] md:w-[16px]" />
              </div>
            </div>
            {/* 목록 */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {currnetTab === 0
                ? posts.map((data, index) => (
                    <ProfilePostCard key={index} data={data} />
                  ))
                : comments.map((data, index) => (
                    <ProfileCommentCard key={index} data={data} />
                  ))}
            </div>
          </div>
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

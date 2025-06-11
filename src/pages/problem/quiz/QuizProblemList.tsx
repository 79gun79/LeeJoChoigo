import { Plus } from 'lucide-react';
import QuizListCard from '../../../components/list/QuizListCard';
import SearchBox from '../../../components/search/SearchBox';
import SearchListTop from '../../../components/search/SearchListTop';
import CheckItem from '../../../components/ui/CheckItem';
import PageName from '../../../components/ui/PageName';
import { useLoaderData, useNavigate } from 'react-router';
import type { ChannelType, PostsType } from '../../../types';
import { useEffect, useState } from 'react';
import {
  getChannelCategoryPosts,
  getChannelPosts,
} from '../../../components/api/postApi';
import { useAuthStore } from '../../../stores/authStore';
import { useModalStore } from '../../../stores/modalStore';
import Loading from '../../../components/ui/Loading';

export default function QuizProblemList() {
  const channel = useLoaderData<ChannelType>();
  const session = useAuthStore((state) => state.session);
  const { setLogInModal } = useModalStore();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<PostsType>([]);
  const [category, setCategory] = useState<string>('');
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      try {
        if (category === '') {
          const channelPosts = await getChannelPosts(channel.id);
          setPosts(channelPosts);
        } else {
          const channelPosts = await getChannelCategoryPosts(
            channel.id,
            category,
          );
          setPosts(channelPosts);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setPending(false);
      }
    };
    fetchData();
  }, [channel.id, category]);

  const handleClick = () => {
    if (!session?.user.id) {
      setLogInModal(true);
      return;
    }
    navigate('/problems/write');
  };

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title={channel.name} />
        </div>
        <div className="mb-[25px] md:mb-[35px]">
          <SearchBox />
        </div>
        <div>
          <div className="mb-2">
            <p className="mb-1.5 text-sm md:text-base">
              카테고리 유형: <b>{category}</b>
            </p>
            <div className="flex flex-wrap gap-2.5">
              <div className="mb-4 flex flex-wrap gap-2.5">
                <CheckItem id="1" title="프론트엔드" onChange={setCategory} />
                <CheckItem id="2" title="백엔드" onChange={setCategory} />
                <CheckItem id="3" title="모바일 앱" onChange={setCategory} />
                <CheckItem id="4" title="기타" onChange={setCategory} />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-1">
              <SearchListTop />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {isPending ? (
                <div className="col-span-2 text-center">
                  <Loading />
                </div>
              ) : posts && posts.length > 0 ? (
                posts.map((post) => <QuizListCard key={post.id} data={post} />)
              ) : (
                <div className="col-span-2 py-12 text-center">
                  <h3 className="t1 mb-2 font-medium text-black">
                    포스트가 없습니다.
                  </h3>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleClick}
            className="bg-main fixed right-0 bottom-14 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md md:right-2 md:h-13 md:w-13 lg:right-6 lg:h-15 lg:w-15"
          >
            <Plus className="h-5 w-5 lg:h-7 lg:w-7" />
          </button>
        </div>
      </div>
    </>
  );
}

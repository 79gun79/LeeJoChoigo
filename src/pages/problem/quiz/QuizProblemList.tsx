import { Plus } from 'lucide-react';
import SearchBox from '../../../components/search/SearchBox';
import SearchListTop from '../../../components/search/SearchListTop';
import CheckItem from '../../../components/ui/CheckItem';
import PageName from '../../../components/ui/PageName';
import { useLoaderData, useNavigate } from 'react-router';
import type { ChannelType, PostsType } from '../../../types';
import { useEffect, useState } from 'react';
import { getChannelCategoryPosts, getChannelPosts } from '../../../api/postApi';
import { useAuthStore } from '../../../stores/authStore';
import { useModalStore } from '../../../stores/modalStore';
import Loading from '../../../components/ui/Loading';
import ListCard from '../../../components/list/ListCard';
import Nopost from '../../../components/ui/Nopost';
import { searchPosts } from '../../../api/searchApi';
import TopButton from '../../../components/common/TopButton';

export default function QuizProblemList() {
  const channel = useLoaderData<ChannelType>();
  const session = useAuthStore((state) => state.session);
  const { setLogInModal } = useModalStore();
  const navigate = useNavigate();

  const [initPosts, setInitPosts] = useState<PostsType>([]);
  const [posts, setPosts] = useState<PostsType>([]);
  const [category, setCategory] = useState<string>('전체');
  const [isPending, setPending] = useState(false);

  const [sortType, setSortType] = useState<'latest' | 'popular'>('latest');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      try {
        if (category === '전체') {
          const channelPosts = await getChannelPosts(channel.id);
          setInitPosts(channelPosts);
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

  const getSortedPosts = (posts: PostsType) => {
    if (!posts) return [];
    const sortedPosts = [...posts];

    if (sortType === 'latest') {
      return sortedPosts.sort(
        (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at),
      );
    } else if (sortType === 'popular') {
      return sortedPosts.sort((a, b) => b.like_count - a.like_count);
    }

    return sortedPosts;
  };

  const handleClick = () => {
    if (!session?.user.id) {
      setLogInModal(true);
      return;
    }
    navigate('/problems/job/write');
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setPosts(initPosts);
      return;
    }

    const search = await searchPosts(query, channel.id);
    if (search) setPosts(search);
  };

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title={channel.name} />
        </div>
        <div className="mb-[25px] md:mb-[35px]">
          <SearchBox
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          />
        </div>
        <div>
          <div className="mb-2">
            <p className="mb-1.5 text-sm md:text-base">
              선택한 유형 : <b>{category || '전체'}</b>
            </p>
            <div className="flex flex-wrap gap-2.5">
              <div className="mb-4 flex flex-wrap gap-2.5">
                <CheckItem
                  id="0"
                  title="전체"
                  onChange={setCategory}
                  checked={category === '전체'}
                />
                <CheckItem id="1" title="프론트엔드" onChange={setCategory} />
                <CheckItem id="2" title="백엔드" onChange={setCategory} />
                <CheckItem id="3" title="모바일 앱" onChange={setCategory} />
                <CheckItem id="4" title="기타" onChange={setCategory} />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-1">
              <SearchListTop
                query={query}
                sortType={sortType}
                setSortType={setSortType}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {isPending ? (
                <div className="col-span-2 text-center">
                  <Loading />
                </div>
              ) : posts && posts.length > 0 ? (
                getSortedPosts(posts).map((post) => (
                  <ListCard
                    key={post.id}
                    channel={2}
                    data={post}
                    hideComment={true}
                  />
                ))
              ) : (
                <Nopost />
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
        <TopButton />
      </div>
    </>
  );
}

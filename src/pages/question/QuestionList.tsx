import { Plus } from 'lucide-react';
import ListCard from '../../components/list/ListCard';
import SearchBox from '../../components/search/SearchBox';
import SearchListTop from '../../components/search/SearchListTop';
import TagSearch from '../../components/search/SearchTag';
import PageName from '../../components/ui/PageName';
// import TagItem from '../../components/ui/TagItem';
import type { ChannelType, PostsType } from '../../types';
import { useLoaderData } from 'react-router';
import { useNavigate } from 'react-router';
import { getChannelPosts } from '../../api/postApi';
import { useEffect, useState } from 'react';
import { useModalStore } from '../../stores/modalStore';
import { useAuthStore } from '../../stores/authStore';
import Loading from '../../components/ui/Loading';
import Nopost from '../../components/ui/Nopost';
import { searchPosts } from '../../api/searchApi';

export default function QuestionList() {
  const channel = useLoaderData<ChannelType>();
  const session = useAuthStore((state) => state.session);
  const { setLogInModal } = useModalStore();
  const navigate = useNavigate();

  const [initPosts, setInitPosts] = useState<PostsType>([]);
  const [posts, setPosts] = useState<PostsType>([]);
  const [isPending, setPending] = useState(false);

  const [sortType, setSortType] = useState<'latest' | 'popular'>('latest');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      try {
        const channelPosts = await getChannelPosts(channel.id);
        setInitPosts(channelPosts);
        setPosts(channelPosts);
      } catch (e) {
        console.error(e);
      } finally {
        setPending(false);
      }
    };
    fetchData();
  }, [channel.id]);

  const getSortedPosts = (posts: PostsType) => {
    if (!posts) return [];
    const sortedPosts = [...posts];

    if (sortType === 'latest') {
      return sortedPosts.sort(
        (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at),
      );
    }

    if (sortType === 'popular') {
      return sortedPosts.sort((a, b) => {
        const aLikes = a.like?.length ?? 0;
        const bLikes = b.like?.length ?? 0;

        if (aLikes !== bLikes) return bLikes - aLikes;

        return Date.parse(b.updated_at) - Date.parse(a.updated_at);
      });
    }

    return sortedPosts;
  };

  const handleClick = () => {
    if (!session?.user.id) {
      setLogInModal(true);
      return;
    }
    navigate('/questions/write');
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
          <TagSearch />
        </div>
        <div>
          <div className="mb-2">
            <p className="mb-1.5 text-sm md:text-base">선택한 태그</p>
            <ul className="flex flex-wrap gap-2.5">
              <li>{/* <TagItem></TagItem> */}</li>
              <li>{/* <TagItem></TagItem> */}</li>
            </ul>
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
                  <ListCard key={post.id} data={post} channel={channel.id} />
                ))
              ) : (
                <Nopost />
              )}
            </div>
            <button
              onClick={handleClick}
              className="fixed right-0 bottom-14 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-main)] text-white shadow-md md:right-2 md:h-13 md:w-13 lg:right-6 lg:h-15 lg:w-15"
            >
              <Plus className="h-5 w-5 lg:h-7 lg:w-7" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

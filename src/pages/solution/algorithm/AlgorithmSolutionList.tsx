import { Plus } from 'lucide-react';
import ListCard from '../../../components/list/ListCard';
import SearchBox from '../../../components/search/SearchBox';
import SearchListTop from '../../../components/search/SearchListTop';
import TagSearch from '../../../components/search/SearchTag';
import PageName from '../../../components/ui/PageName';
// import TagItem from '../../../components/ui/TagItem';
import type { ChannelType, PostsType } from '../../../types';
import { useLoaderData } from 'react-router';
import { useEffect, useState } from 'react';
import { getChannelPosts } from '../../../components/api/postApi';

export default function AlgorithmSolutionList() {
  const channel = useLoaderData<ChannelType>();
  const [posts, setPosts] = useState<PostsType>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelPosts = await getChannelPosts(channel.id);
        setPosts(channelPosts);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [channel.id]);
  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title={channel.name} />
        </div>
        <div className="mb-[25px] md:mb-[35px]">
          <SearchBox />
          <TagSearch />
        </div>
        <div>
          <div className="mb-2">
            <p className="mb-1.5 text-sm md:text-base">선택한 유형</p>
            <div className="flex flex-wrap gap-2.5">
              {/* <TagItem></TagItem>
              <TagItem></TagItem> */}
            </div>
          </div>
          <div>
            <div className="mb-1">
              <SearchListTop />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* <ListCard image="sda" />
              <ListCard image="sda" solve={true} />
              <ListCard solve={true} />
              <ListCard solve={false} /> */}
              {posts && posts.map((post) => <ListCard key={post.id} />)}
              {posts && posts.length === 0 && (
                <div className="col-span-2 py-12 text-center">
                  <h3 className="t1 mb-2 font-medium text-black">
                    포스트가 없습니다.
                  </h3>
                </div>
              )}
            </div>
          </div>
          <button className="fixed right-0 bottom-14 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-main)] text-white shadow-md md:right-2 md:h-13 md:w-13 lg:right-6 lg:h-15 lg:w-15">
            <Plus className="h-5 w-5 lg:h-7 lg:w-7" />
          </button>
        </div>
      </div>
    </>
  );
}

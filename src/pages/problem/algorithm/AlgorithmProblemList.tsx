import AlgorithmListCard from '../../../components/list/AlgorithmListCard';
import SearchBox from '../../../components/search/SearchBox';
import TagSearch from '../../../components/search/SearchTag';
import PageName from '../../../components/ui/PageName';
import SearchListTop from '../../../components/search/SearchListTop';
// import TagItem from '../../../components/ui/TagItem';
import type { ChannelType, PostsType } from '../../../types';
import { useLoaderData } from 'react-router';
import { getChannelPosts } from '../../../components/api/postApi';
import { useEffect, useState } from 'react';

export default function AlgorithmProblemList() {
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
              {posts &&
                posts.map((post) => <AlgorithmListCard key={post.id} />)}
              {posts && posts.length === 0 && (
                <div className="col-span-2 py-12 text-center">
                  <h3 className="t1 mb-2 font-medium text-black">
                    포스트가 없습니다.
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

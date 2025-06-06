import AlgorithmListCard from '../../components/list/AlgorithmListCard';
import SearchBox from '../../components/search/SearchBox';
import TagSearch from '../../components/search/SearchTag';
import PageName from '../../components/ui/PageName';
import SearchListTop from '../../components/search/SearchListTop';
import TagItem from '../../components/ui/TagItem';
import ListCard from '../../components/list/ListCard';

export default function AlgorithmProblemList() {
  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="알고리즘문제" />
        </div>
        <div className="mb-[25px] md:mb-[35px]">
          <SearchBox />
          <TagSearch />
        </div>
        <div>
          <div className="mb-2">
            <p className="mb-1.5 text-sm md:text-base">선택한 유형</p>
            <ul className="flex flex-wrap gap-2.5">
              <li>
                <TagItem></TagItem>
              </li>
              <li>
                <TagItem></TagItem>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-1">
              <SearchListTop />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <AlgorithmListCard />
              <AlgorithmListCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

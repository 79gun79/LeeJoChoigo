import AlgorithmListCard from '../../../components/list/AlgorithmListCard';
import QuizListCard from '../../../components/list/QuizListCard';
import SearchBox from '../../../components/search/SearchBox';
import SearchListTop from '../../../components/search/SearchListTop';
import TagSearch from '../../../components/search/SearchTag';
import CheckItem from '../../../components/ui/CheckItem';
import CheckList from '../../../components/ui/CheckItem';
import PageName from '../../../components/ui/PageName';
import TagItem from '../../../components/ui/TagItem';

export default function QuizProblemList() {
  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="개발직군문제" />
        </div>
        <div className="mb-[25px] md:mb-[35px]">
          <SearchBox />
        </div>
        <div>
          <div className="mb-2">
            <p className="mb-1.5 text-sm md:text-base">카테고리 유형</p>
            <div className="flex flex-wrap gap-2.5">
              <div className="mb-4 flex flex-wrap gap-2.5">
                <CheckItem id="1" title="프론트엔드" />
                <CheckItem id="2" title="백엔드" />
                <CheckItem id="3" title="모바일 앱" />
                <CheckItem id="4" title="기타" />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-1">
              <SearchListTop />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <QuizListCard solve={true} />
              <QuizListCard image="asd" solve={true} />
              <QuizListCard />
              <QuizListCard image="asd" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

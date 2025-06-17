import { ArrowDownUp } from 'lucide-react';

type Props = {
  sortType: 'latest' | 'popular';
  setSortType: (type: 'latest' | 'popular') => void;
  query: string;
  isAlgorithm?: boolean;
};
export default function SearchListTop({
  sortType,
  setSortType,
  query,
  isAlgorithm,
}: Props) {
  return (
    <>
      <div className="flex items-center text-sm md:text-base">
        <p>
          검색어 :{' '}
          <span className="text-sub1 font-bold">{query || '검색 키워드'}</span>
        </p>
        <div className="ml-auto">
          <div className="relative">
            <select
              value={sortType}
              onChange={(e) =>
                setSortType(e.target.value as 'latest' | 'popular')
              }
              className="cursor-pointer appearance-none py-1 pr-5.5 pl-1.5 md:pr-6.5"
            >
              <option value="latest">
                {isAlgorithm ? '번호순' : '최신순'}
              </option>
              <option value="popular">
                {isAlgorithm ? '풀이순' : '인기순'}
              </option>
            </select>
            <ArrowDownUp className="top0 absolute top-1/2 right-1 h-[15px] w-[15px] -translate-y-1/2 md:h-[17px] md:w-[17px]" />
          </div>
        </div>
      </div>
    </>
  );
}

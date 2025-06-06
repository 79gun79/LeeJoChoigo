import { ArrowDownUp } from 'lucide-react';

export default function SearchListTop() {
  return (
    <>
      <div className="flex items-center text-sm md:text-base">
        <p>
          검색어 : <span className="text-sub1">검색 키워드</span>
        </p>
        <div className="ml-auto">
          <div className="relative">
            <select className="cursor-pointer appearance-none py-1 pr-5.5 pl-1.5 md:pr-6.5">
              <option>최신순</option>
              <option>인기순</option>
            </select>
            <ArrowDownUp className="top0 absolute top-1/2 right-1 h-[15px] w-[15px] -translate-y-1/2 md:h-[17px] md:w-[17px]" />
          </div>
        </div>
      </div>
    </>
  );
}

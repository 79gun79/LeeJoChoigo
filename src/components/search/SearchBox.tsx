import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const hasText = query.trim().length > 0;
  return (
    <>
      <form
        className={`flex w-full items-center rounded-4xl border-2 ${hasText ? 'border-[#2d95ad]' : 'border-main'}`}
      >
        <input
          className="w-full px-3.5 py-2 outline-none md:px-4.5 md:py-2.5 md:text-lg lg:px-5.5 lg:py-3 lg:text-xl"
          type="text"
          placeholder="검색어를 입력해주세요"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-main mr-1 ml-auto flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full md:mr-2 md:h-[38px] md:w-[38px] lg:h-[42px] lg:w-[42px]"
          type="submit"
        >
          <Search className="w-[20px] text-white" />
        </button>
      </form>
    </>
  );
}

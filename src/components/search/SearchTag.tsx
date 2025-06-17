import { Search, TextSearch } from 'lucide-react';
import { useState } from 'react';

export default function TagSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const hasText = query.trim().length > 0;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="mt-2.5 flex items-center gap-1 rounded-sm bg-[var(--color-main)] px-2 py-1 text-xs text-white md:text-sm lg:text-base"
      >
        <TextSearch className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" /> 태그검색
      </button>
      {open && (
        <div
          className={`bg-gray1 mt-2.5 rounded-sm px-2.5 py-3 md:px-3.5 md:py-4 lg:px-4.5 lg:py-4.5`}
        >
          <form>
            <div
              className={`mb-2 flex rounded-sm border bg-white ${hasText ? 'border-[#2d95ad]' : 'border-gray1'}`}
            >
              <input
                type="text"
                placeholder="태그를 검색하세요"
                className="w-full p-2.5 text-sm outline-none md:text-base lg:text-lg"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="shrink-0 p-2">
                <Search className="w-[20px] text-[var(--color-main)] md:w-[24px] lg:w-[26px]" />
              </button>
            </div>
            <p className="mb-2.5 text-right text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
              최대 다섯개 선택가능합니다
            </p>
            <div className="mb-4 flex flex-wrap gap-2.5">
              {/* <CheckItem id="1" title="태그명" />
              <CheckItem id="2" title="태그명" />
              <CheckItem id="3" title="태그명" />
              <CheckItem id="4" title="태그명" /> */}
            </div>
            <button className="w-full cursor-pointer rounded-sm bg-[var(--color-main)] p-2.5 text-center text-xs text-white md:text-sm lg:text-base">
              검색
            </button>
          </form>
        </div>
      )}
    </>
  );
}

import { Search, TextSearch } from 'lucide-react';
import { useState } from 'react';

export default function TagSearch() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="bg-main mt-2.5 flex items-center gap-1 rounded-sm px-2 py-1 text-xs text-white md:text-sm lg:text-base"
      >
        <TextSearch className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" /> 유형검색
      </button>
      {open && (
        <div className="mt-2.5 rounded-sm bg-[#F2F2F2] px-2.5 py-3 md:px-3.5 md:py-4 lg:px-4.5 lg:py-4.5">
          <form>
            <div className="mb-2 flex rounded-sm bg-white">
              <input
                type="text"
                placeholder="유형을 검색하세요"
                className="w-full p-2.5 text-sm md:text-base lg:text-lg"
              />
              <button className="shrink-0 p-2">
                <Search className="text-main w-[20px] md:w-[24px] lg:w-[26px]" />
              </button>
            </div>
            <p className="mb-2.5 text-right text-[10px] text-[#aaaaaa] md:text-xs lg:text-sm">
              최대 다섯개 선택가능합니다
            </p>
            <ul className="mb-4 flex flex-wrap gap-2.5">
              <li>
                <input
                  type="checkbox"
                  name="tag"
                  id="tag1"
                  className="peer absolute appearance-none opacity-0"
                />
                <label
                  htmlFor="tag1"
                  className="cursor-pointer rounded-sm bg-[#dddddd] px-2 py-1 text-xs text-[#464646] peer-checked:bg-[#1BBFBF] peer-checked:text-white md:px-2.5 md:py-1.5 md:text-sm"
                >
                  태그명
                </label>
              </li>

              <li>
                <input
                  type="checkbox"
                  name="tag"
                  id="tag2"
                  className="peer absolute appearance-none opacity-0"
                />
                <label
                  htmlFor="tag2"
                  className="cursor-pointer rounded-sm bg-[#dddddd] px-2 py-1 text-xs text-[#464646] peer-checked:bg-[#1BBFBF] peer-checked:text-white md:px-2.5 md:py-1.5 md:text-sm"
                >
                  태그명
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="tag"
                  id="tag3"
                  className="peer absolute appearance-none opacity-0"
                />
                <label
                  htmlFor="tag3"
                  className="cursor-pointer rounded-sm bg-[#dddddd] px-2 py-1 text-xs text-[#464646] peer-checked:bg-[#1BBFBF] peer-checked:text-white md:px-2.5 md:py-1.5 md:text-sm"
                >
                  태그명
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="tag"
                  id="tag4"
                  className="peer absolute appearance-none opacity-0"
                />
                <label
                  htmlFor="tag4"
                  className="cursor-pointer rounded-sm bg-[#dddddd] px-2 py-1 text-xs text-[#464646] peer-checked:bg-[#1BBFBF] peer-checked:text-white md:px-2.5 md:py-1.5 md:text-sm"
                >
                  태그명
                </label>
              </li>
            </ul>
            <button className="bg-main w-full cursor-pointer rounded-sm p-2.5 text-center text-xs text-white md:text-sm lg:text-base">
              검색
            </button>
          </form>
        </div>
      )}
    </>
  );
}

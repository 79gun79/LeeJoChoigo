import { Tag, TextSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTagList } from '../../api/searchApi';
import TagItem from '../ui/TagItem';
import { notify } from '../../utils/customAlert';

interface TagSearchProps {
  onSearch: (tags: string[]) => void;
  channelId: number;
}

export default function TagSearch({ channelId, onSearch }: TagSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const hasText = query.trim().length > 0;

  const [tagList, setTagList] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(async () => {
      const list = await getTagList(query.trim(), channelId);
      setTagList(list ?? []);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredTags = tagList.filter((tag) => !selectedTags.includes(tag));

  const addTag = (tag: string) => {
    if (selectedTags.length >= 5) {
      notify('최대 5개까지 선택 가능합니다.', 'error');
      return;
    }
    if (selectedTags.includes(tag)) return;

    setSelectedTags([...selectedTags, tag]);
    setQuery('');
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div
              className={`relative mb-2 flex rounded-sm border bg-white ${hasText ? 'border-[var(--color-sub1)]' : 'border-gray1'}`}
            >
              <input
                type="text"
                placeholder="태그를 검색하세요"
                className="w-full p-2.5 text-sm outline-none md:text-base lg:text-lg"
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* <button className="shrink-0 p-2">
                <Search className="w-[20px] text-[var(--color-main)] md:w-[24px] lg:w-[26px]" />
              </button> */}
              {query.trim() !== '' && filteredTags.length > 0 && (
                <div className="border-sub1 border-t-gray1 absolute top-[calc(100%-2px)] -left-[1px] w-[calc(100%+2px)] overflow-hidden rounded-[0_0_4px_4px] border shadow-md">
                  <ul className="max-h-30 overflow-y-auto bg-white">
                    {filteredTags.map((tag) => (
                      <li
                        key={tag}
                        onClick={() => addTag(tag)}
                        className="hover:bg-sub1/10 text-gray4 flex cursor-pointer items-center gap-2 border border-transparent px-3 py-1 text-sm"
                      >
                        <Tag className="text-gray4 w-3" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <p className="mb-2.5 text-right text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
              최대 다섯개 선택가능합니다
            </p>
            <div className="mb-4 flex min-h-10 flex-wrap items-start gap-2.5">
              {selectedTags.map((tag) => (
                <TagItem
                  key={tag}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                onSearch(selectedTags);
                setOpen(false);
              }}
              className="w-full cursor-pointer rounded-sm bg-[var(--color-main)] p-2.5 text-center text-xs text-white md:text-sm lg:text-base"
            >
              검색
            </button>
          </form>
        </div>
      )}
    </>
  );
}

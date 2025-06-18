import { Tag, TextSearch } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const [lastInputType, setLastInputType] = useState<
    'keyboard' | 'mouse' | null
  >(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(async () => {
      const list = await getTagList(query.trim(), channelId);
      setTagList(list ?? []);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
      itemRefs.current[highlightIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightIndex]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!hasText || filteredTags.length === 0) return;

    setLastInputType('keyboard');
    setHoverIndex(null);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % filteredTags.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev <= 0 ? filteredTags.length - 1 : prev - 1,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filteredTags.length) {
        addTag(filteredTags[highlightIndex]);
      }
    }
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
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlightIndex(-1);
                  setLastInputType('keyboard');
                }}
                onKeyDown={handleKeyDown}
              />
              {/* <button className="shrink-0 p-2">
                <Search className="w-[20px] text-[var(--color-main)] md:w-[24px] lg:w-[26px]" />
              </button> */}
              {query.trim() !== '' && filteredTags.length > 0 && (
                <div className="border-sub1 border-t-gray1 absolute top-[calc(100%-2px)] -left-[1px] w-[calc(100%+2px)] overflow-hidden rounded-[0_0_4px_4px] border shadow-md">
                  <ul className="max-h-30 overflow-y-auto bg-white">
                    {filteredTags.map((tag, index) => (
                      <li
                        key={tag}
                        ref={(el: HTMLLIElement | null) =>
                          void (itemRefs.current[index] = el)
                        }
                        onMouseEnter={() => {
                          setLastInputType('mouse');
                          setHoverIndex(index);
                        }}
                        onMouseLeave={() => setHoverIndex(null)}
                        onClick={() => addTag(tag)}
                        className={`text-gray4 flex cursor-pointer items-center gap-2 border border-transparent px-3 py-1 text-sm ${
                          lastInputType === 'keyboard' &&
                          highlightIndex === index
                            ? 'bg-sub1/10'
                            : lastInputType === 'mouse' && hoverIndex === index
                              ? 'bg-sub1/10'
                              : ''
                        } `}
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

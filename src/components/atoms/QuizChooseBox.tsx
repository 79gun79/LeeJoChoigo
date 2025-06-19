import { twMerge } from 'tailwind-merge';

type QuizChooseProps = {
  id: string;
  selected: boolean;
  value: string;
  onSelectToggle: () => void;
  onChangeValue: (newVal: string) => void;
};

export default function QuizChooseBox({
  id,
  selected,
  value,
  onSelectToggle,
  onChangeValue,
}: QuizChooseProps) {
  return (
    <>
      <div
        className={twMerge(
          'flex h-10 bg-white px-[10px] py-[10px] shadow-md md:min-w-[140px]',
          `${selected ? 'bg-sub1' : 'bg-white'}`,
        )}
      >
        <div
          className={twMerge(

            'bg-sub3 text-main flex h-5 w-5 items-center justify-center rounded-full text-center text-xs font-semibold lg:text-sm',
            `${selected ? 'bg-main text-white' : 'bg-sub3 text-main dark:text-bg-white'}`,

          )}
        >
          {id}
        </div>
        <input
          type="text"
          className={twMerge(
            'text-main w-full border-none px-[10px] text-xs outline-none lg:text-sm',
            `${selected ? 'text-white' : 'text-main'}`,
          )}
          placeholder="답안을 입력하세요"
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          maxLength={28}
        />
        <input
          onClick={onSelectToggle}
          type="checkbox"
          checked={selected}
          className={twMerge('accent-main h-5 w-5 cursor-pointer')}
        />
      </div>
    </>
  );
}

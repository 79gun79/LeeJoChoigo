import { twMerge } from 'tailwind-merge';

type QuizChooseProps = {
  id: string;
  correct: boolean;
  value: string;
  selected: boolean;
  showRes?: boolean;
};

export default function QuizSolveBox({
  id,
  correct,
  value,
  selected,
  showRes,
}: QuizChooseProps) {
  const isAnswer: boolean = correct && selected;
  return (
    <>
      {showRes ? (
        <div
          className={twMerge(
            'flex h-10 items-center justify-center bg-white px-[10px] py-[10px] shadow-md md:min-w-[330px]',
            selected
              ? isAnswer
                ? 'bg-green-info/50'
                : 'bg-red-caution/50'
              : 'bg-white',
            correct ? 'bg-green-info/50' : '',
          )}
        >
          <div
            className={twMerge(
              'bg-sub3 text-main flex h-5 w-5 items-center justify-center rounded-full text-sm font-semibold',
            )}
          >
            {id}
          </div>
          <label
            className={twMerge('text-main t4 w-full px-[10px] md:text-sm')}
          >
            {value}
          </label>
        </div>
      ) : (
        <div
          className={twMerge(
            'flex h-10 cursor-pointer items-center justify-center bg-white px-[10px] py-[10px] shadow-md md:min-w-[330px]',
            `${selected ? 'bg-sub1' : 'bg-white'}`,
          )}
        >
          <div
            className={twMerge(
              'bg-sub3 text-main flex h-5 w-5 items-center justify-center rounded-full text-sm font-semibold',
              `${selected ? 'bg-main text-white' : 'bg-sub3 text-main dark:text-white'}`,
            )}
          >
            {id}
          </div>
          <label
            className={twMerge(
              'text-main t4 w-full cursor-pointer px-[10px] md:text-sm',
              `${selected ? 'text-white' : 'text-main'}`,
            )}
          >
            {value}
          </label>
        </div>
      )}
    </>
  );
}

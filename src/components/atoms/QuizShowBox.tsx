import { twMerge } from 'tailwind-merge';

export default function QuizShowBox({
  id,
  correct,
  value,
}: {
  id: string;
  correct: boolean;
  value: string;
}) {
  return (
    <>
      <div
        className={twMerge(
          'flex h-10 items-center justify-center bg-white px-[10px] py-[10px] shadow-md md:min-w-[330px]',
          `${correct ? 'bg-green-info/50' : 'bg-white'}`,
        )}
      >
        <div className="bg-sub3 text-main flex h-5 w-5 items-center justify-center rounded-full text-sm font-semibold">
          {id}
        </div>
        <label className="text-main t4 w-full px-[10px] md:text-sm">
          {value}
        </label>
      </div>
    </>
  );
}

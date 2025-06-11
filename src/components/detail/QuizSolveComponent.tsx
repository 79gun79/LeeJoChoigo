import { Check, ChevronDown, ChevronRight, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import type { QuizItem } from '../../types/quizList';
import QuizSolveBox from '../atoms/QuizSolveBox';

export default function QuizSolveComponent({
  index,
  item,
  choose,
  onSelect,
  showRes,
}: {
  index: number;
  item: QuizItem;
  choose: string[];
  onSelect: (optId: string) => void;
  showRes: boolean;
}) {
  const [isShow, setShow] = useState(false);
  const { description, quiz } = item;

  const clickHandler = (id: string) => {
    if (showRes) return;
    onSelect(id);
  };

  const correctIds = quiz
    .filter((v) => v.selected)
    .map((v) => v.id)
    .sort();
  const selectIds = choose.slice().sort();
  const isCorrect =
    correctIds.length === selectIds.length &&
    correctIds.every((v, i) => v === selectIds[i]);

  return (
    <>
      <div
        className={twMerge(
          'flex w-full flex-col rounded-sm border border-[#DEDEDE] p-[14px] md:p-4',
          isShow ? 'gap-[14px]' : '',
        )}
      >
        <div className="flex">
          <p className="t4 font-bold">문제 {index + 1}</p>
          {showRes ? (
            isCorrect ? (
              <Check className="text-green-info ml-4" size={24} />
            ) : (
              <X className="text-red-caution ml-4" size={24} />
            )
          ) : (
            ''
          )}
          <div className="flex-grow"></div>
          {isShow ? (
            <ChevronDown
              onClick={() => setShow(false)}
              className={twMerge(
                'text-gray4',
                'mt-[-6px] mr-[-6px] cursor-pointer md:mt-0 md:mr-[-8px]',
              )}
              size={24}
            />
          ) : (
            <ChevronRight
              onClick={() => setShow(true)}
              className={twMerge(
                'text-gray4',
                'mt-[-6px] mr-[-6px] cursor-pointer md:mt-0 md:mr-[-8px]',
              )}
              size={24}
            />
          )}
        </div>
        {isShow && (
          <>
            <div className="t4">{description}</div>

            <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 md:gap-[16px]">
              {quiz.map((v) => (
                <div key={v.id} onClick={() => clickHandler(v.id)}>
                  <QuizSolveBox
                    id={v.id}
                    correct={v.selected}
                    value={v.value}
                    selected={choose.includes(v.id)}
                    showRes={showRes}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

import { twMerge } from 'tailwind-merge';
import type { QuizItem } from '../../types/quizList';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import QuizShowBox from '../atoms/QuizShowBox';

export default function QuizShowComponent({
  index,
  item,
}: {
  index: number;
  item: QuizItem;
}) {
  const [isShow, setShow] = useState(true);
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
            <div className="t4">{item.description}</div>

            <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 md:gap-[16px]">
              {item.quiz.map((v) => (
                <QuizShowBox
                  key={v.id}
                  id={v.id}
                  correct={v.selected}
                  value={v.value}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

import { twMerge } from 'tailwind-merge';
import type { QuizItem } from '../../types/quizList';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import QuizShowBox from '../atoms/QuizShowBox';

export default function QuizShowComponent({
  index,
  item,
  hasCreate,
}: {
  index: number;
  item: QuizItem;
  hasCreate?: boolean;
}) {
  const [isShow, setShow] = useState(hasCreate);

  return (
    <>
      <div
        className={twMerge(
          'flex w-full flex-col rounded-sm border border-[#DEDEDE] p-[14px] md:p-4',
          hasCreate ? 'gap-[14px]' : 'pb-0 md:pb-1',
        )}
      >
        {isShow ? (
          <div onClick={() => setShow(false)} className="flex cursor-pointer">
            <p className="t4 font-bold">문제 {index + 1}</p>
            <div className="flex-grow"></div>
            <ChevronDown
              className={twMerge(
                'text-gray4',
                'mt-[-6px] mr-[-6px] cursor-pointer md:mt-0 md:mr-[-8px]',
              )}
              size={24}
            />
          </div>
        ) : (
          <div onClick={() => setShow(true)} className="flex cursor-pointer">
            <p className="t4 font-bold">문제 {index + 1}</p>
            <div className="flex-grow"></div>
            <ChevronRight
              className={twMerge(
                'text-gray4',
                'mt-[-6px] mr-[-6px] cursor-pointer md:mt-0 md:mr-[-8px]',
              )}
              size={24}
            />
          </div>
        )}

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

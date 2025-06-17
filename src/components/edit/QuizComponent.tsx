import { useEffect, useState } from 'react';
import QuizChooseBox from '../atoms/QuizChooseBox';
import { ChevronDown, ChevronRight, Plus, Trash2, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import type { QuizItem } from '../../types/quizList';
import { notify } from '../../utils/customAlert';

type JobQuizProps = {
  index: number;
  item: QuizItem;
  onDelete: (index: number) => void;
  onChange: (index: number, value: QuizItem) => void;
  onValid?: (valid: boolean) => void;
};

export default function QuizComponent({
  index,
  item,
  onDelete,
  onChange,
  onValid,
}: JobQuizProps) {
  const { description, quiz } = item;
  const [isShow, setShow] = useState(true);
  const [valid, setValid] = useState(true);

  const isValid = () => {
    const hasDescription = description.trim() !== '';
    const hasSelected = quiz.filter((v) => v.selected).length >= 1;
    const hasValue = quiz.every((v) => v.value.trim() !== '');
    return hasDescription && hasSelected && hasValue;
  };

  useEffect(() => {
    const valid = isValid();
    onValid?.(valid);
  }, [description, quiz]);

  const updateDescription = (newVal: string) => {
    onChange(index, { ...item, description: newVal });
  };

  const updateQuiz = (id: string, newVal: string) => {
    const update = quiz.map((v) => (v.id === id ? { ...v, value: newVal } : v));
    onChange(index, { ...item, quiz: update });
  };

  const createQuiz = () => {
    if (isValid()) {
      setShow(false);
      setValid(true);
      notify('퀴즈를 생성했습니다!', 'success');
    } else {
      setValid(true);
      if (quiz.filter((v) => v.selected).length < 1) setValid(false);
      notify('퀴즈가 완성되지 않았습니다!', 'warning');
    }
  };
  const deleteQuiz = () => {
    onDelete(index);
    notify('퀴즈를 삭제했습니다!', 'success');
  };

  const toggleSelect = (id: string) => {
    const update = quiz.map((v) =>
      v.id === id ? { ...v, selected: !v.selected } : v,
    );
    onChange(index, { ...item, quiz: update });
  };

  const resetQuiz = () => {
    const reset = [
      { id: 'A', selected: false, value: '' },
      { id: 'B', selected: false, value: '' },
      { id: 'C', selected: false, value: '' },
      { id: 'D', selected: false, value: '' },
    ];
    onChange(index, { description: '', quiz: reset });
    notify('퀴즈가 초기화 되었습니다!', 'warning');
  };
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
              onClick={() => isValid() && setShow(false)}
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
            <textarea
              className={twMerge('edit-input', 'h-15 resize-none')}
              placeholder="문제에 대한 설명을 작성하세요"
              value={description}
              onChange={(e) => updateDescription(e.target.value)}
            />

            <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 md:gap-[16px]">
              {quiz.map((v) => (
                <QuizChooseBox
                  key={v.id}
                  id={v.id}
                  selected={v.selected}
                  value={v.value}
                  onChangeValue={(val) => updateQuiz(v.id, val)}
                  onSelectToggle={() => toggleSelect(v.id)}
                />
              ))}
            </div>
            {!valid && (
              <p className="t4 text-red-caution">
                1개 이상의 정답을 체크하세요!
              </p>
            )}
            <div className="mt-[10px] flex gap-[14px]">
              <div onClick={resetQuiz} className="button-quiz">
                <X className="ml-[7px]" size={16} />
                <span className="ml-[3px]">취소</span>
              </div>
              <div className="flex-grow"></div>
              <div onClick={deleteQuiz} className="button-quiz delete">
                <Trash2 size={16} />
              </div>
              <div onClick={createQuiz} className="button-quiz plus">
                <Plus className="ml-[7px]" size={16} />
                <span className="ml-[3px]">생성</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

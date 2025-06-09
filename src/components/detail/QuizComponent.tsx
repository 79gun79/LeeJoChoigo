import { useState } from 'react';
import QuizChooseBox from '../atoms/QuizChooseBox';
import { ChevronDown, ChevronRight, Plus, Trash2, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type QuizComponentProps = {
  id: number;
  index: number;
  onDelete: (id: number) => void;
};

export default function QuizComponent({
  id,
  index,
  onDelete,
}: QuizComponentProps) {
  const initialOptions = [
    { id: 'A', selected: false, value: '' },
    { id: 'B', selected: true, value: '' },
    { id: 'C', selected: false, value: '' },
    { id: 'D', selected: false, value: '' },
  ];

  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(initialOptions);
  const [isShow, setShow] = useState(false);

  const updateValue = (id: string, newVal: string) => {
    setOptions((opts) =>
      opts.map((opt) => (opt.id === id ? { ...opt, value: newVal } : opt)),
    );
  };

  const toggleSelect = (id: string) => {
    setOptions((opts) =>
      opts.map((opt) =>
        opt.id === id ? { ...opt, selected: !opt.selected } : opt,
      ),
    );
  };

  const resetOptions = () => {
    setDescription('');
    setOptions(initialOptions);
    setShow(false);
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
            <textarea
              className={twMerge('edit-input', 'h-15 resize-none')}
              placeholder="문제에 대한 설명을 작성하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 md:gap-[16px]">
              {options.map((opt) => (
                <QuizChooseBox
                  key={opt.id}
                  id={opt.id}
                  selected={opt.selected}
                  value={opt.value}
                  onChangeValue={(val) => updateValue(opt.id, val)}
                  onSelectToggle={() => toggleSelect(opt.id)}
                />
              ))}
            </div>
            <div className="mt-[10px] flex gap-[14px]">
              <div onClick={resetOptions} className="button-quiz">
                <X className="ml-[7px]" size={16} />
                <span className="ml-[3px]">취소</span>
              </div>
              <div className="flex-grow"></div>
              <div onClick={() => onDelete(id)} className="button-quiz delete">
                <Trash2 size={16} />
              </div>
              <div onClick={() => setShow(false)} className="button-quiz plus">
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

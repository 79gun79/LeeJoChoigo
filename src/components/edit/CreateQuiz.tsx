// import { StickyNote } from 'lucide-react';
import CheckItem from '../ui/CheckItem';

export default function EditText({ problems }: { problems?: boolean }) {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {problems && (
          <div className="h-full w-full lg:grid lg:grid-rows-[auto_1fr] lg:pb-9">
            <p className="mb-2.5 text-sm md:text-base lg:text-lg">문제</p>
            <div className="mb-7 h-[250px] overflow-auto rounded-sm bg-[var(--color-bg-white)] p-2.5 text-xs md:text-sm lg:h-full lg:text-base">
              문제내용..
            </div>
          </div>
        )}
        <form className={`col-span-2 w-full ${problems && 'lg:col-span-1'}`}>
          <div className="mb-[25px] md:mb-[35px]">
            <p className="mb-2.5 text-sm md:text-base lg:text-lg">제목</p>
            <input
              className="edit-input mb-5"
              type="text"
              placeholder="제목을 입력하세요"
            />
            <div className="mb-2.5 flex items-end">
              <p className="text-sm md:text-base lg:text-lg">내용</p>
              {/* <div className="ml-auto flex gap-2">
                <button className="button-sm">
                  <StickyNote className="h-[14px] w-[12px] shrink-0" /> 템플릿
                  불러오기
                </button>
                <button className="button-sm">
                  <StickyNote className="h-[14px] w-[12px] shrink-0" />
                  템플릿 저장
                </button>
              </div> */}
            </div>
            <div className="mb-5 min-h-[300px] rounded-sm border border-[#ccc] text-xs md:text-sm lg:text-base">
              에디터영역
            </div>
            <div className="flex flex-wrap gap-2.5">
              <div className="mb-2">
                <p className="mb-1.5 text-sm md:text-base">카테고리</p>
                <div className="flex flex-wrap gap-2.5">
                  <div className="mb-4 flex flex-wrap gap-2.5">
                    <CheckItem id="1" title="프론트엔드" />
                    <CheckItem id="2" title="백엔드" />
                    <CheckItem id="3" title="모바일 앱" />
                    <CheckItem id="4" title="기타" />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <p className="mb-1.5 text-sm md:text-base">퀴즈생성</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

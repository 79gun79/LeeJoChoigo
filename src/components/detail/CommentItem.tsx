import Avartar from '../ui/Avartar';

export default function CommentItem() {
  return (
    <>
      <div className="border-b border-[#ccc] py-2.5">
        <div className="mb-2.5 flex items-center">
          <Avartar />
          <button className="ml-auto text-[10px] text-[#FF6363] md:text-xs lg:text-sm">
            삭제
          </button>
        </div>
        <p className="mb-2.5 text-xs md:text-sm lg:text-base">댓글입니다.</p>
        <p className="text-right text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
          2시간 전
        </p>
      </div>
    </>
  );
}

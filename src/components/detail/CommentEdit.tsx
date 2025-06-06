import Avartar from '../ui/Avartar';

export default function CommentEdit() {
  return (
    <>
      <div className="mb-3 rounded-sm border border-[#ccc] p-3">
        <div className="mb-2.5">
          <Avartar />
        </div>
        <form>
          <textarea
            className="mb-2.5 h-[50px] w-full resize-none overflow-auto"
            placeholder="댓글을 입력해주세요"
          ></textarea>
          <div className="flex justify-end">
            <button className="rounded-sm bg-[var(--color-main)] px-2 py-1 text-[10px] text-white md:px-2.5 md:text-xs lg:px-3 lg:text-sm">
              등록
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

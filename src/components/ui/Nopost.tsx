import { SquarePen } from 'lucide-react';

export default function Nopost() {
  return (
    <>
      <div className="text-gray2 flex h-[300px] w-full flex-col items-center justify-center gap-3 text-center text-sm font-bold md:col-span-2">
        <SquarePen className="h-10 w-10" />
        <p>해당 게시글이 없습니다.</p>
      </div>
    </>
  );
}

import { X } from 'lucide-react';

export default function TagItem() {
  return (
    <>
      <div className="bg-sub1 flex items-center gap-1 rounded-sm px-2 py-1 text-xs text-white md:text-sm">
        태그명
        <button>
          <X className="h-[14px] w-[14px] md:h-[16px] md:w-[16px]" />
        </button>
      </div>
    </>
  );
}

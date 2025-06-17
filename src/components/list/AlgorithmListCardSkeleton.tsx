export default function AlgorithmListCardSkeleton() {
  return (
    <div className="w-full rounded-sm border border-[#ccc]">
      <div className="px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
        <div className="mb-2.5 h-3.5 w-2/3 bg-gray-200 md:h-4.5 lg:h-5.5"></div>
        <div className="mb-1 h-3 w-full bg-gray-200 md:h-4 lg:h-5"></div>
        <div className="mb-2.5 h-3 w-4/5 bg-gray-200 md:h-4 lg:h-5"></div>
        <div className="h-2.5 w-1/3 bg-gray-200 md:h-3.5 lg:h-4.5"></div>
      </div>
      <div className="flex w-full border-t border-[#ccc] px-3 py-2 md:px-4 md:py-2.5">
        <div className="h-3 w-1/2 bg-gray-200 md:h-4 lg:h-5"></div>
      </div>
    </div>
  );
}

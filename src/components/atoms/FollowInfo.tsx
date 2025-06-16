export default function FollowInfo() {
  return (
    <div className="flex gap-8 text-sm md:ml-10 md:text-base lg:text-lg">
      <div className="flex flex-col">
        <span className="font-semibold text-black">100</span>
        <span className="text-xs md:text-sm">팔로워</span>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-black">20</span>
        <span className="text-xs md:text-sm">팔로잉</span>
      </div>
    </div>
  );
}

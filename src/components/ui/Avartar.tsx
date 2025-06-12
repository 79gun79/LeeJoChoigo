import type { User } from '../../types';

export default function Avartar({ user }: { user?: User }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="h-[24px] w-[24px] overflow-hidden rounded-full border border-[#eee] md:h-[26px] md:w-[26px] lg:h-[28px] lg:w-[28px]">
          <img
            className="h-full w-full object-cover"
            src={
              user?.image ||
              'https://www.studiopeople.kr/common/img/default_profile.png'
            }
          />
        </div>
        <div>
          <span className="text-[10px] text-[#464646] md:text-xs lg:text-sm">
            {user?.fullname || '익명'}
          </span>
        </div>
      </div>
    </>
  );
}

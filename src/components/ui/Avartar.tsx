import { useNavigate } from 'react-router';
import type { User } from '../../types';

interface AvartarProps {
  user: User;
  profileLink?: boolean;
}

export default function Avartar({ user, profileLink = false }: AvartarProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (profileLink && user?.id) {
      navigate(`/profile/${user.id}`);
    }
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <div
          onClick={handleClick}
          className={`${profileLink ? 'cursor-pointer' : ''} h-[24px] w-[24px] overflow-hidden rounded-full border border-[#eee] md:h-[26px] md:w-[26px] lg:h-[28px] lg:w-[28px]`}
        >
          <img
            className="h-full w-full object-cover"
            src={
              user?.image ||
              'https://www.studiopeople.kr/common/img/default_profile.png'
            }
          />
        </div>
        <div>
          <span className="text-gray3 text-[10px] md:text-xs lg:text-sm">
            {user?.fullname || '익명'}
          </span>
        </div>
      </div>
    </>
  );
}

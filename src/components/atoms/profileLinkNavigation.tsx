import { useNavigate } from 'react-router';

interface ProfileLinkProps {
  email?: string;
  userId: string;
  fullname: string;
  image?: string | null;
  onClose?: () => void;
}

export default function ProfileLinkNavigation({
  email,
  userId,
  fullname,
  image,
  onClose,
}: ProfileLinkProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (onClose) onClose();
    navigate(`/profile/${userId}`);
  };

  return (
    <button onClick={handleNavigate} className="flex w-full items-center gap-2">
      <img
        src={
          image || 'https://www.studiopeople.kr/common/img/default_profile.png'
        }
        alt={`${fullname}의 프로필 이미지`}
        className="h-8 w-8 rounded-full object-cover md:h-10 md:w-10"
      />
      <div className="flex flex-col items-start">
        <span className="t4 font-semibold">{fullname}</span>
        {email && <span className="t5 text-gray4">{email}</span>}
      </div>
    </button>
  );
}

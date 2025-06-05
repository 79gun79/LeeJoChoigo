import sidebarBack from '../../assets/images/icon-sidebar-back.png';
import userDefault from '../../assets/images/icon-user-default.png';
import sidebarMypage from '../../assets/images/icon-sidebar-mypage.png';
import sidebarLogout from '../../assets/images/icon-sidebar-logout.png';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2 border-b p-4">
          <button onClick={onClose} className="text-xl">
            <img src={sidebarBack} alt="사이드바 닫기" />
          </button>
          <span>LOGO</span>
        </div>

        <div className="flex items-center gap-3 bg-[#184D59] px-4 py-6 text-white">
          <img
            src={userDefault}
            alt="사용자 이미지"
            className="h-10 w-10 rounded-full bg-white"
          />
          <div>
            <div className="text-sm font-medium">사용자</div>
            <div className="text-xs">user@gmail.com</div>
          </div>
        </div>

        <div className="flex border border-[#CCCCCC] text-sm">
          <button className="flex flex-1 items-center justify-center gap-1 border-r border-[#CCCCCC] py-2">
            마이페이지
            <img
              src={sidebarMypage}
              alt="마이페이지 가기"
              className="h-4 w-4"
            />
          </button>
          <button className="flex flex-1 items-center justify-center gap-1 py-2">
            로그아웃
            <img src={sidebarLogout} alt="로그아웃" className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4 text-lg">HOME</div>

          <div>
            <div className="mb-4 text-lg">문제 게시판</div>
            <div className="mb-4 pl-4 text-[16px]">
              <div className="mb-4">- 알고리즘 문제</div>
              <div>- 개발직군 문제</div>
            </div>
          </div>

          <div>
            <div className="mb-4 text-lg">풀이 게시판</div>
            <div className="mb-4 pl-4 text-[16px]">
              <div className="mb-4">- 알고리즘 풀이</div>
              <div>- 개발직군 풀이</div>
            </div>
          </div>

          <div className="text-lg">질문 게시판</div>
        </div>
      </aside>
    </>
  );
}

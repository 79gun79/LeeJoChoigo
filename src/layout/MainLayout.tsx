import { Outlet } from 'react-router';
import Header from './Header';
import IsLoginModal from '../components/modals/IsLoginModal';
import { useModalStore } from '../stores/modalStore';

export default function MainLayout() {
  const { isLogInOpen, setLogInModal } = useModalStore();
  return (
    <>
      <div className="fixed top-0 left-0 z-999 w-full bg-white">
        <Header />
      </div>
      <main className="pt-[55px] md:pt-[75px]">
        <Outlet />
        {isLogInOpen && (
          <IsLoginModal
            isOpen={isLogInOpen}
            onClose={() => setLogInModal(false)}
          />
        )}
      </main>
    </>
  );
}

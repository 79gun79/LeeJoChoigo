import { Outlet } from 'react-router';
import Header from './Header';
import IsLoginModal from '../components/modals/IsLoginModal';
import { useModalStore } from '../stores/modalStore';

export default function MainLayout() {
  const { isLogInOpen, setLogInModal } = useModalStore();
  return (
    <>
      <Header />
      <main>
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

import { Outlet } from 'react-router';
import Header from './Header';
import JobDetailedPage from '../pages/job/JobDetailedPage';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <JobDetailedPage />
        <Outlet />
      </main>
    </>
  );
}

import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

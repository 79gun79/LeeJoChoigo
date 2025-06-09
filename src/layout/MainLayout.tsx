import { Outlet } from 'react-router';
import Header from './Header';
import QuizCreateEdit from '../pages/solution/quiz/QuizCreateEdit';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <QuizCreateEdit />
      </main>
    </>
  );
}

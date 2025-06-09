// router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import MainLayout from '../layout/MainLayout';
import AuthLayout from '../layout/AuthLayout';
import { fetchUserData, requireNoAuth } from '../loader/auth.loader';
import NotFound from '../pages/NotFound';
import AlgorithmProblemList from '../pages/problem/algorithm/AlgorithmProblemList';
import QuizProblemList from '../pages/problem/quiz/QuizProblemList';
import JobDetailedPage from '../pages/problem/quiz/JobDetailedPage';
import QuizCreateEdit from '../pages/solution/quiz/QuizCreateEdit';
import AlgorithmSolutionList from '../pages/solution/algorithm/AlgorithmSolutionList';
import AlgorithmSolutionDetail from '../pages/solution/algorithm/AlgorithmSolutionDetail';
import AlgorithmSolutionEdit from '../pages/solution/algorithm/AlgorithmSolutionEdit';
import QuestionDetail from '../pages/question/QuestionDetail';
import QuestionEdit from '../pages/question/QuestionEdit';
import QuestionList from '../pages/question/QuestionList';
import Profile from '../pages/profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    hydrateFallbackElement: <></>,
    loader: fetchUserData,
    children: [
      {
        // index: true,
        // element: <Home />,
      },
      {
        path: 'problems',
        children: [
          // { index: true, element:  },
          { path: 'coding', element: <AlgorithmProblemList /> },
          { path: 'job', element: <QuizProblemList /> },
          { path: 'job/:id', element: <JobDetailedPage /> },
          { path: 'write', element: <QuizCreateEdit /> },
        ],
      },
      {
        path: 'solutions',
        children: [
          {
            path: 'coding',
            children: [
              { index: true, element: <AlgorithmSolutionList /> }, // 목록
              { path: ':id', element: <AlgorithmSolutionDetail /> }, // 상세
              { path: 'write', element: <AlgorithmSolutionEdit /> }, // 작성
            ],
          },
          {
            path: 'job',
            // children: [
            //   { index: true, element: <QuizSolutionList /> },            // 목록
            //   { path: ':id', element: <QuizSolutionDetail /> },          // 상세
            //   { path: 'write', element: <QuizSolutionEdit /> },         // 작성
            // ],
          },
        ],
      },
      {
        path: 'questions',
        children: [
          { index: true, element: <QuestionList /> },
          { path: ':id', element: <QuestionDetail /> },
          { path: 'write', element: <QuestionEdit /> },
        ],
      },
      {
        path: 'profile',
        children: [
          // { index: true, element:  },
          { path: ':userId', element: <Profile /> },
        ],
      },
    ],
  },
  {
    path: '/login',
    Component: AuthLayout,
    children: [{ index: true, element: <Login /> }],
    loader: requireNoAuth,
  },
  {
    path: '/signup',
    Component: AuthLayout,
    children: [{ index: true, element: <Signup /> }],
    loader: requireNoAuth,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

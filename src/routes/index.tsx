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
import {
  fetchChannel1,
  fetchChannel2,
  fetchChannel3,
  fetchChannel4,
  fetchChannel5,
} from '../loader/channel.loader';
import QuizSolutionList from '../pages/solution/quiz/QuizSolutionList';
import { fetchProfile } from '../loader/profile.loader';
import { fetchPostDetail } from '../loader/post.loader';

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
          {
            path: 'coding',
            element: <AlgorithmProblemList />,
            loader: fetchChannel1,
          },
          { path: 'job', element: <QuizProblemList />, loader: fetchChannel2 },
          {
            path: 'job/:id',
            element: <JobDetailedPage />,
            loader: fetchPostDetail,
          },
          { path: 'write', element: <QuizCreateEdit /> },
        ],
      },
      {
        path: 'solutions',
        children: [
          {
            path: 'coding',
            children: [
              {
                index: true,
                element: <AlgorithmSolutionList />,
                loader: fetchChannel3,
              }, // 목록
              { path: ':id', element: <AlgorithmSolutionDetail /> }, // 상세
              { path: 'write', element: <AlgorithmSolutionEdit /> }, // 작성
            ],
          },
          {
            path: 'job',
            children: [
              {
                index: true,
                element: <QuizSolutionList />,
                loader: fetchChannel4,
              }, // 목록
              // { path: ':id', element: <QuizSolutionDetail /> },          // 상세
              // { path: 'write', element: <QuizSolutionEdit /> },         // 작성
            ],
          },
        ],
      },
      {
        path: 'questions',
        children: [
          { index: true, element: <QuestionList />, loader: fetchChannel5 },
          { path: ':id', element: <QuestionDetail /> },
          { path: 'write', element: <QuestionEdit /> },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: ':userId',
            loader: fetchProfile,
            Component: Profile,
          },
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

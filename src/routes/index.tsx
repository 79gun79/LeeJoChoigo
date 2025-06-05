// router.tsx
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import MainLayout from '../components/Layout/MainLayout';
import AuthLayout from '../components/Layout/AuthLayout';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'problems',
        children: [
          { index: true, element:  },
          { path: 'coding', element:  },
          { path: 'job', element:  },
          { path: 'job/:id', element:  },
          { path: 'write', element:  },
        ],
      },
      {
        path: 'solutions',
        children: [
          { index: true, element:  },
          { path: ':id', element:  },
          { path: 'write', element:  },
        ],
      },
      {
        path: 'questions',
        children: [
          { index: true, element:  },
          { path: ':id', element:  },
          { path: 'write', element:  },
        ],
      },
      {
        path: 'profile',
        children: [
          { index: true, element:  },
          { path: ':userId', element:  },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: '/signup',
    element: <AuthLayout />,
    children: [{ index: true, element: <Signup /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default function Router() {
  return(
  <>
    <RouterProvider router={router}/>
  </>);
}
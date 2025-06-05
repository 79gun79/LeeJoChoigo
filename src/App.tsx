import { Route, Routes } from 'react-router';
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="problems">
            <Route index element={<Problem />} />
            <Route path="coding" element={<Problem />} />
            <Route path="job" element={<Problem />} />
            <Route path="job/:id" element={<JobProblem />} />
            <Route path="write" element={<ProblemWrite />} />
          </Route>

          <Route path="solutions">
            <Route index element={<Solution />} />
            <Route path=":id" element={<Solution />} />
            <Route path="write" element={<SolutionWrite />} />
          </Route>

          <Route path="questions">
            <Route index element={<Question />} />
            <Route path=":id" element={<Question />} />
            <Route path="write" element={<QuestionWrite />} />
          </Route>

          <Route path="profile">
            <Route index element={<MyProfile />} />
            <Route path=":userId" element={<UserProfile />} />
          </Route>
        </Route>

        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/signup" element={<AuthLayout />}>
          <Route index element={<Signup />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

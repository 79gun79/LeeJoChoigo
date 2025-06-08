import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.css';
import Router from './routes';
import JobDetailedPage from './pages/job/JobDetailedPage';
import AlgorithmSolutionEdit from './pages/solution/algorithm/AlgorithmSolutionEdit';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JobDetailedPage />
  </StrictMode>,
);

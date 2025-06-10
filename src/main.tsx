import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.css';
import Router from './routes';
import { ToastContainer } from 'react-toastify';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer limit={1} />
    <Router />
  </StrictMode>,
);

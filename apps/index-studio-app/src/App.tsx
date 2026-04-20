import { RouterProvider } from 'react-router-dom';
import { router } from '@/features/router';
import { BacktestProvider } from '@/contexts/BacktestContext';
import './index.css';

export default function App() {
  return (
    <BacktestProvider>
      <RouterProvider router={router} />
    </BacktestProvider>
  );
}

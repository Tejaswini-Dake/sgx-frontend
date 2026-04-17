import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

// Lazy load remote apps
const AuthApp = lazy(() =>
  import('auth/App').catch(() => ({
    default: () => <div>Auth failed to load</div>,
  }))
);

const MainApp = lazy(() =>
  import('main/App').catch(() => ({
    default: () => <div>Main failed to load</div>,
  }))
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center text-slate-600">Loading...</div>
        }
      >
        <Routes>
          {/* Auth routes */}
          <Route path="/auth/*" element={<AuthApp />} />

          {/* Main app routes */}
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

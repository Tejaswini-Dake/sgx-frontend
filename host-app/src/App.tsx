import { Suspense, lazy } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { sharedUtil } from '@sgx/shared';
import './index.css';

const AuthApp = lazy(() => import('auth/App').catch(() => ({
  default: () => <div>Auth failed to load</div>
})));

const MainApp = lazy(() => import('main/App').catch(() => ({
  default: () => <div>Main failed to load</div>
})));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 px-6 py-4">
          <div className="mb-2 text-sm text-slate-600">{sharedUtil()}</div>
          <nav className="flex gap-4">
            <Link className="text-blue-600 hover:underline" to="/auth">
              Auth
            </Link>
            <Link className="text-blue-600 hover:underline" to="/main">
              Main
            </Link>
          </nav>
        </header>

        <main className="p-6">
          <Suspense fallback={<div>Loading remote app…</div>}>
            <Routes>
              <Route path="/*" element={<MainApp />} />
              <Route path="/auth" element={<AuthApp />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

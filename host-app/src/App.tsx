import { Suspense, lazy } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
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
              <Route path="/auth" element={<AuthApp />} />
              <Route path="/main" element={<MainApp />} />
              <Route
                path="*"
                element={<div>Choose <strong>/auth</strong> or <strong>/main</strong>.</div>}
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

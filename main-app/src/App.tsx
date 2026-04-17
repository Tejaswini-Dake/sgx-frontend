import { Button } from '@sgx/ui';
import { sharedUtil } from '@sgx/shared';
import { Link, Route, Routes } from 'react-router-dom';
import { BacktestDashboard } from './features/backtest';

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
      <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">{sharedUtil()}</h1>
        <Button />
        <Link to="/backtest">Backtest</Link>
        <Routes>
          <Route path="backtest" element={<BacktestDashboard />} />
        </Routes>
      </div>
    </main>
  );
}

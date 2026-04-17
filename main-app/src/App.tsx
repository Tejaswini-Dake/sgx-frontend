import { Routes, Route } from 'react-router-dom';
import { Button } from '@sgx/ui';
import { sharedUtil } from '@sgx/shared';
import Layout from './components/Layout/Layout';
import './index.css';
 
const DashboardContent = () => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-red-500 mb-2">Welcome to SLA Dashboard</h1>
    <p className="text-slate-600">{sharedUtil()}</p>
  </div>
);
 
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<><DashboardContent /></>} />
        <Route path="analytics" element={<><DashboardContent /></>} />
        <Route path="*" element={<><DashboardContent /></>} />
      </Route>
    </Routes>
  );
}
 
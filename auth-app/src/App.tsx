import { Button } from '@sgx/ui';
import { sharedUtil } from '@sgx/shared';

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
      <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">{sharedUtil()}</h1>
        <Button />
      </div>
    </main>
  );
}

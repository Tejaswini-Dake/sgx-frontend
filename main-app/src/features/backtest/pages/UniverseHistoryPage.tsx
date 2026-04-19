import { useNavigate, useParams } from 'react-router-dom';
import { useBacktest } from '@/contexts/BacktestContext';
import { ArrowLeft } from 'lucide-react';

export default function UniverseHistoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { universes } = useBacktest();

  const universe = universes.find(u => u.id === Number(id));

  if (!universe) {
    return (
      <div className="max-w-7xl">
        <button
          onClick={() => navigate('/parameters/universe')}
          className="flex items-center gap-2 mb-4 px-4 py-2 rounded-lg transition-all hover:bg-gray-50"
          style={{ border: '1px solid #E5E7EB', color: '#6B7280' }}
        >
          <ArrowLeft size={18} />
          Back to Universe Selection
        </button>
        <div className="text-center py-12" style={{ color: '#6B7280' }}>
          Universe not found.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-6">
        <button
          onClick={() => navigate('/parameters/universe')}
          className="flex items-center gap-2 mb-4 px-4 py-2 rounded-lg transition-all hover:bg-gray-50"
          style={{ border: '1px solid #E5E7EB', color: '#6B7280' }}
        >
          <ArrowLeft size={18} />
          Back to Universe Selection
        </button>
        <h1 className="text-2xl mb-1" style={{ color: '#0B236B' }}>
          {universe.universeName}
        </h1>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          {universe.description}
        </p>
      </div>

      {/* Universe Metadata */}
      <div className="bg-white rounded-lg p-6 mb-6" style={{ border: '1px solid #E5E7EB' }}>
        <h2 className="text-lg mb-4" style={{ color: '#0B236B' }}>Details</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Type</p>
            <span
              className="px-2 py-1 rounded text-xs"
              style={{
                backgroundColor: universe.type === 'Global Universe' ? '#E0F2FE' : '#F0FDF4',
                color: universe.type === 'Global Universe' ? '#0369A1' : '#15803D',
              }}
            >
              {universe.type}
            </span>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Created At</p>
            <p className="text-sm" style={{ color: '#0B236B' }}>{universe.createdAt}</p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Last Updated</p>
            <p className="text-sm" style={{ color: '#0B236B' }}>{universe.updatedAt}</p>
          </div>
        </div>
      </div>

      {/* Upload History */}
      <div className="bg-white rounded-lg" style={{ border: '1px solid #E5E7EB' }}>
        <div className="p-6 border-b" style={{ borderColor: '#E5E7EB' }}>
          <h2 className="text-lg" style={{ color: '#0B236B' }}>
            Upload History
            <span className="ml-2 text-sm font-normal" style={{ color: '#6B7280' }}>
              ({universe.uploadHistory.length} uploads)
            </span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>File Name</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Uploaded By</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Uploaded At</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>File Size</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {universe.uploadHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm" style={{ color: '#6B7280' }}>
                    No upload history available
                  </td>
                </tr>
              ) : (
                universe.uploadHistory.map((upload, index) => (
                  <tr
                    key={upload.id}
                    className="hover:bg-gray-50 transition-colors"
                    style={{ borderBottom: index < universe.uploadHistory.length - 1 ? '1px solid #E5E7EB' : 'none' }}
                  >
                    <td className="px-6 py-4 text-sm" style={{ color: '#0B236B' }}>{upload.fileName}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#0B236B' }}>{upload.uploadedBy}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#6B7280' }}>{upload.uploadedAt}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#6B7280' }}>{upload.fileSize ?? '—'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: upload.status === 'Active' ? '#DCFCE7' : '#F3F4F6',
                          color: upload.status === 'Active' ? '#166534' : '#6B7280',
                        }}
                      >
                        {upload.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useNavigate, useParams } from 'react-router-dom';
import { useBacktest } from '@/contexts/BacktestContext';
import { ArrowLeft, User, Clock } from 'lucide-react';

export default function FilterSetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { filterSets } = useBacktest();

  const filterSet = filterSets.find(f => f.id === Number(id));

  if (!filterSet) {
    return (
      <div className="max-w-7xl">
        <button
          onClick={() => navigate('/parameters/filtering')}
          className="flex items-center gap-2 mb-4 px-4 py-2 rounded-lg transition-all hover:bg-gray-50"
          style={{ border: '1px solid #E5E7EB', color: '#6B7280' }}
        >
          <ArrowLeft size={18} />
          Back to Filtering
        </button>
        <div className="text-center py-12" style={{ color: '#6B7280' }}>
          Filter set not found.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-6">
        <button
          onClick={() => navigate('/parameters/filtering')}
          className="flex items-center gap-2 mb-4 px-4 py-2 rounded-lg transition-all hover:bg-gray-50"
          style={{ border: '1px solid #E5E7EB', color: '#6B7280' }}
        >
          <ArrowLeft size={18} />
          Back to Filtering
        </button>
        <h1 className="text-2xl mb-1" style={{ color: '#0B236B' }}>
          {filterSet.name}
        </h1>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          {filterSet.description}
        </p>
      </div>

      {/* Metadata */}
      <div className="bg-white rounded-lg p-6 mb-6" style={{ border: '1px solid #E5E7EB' }}>
        <h2 className="text-lg mb-4" style={{ color: '#0B236B' }}>Details</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Created By</p>
            <div className="flex items-center gap-1.5">
              <User size={14} style={{ color: '#0094B3' }} />
              <p className="text-sm" style={{ color: '#0B236B' }}>{filterSet.createdBy}</p>
            </div>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Created At</p>
            <div className="flex items-center gap-1.5">
              <Clock size={14} style={{ color: '#0094B3' }} />
              <p className="text-sm" style={{ color: '#0B236B' }}>{filterSet.createdAt}</p>
            </div>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Modified By</p>
            <div className="flex items-center gap-1.5">
              <User size={14} style={{ color: '#0094B3' }} />
              <p className="text-sm" style={{ color: '#0B236B' }}>{filterSet.modifiedBy}</p>
            </div>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Modified At</p>
            <div className="flex items-center gap-1.5">
              <Clock size={14} style={{ color: '#0094B3' }} />
              <p className="text-sm" style={{ color: '#0B236B' }}>{filterSet.modifiedAt}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Rules */}
      <div className="bg-white rounded-lg" style={{ border: '1px solid #E5E7EB' }}>
        <div className="p-6 border-b" style={{ borderColor: '#E5E7EB' }}>
          <h2 className="text-lg" style={{ color: '#0B236B' }}>
            Filter Rules
            <span className="ml-2 text-sm font-normal" style={{ color: '#6B7280' }}>
              ({filterSet.filters.length} filters)
            </span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>#</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Factor</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Condition</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Value</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filterSet.filters.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm" style={{ color: '#6B7280' }}>
                    No filter rules defined
                  </td>
                </tr>
              ) : (
                filterSet.filters.map((filter, index) => (
                  <tr
                    key={filter.id}
                    className="hover:bg-gray-50 transition-colors"
                    style={{ borderBottom: index < filterSet.filters.length - 1 ? '1px solid #E5E7EB' : 'none' }}
                  >
                    <td className="px-6 py-4 text-sm" style={{ color: '#6B7280' }}>{index + 1}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#0B236B' }}>{filter.field}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className="px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}
                      >
                        {filter.operator}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#0B236B' }}>{filter.value}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: filter.enabled ? '#DCFCE7' : '#F3F4F6',
                          color: filter.enabled ? '#166534' : '#6B7280',
                        }}
                      >
                        {filter.enabled ? 'Enabled' : 'Disabled'}
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

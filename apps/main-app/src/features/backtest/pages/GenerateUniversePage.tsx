import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBacktest } from '@/contexts/BacktestContext';
import { Plus, Play, Eye, Edit2, Download, Trash2, Loader, FileText } from 'lucide-react';

export default function GenerateUniversePage() {
  const navigate = useNavigate();
  const {
    universes,
    filterSets,
    universeConfigurations,
    runUniverseConfiguration,
    deleteUniverseConfiguration,
  } = useBacktest();

  const [expandedConfigId, setExpandedConfigId] = useState<number | null>(null);

  const getUniverseName = (id: number) =>
    universes.find(u => u.id === id)?.universeName || 'Unknown';

  const getFilterSetName = (id: number) =>
    filterSets.find(f => f.id === id)?.name || 'Unknown';

  const handleDownload = (fileName: string) => {
    alert(`Downloading ${fileName}...`);
  };

  const toggleExpandConfig = (configId: number) => {
    setExpandedConfigId(expandedConfigId === configId ? null : configId);
  };

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl mb-1" style={{ color: '#0B236B' }}>
            Generate Universe
          </h1>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Configure universe with filters and generate output files
          </p>
        </div>
        <button
          onClick={() => navigate('/parameters/configure-universe/create')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-90"
          style={{ backgroundColor: '#0094B3', color: '#ffffff' }}
        >
          <Plus size={18} />
          New Generation
        </button>
      </div>

      <div className="bg-white rounded-lg" style={{ border: '1px solid #E5E7EB' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280', width: '25%' }}>Generation Name</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280', width: '15%' }}>Universe</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280', width: '15%' }}>Filter Set</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280', width: '12%' }}>Review Date</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280', width: '10%' }}>Frequency</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280', width: '10%' }}>Status</th>
                <th className="px-6 py-3 text-center text-xs uppercase tracking-wider" style={{ color: '#6B7280', width: '13%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {universeConfigurations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="text-sm mb-4" style={{ color: '#6B7280' }}>
                      No universe configurations yet
                    </div>
                    <button
                      onClick={() => navigate('/parameters/configure-universe/create')}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-90 mx-auto"
                      style={{ backgroundColor: '#0094B3', color: '#ffffff' }}
                    >
                      <Plus size={18} />
                      Generate First Universe
                    </button>
                  </td>
                </tr>
              ) : (
                universeConfigurations.map((config, index) => (
                  <>
                    <tr
                      key={config.id}
                      className="hover:bg-gray-50 transition-colors"
                      style={{
                        borderBottom:
                          index < universeConfigurations.length - 1 || expandedConfigId === config.id
                            ? '1px solid #E5E7EB'
                            : 'none',
                      }}
                    >
                      <td className="px-6 py-4 text-sm" style={{ color: '#0B236B' }}>{config.name}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#0B236B' }}>{getUniverseName(config.universeId)}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#0B236B' }}>{getFilterSetName(config.filterSetId)}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#0B236B' }}>{config.reviewDate}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#0B236B' }}>{config.frequency}</td>
                      <td className="px-6 py-4">
                        <span
                          className="px-2 py-1 rounded text-xs inline-flex items-center gap-1"
                          style={{
                            backgroundColor:
                              config.status === 'Completed' ? '#DCFCE7'
                              : config.status === 'Running' ? '#FEF3C7'
                              : config.status === 'Failed' ? '#FEE2E2'
                              : '#F3F4F6',
                            color:
                              config.status === 'Completed' ? '#166534'
                              : config.status === 'Running' ? '#92400E'
                              : config.status === 'Failed' ? '#991B1B'
                              : '#6B7280',
                          }}
                        >
                          {config.status === 'Running' && <Loader size={12} className="animate-spin" />}
                          {config.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => toggleExpandConfig(config.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Files"
                          >
                            <FileText size={16} style={{ color: '#6B7280' }} />
                          </button>
                          {config.status !== 'Running' && (
                            <button
                              onClick={() => runUniverseConfiguration(config.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Run"
                            >
                              <Play size={16} style={{ color: '#0094B3' }} />
                            </button>
                          )}
                          <button
                            onClick={() => navigate('/parameters/configure-universe/create')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} style={{ color: '#6B7280' }} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete configuration "${config.name}"?`)) {
                                deleteUniverseConfiguration(config.id);
                              }
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} style={{ color: '#6B7280' }} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expandedConfigId === config.id && (
                      <tr key={`${config.id}-files`}>
                        <td colSpan={7} className="px-6 py-4" style={{ backgroundColor: '#F9FAFB' }}>
                          <div className="text-sm mb-3" style={{ color: '#6B7280' }}>
                            Generated Files ({config.generatedFiles.length})
                          </div>
                          {config.generatedFiles.length === 0 ? (
                            <div className="text-center py-6" style={{ color: '#6B7280' }}>
                              {config.status === 'Running' ? 'Generating files...' : 'No files generated yet'}
                            </div>
                          ) : (
                            <table className="w-full bg-white rounded-lg" style={{ border: '1px solid #E5E7EB' }}>
                              <thead>
                                <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #E5E7EB' }}>
                                  <th className="px-4 py-2 text-left text-xs" style={{ color: '#6B7280' }}>File Name</th>
                                  <th className="px-4 py-2 text-left text-xs" style={{ color: '#6B7280' }}>Generated At</th>
                                  <th className="px-4 py-2 text-left text-xs" style={{ color: '#6B7280' }}>File Size</th>
                                  <th className="px-4 py-2 text-left text-xs" style={{ color: '#6B7280' }}>Status</th>
                                  <th className="px-4 py-2 text-center text-xs" style={{ color: '#6B7280' }}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {config.generatedFiles.map((file, fileIndex) => (
                                  <tr
                                    key={file.id}
                                    style={{ borderBottom: fileIndex < config.generatedFiles.length - 1 ? '1px solid #E5E7EB' : 'none' }}
                                  >
                                    <td className="px-4 py-3 text-sm" style={{ color: '#0B236B' }}>{file.fileName}</td>
                                    <td className="px-4 py-3 text-sm" style={{ color: '#0B236B' }}>{file.generatedAt}</td>
                                    <td className="px-4 py-3 text-sm" style={{ color: '#6B7280' }}>{file.fileSize}</td>
                                    <td className="px-4 py-3">
                                      <span
                                        className="px-2 py-1 rounded text-xs"
                                        style={{
                                          backgroundColor:
                                            file.status === 'Completed' ? '#DCFCE7'
                                            : file.status === 'Processing' ? '#FEF3C7'
                                            : '#FEE2E2',
                                          color:
                                            file.status === 'Completed' ? '#166534'
                                            : file.status === 'Processing' ? '#92400E'
                                            : '#991B1B',
                                        }}
                                      >
                                        {file.status}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleDownload(file.fileName)}
                                        disabled={file.status !== 'Completed'}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ backgroundColor: '#0094B3', color: '#ffffff', fontSize: '12px' }}
                                      >
                                        <Download size={12} />
                                        Download
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

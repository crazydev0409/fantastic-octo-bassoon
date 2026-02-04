import { X, Trash2, FileText, Calendar } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryModalProps {
  history: HistoryItem[];
  onClose: () => void;
  onClear: () => void;
}

export default function HistoryModal({
  history,
  onClose,
  onClear,
}: HistoryModalProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-card rounded-lg border border-dark-border w-full max-w-4xl max-h-[80vh] flex flex-col p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">History</h2>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClear}
                className="btn-secondary flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-dark-hover rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <FileText className="w-16 h-16 mb-4 opacity-50" />
              <p>No history yet</p>
              <p className="text-sm mt-2">Your generated resumes will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-dark-hover rounded-lg hover:bg-dark-border transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-white">
                          {item.companyName}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 line-clamp-3 mt-2 pl-8">
                    {item.resume.substring(0, 200)}...
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

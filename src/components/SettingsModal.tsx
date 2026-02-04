import { X, Save } from 'lucide-react';
import { useState } from 'react';
import { APISettings } from '../types';

interface SettingsModalProps {
  settings: APISettings;
  onSave: (settings: APISettings) => void;
  onClose: () => void;
}

export default function SettingsModal({
  settings,
  onSave,
  onClose,
}: SettingsModalProps) {
  const [formData, setFormData] = useState(settings);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-card rounded-lg border border-dark-border w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">API Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-dark-hover rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              API Key
            </label>
            <input
              type="password"
              className="input-field"
              value={formData.apiKey}
              onChange={(e) =>
                setFormData({ ...formData, apiKey: e.target.value })
              }
              placeholder="sk-..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              API URL
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.apiUrl}
              onChange={(e) =>
                setFormData({ ...formData, apiUrl: e.target.value })
              }
              placeholder="https://api.deepseek.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Model
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              placeholder="deepseek-chat"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

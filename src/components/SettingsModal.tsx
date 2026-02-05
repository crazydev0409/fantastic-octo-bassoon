import { X, Save, Palette } from 'lucide-react';
import { useState } from 'react';
import { APISettings, PDFSettings } from '../types';

interface SettingsModalProps {
  apiSettings: APISettings;
  pdfSettings: PDFSettings;
  onSave: (apiSettings: APISettings, pdfSettings: PDFSettings) => void;
  onClose: () => void;
}

export default function SettingsModal({
  apiSettings,
  pdfSettings,
  onSave,
  onClose,
}: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'api' | 'pdf'>('api');
  const [apiFormData, setApiFormData] = useState(apiSettings);
  const [pdfFormData, setPdfFormData] = useState(pdfSettings);

  const handleSave = () => {
    onSave(apiFormData, pdfFormData);
    onClose();
  };

  const predefinedColors = [
    { name: 'Professional Brown', value: '#654321' },
    { name: 'Navy Blue', value: '#1e3a8a' },
    { name: 'Forest Green', value: '#166534' },
    { name: 'Deep Purple', value: '#6b21a8' },
    { name: 'Slate Gray', value: '#475569' },
    { name: 'Burgundy', value: '#881337' },
    { name: 'Teal', value: '#0f766e' },
    { name: 'Coral', value: '#dc2626' },
  ];

  const themes = [
    { value: 'professional', label: 'Professional', description: 'Right-aligned header, underlined sections' },
    { value: 'modern', label: 'Modern', description: 'Centered header, clean section headers' },
    { value: 'minimal', label: 'Minimal', description: 'Left-aligned, minimal decoration' },
    { value: 'creative', label: 'Creative', description: 'Bold colors, thick lines, standout style' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card rounded-lg border border-dark-border w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-dark-hover rounded transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dark-border">
          <button
            onClick={() => setActiveTab('api')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'api'
                ? 'text-blue-500 border-b-2 border-blue-500 bg-dark-hover/50'
                : 'text-gray-400 hover:text-gray-300 hover:bg-dark-hover/30'
            }`}
          >
            API Settings
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'pdf'
                ? 'text-blue-500 border-b-2 border-blue-500 bg-dark-hover/50'
                : 'text-gray-400 hover:text-gray-300 hover:bg-dark-hover/30'
            }`}
          >
            <Palette className="w-4 h-4" />
            PDF Customization
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'api' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  className="input-field"
                  value={apiFormData.apiKey}
                  onChange={(e) =>
                    setApiFormData({ ...apiFormData, apiKey: e.target.value })
                  }
                  placeholder="sk-..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Your API key is stored locally and never sent anywhere except your configured API endpoint
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  API URL
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={apiFormData.apiUrl}
                  onChange={(e) =>
                    setApiFormData({ ...apiFormData, apiUrl: e.target.value })
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
                  value={apiFormData.model}
                  onChange={(e) =>
                    setApiFormData({ ...apiFormData, model: e.target.value })
                  }
                  placeholder="deepseek-chat"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Primary Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Primary Color
                </label>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {predefinedColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() =>
                        setPdfFormData({ ...pdfFormData, primaryColor: color.value })
                      }
                      className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        pdfFormData.primaryColor === color.value
                          ? 'border-blue-500 ring-2 ring-blue-500/50'
                          : 'border-dark-border hover:border-gray-500'
                      }`}
                      title={color.name}
                    >
                      <div
                        className="w-full h-8 rounded"
                        style={{ backgroundColor: color.value }}
                      />
                      <div className="mt-2 text-xs text-gray-400 text-center truncate">
                        {color.name}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-12 h-10 rounded cursor-pointer bg-dark-bg border border-dark-border"
                    value={pdfFormData.primaryColor}
                    onChange={(e) =>
                      setPdfFormData({ ...pdfFormData, primaryColor: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="input-field flex-1"
                    value={pdfFormData.primaryColor}
                    onChange={(e) =>
                      setPdfFormData({ ...pdfFormData, primaryColor: e.target.value })
                    }
                    placeholder="#654321"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Choose a color for section headers and accents in your PDF
                </p>
              </div>

              {/* Font Family */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Font Family
                </label>
                
                {/* Sans-Serif Fonts */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sans-Serif (Modern & Clean)</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'helvetica', label: 'Helvetica', style: 'font-sans' },
                      { value: 'arial', label: 'Arial', style: 'font-sans' },
                      { value: 'calibri', label: 'Calibri', style: 'font-sans' },
                      { value: 'roboto', label: 'Roboto', style: 'font-sans' },
                      { value: 'opensans', label: 'Open Sans', style: 'font-sans' },
                      { value: 'lato', label: 'Lato', style: 'font-sans' },
                    ].map((font) => (
                      <button
                        key={font.value}
                        onClick={() =>
                          setPdfFormData({ ...pdfFormData, fontFamily: font.value as any })
                        }
                        className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          pdfFormData.fontFamily === font.value
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-dark-border hover:border-gray-500'
                        }`}
                      >
                        <div className={`text-base ${font.style} text-white mb-1`}>Aa</div>
                        <div className="text-xs text-gray-400 truncate">{font.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Serif Fonts */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Serif (Traditional & Elegant)</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'times', label: 'Times New Roman', style: 'font-serif' },
                      { value: 'georgia', label: 'Georgia', style: 'font-serif' },
                      { value: 'garamond', label: 'Garamond', style: 'font-serif' },
                    ].map((font) => (
                      <button
                        key={font.value}
                        onClick={() =>
                          setPdfFormData({ ...pdfFormData, fontFamily: font.value as any })
                        }
                        className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          pdfFormData.fontFamily === font.value
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-dark-border hover:border-gray-500'
                        }`}
                      >
                        <div className={`text-base ${font.style} text-white mb-1`}>Aa</div>
                        <div className="text-xs text-gray-400 truncate">{font.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monospace Fonts */}
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Monospace (Technical)</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'courier', label: 'Courier', style: 'font-mono' },
                    ].map((font) => (
                      <button
                        key={font.value}
                        onClick={() =>
                          setPdfFormData({ ...pdfFormData, fontFamily: font.value as any })
                        }
                        className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          pdfFormData.fontFamily === font.value
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-dark-border hover:border-gray-500'
                        }`}
                      >
                        <div className={`text-base ${font.style} text-white mb-1`}>Aa</div>
                        <div className="text-xs text-gray-400 truncate">{font.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  💡 Popular choices: <strong className="text-gray-400">Calibri</strong> (modern corporate), 
                  <strong className="text-gray-400"> Georgia</strong> (elegant), 
                  <strong className="text-gray-400"> Arial</strong> (universally readable)
                </p>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  PDF Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() =>
                        setPdfFormData({ ...pdfFormData, theme: theme.value as any })
                      }
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 text-left ${
                        pdfFormData.theme === theme.value
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-dark-border hover:border-gray-500'
                      }`}
                    >
                      <div className="text-sm font-medium text-white mb-1">
                        {theme.label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {theme.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Font Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'small', label: 'Small', size: '9pt' },
                    { value: 'medium', label: 'Medium', size: '10pt' },
                    { value: 'large', label: 'Large', size: '11pt' },
                  ].map((size) => (
                    <button
                      key={size.value}
                      onClick={() =>
                        setPdfFormData({ ...pdfFormData, fontSize: size.value as any })
                      }
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        pdfFormData.fontSize === size.value
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-dark-border hover:border-gray-500'
                      }`}
                    >
                      <div className="text-sm text-white mb-1">{size.label}</div>
                      <div className="text-xs text-gray-400">{size.size}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Note */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-400">
                  <strong>Preview:</strong> Your customization will be applied when you download the PDF. 
                  The tailored resume preview on the right shows the content only.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-dark-border">
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

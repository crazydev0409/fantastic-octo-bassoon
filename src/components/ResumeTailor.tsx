import { Settings, Sparkles, Download, ChevronDown } from 'lucide-react';
import { Tab } from '../types';
import { useState } from 'react';

interface ResumeTailorProps {
  tab: Tab;
  onUpdateTab: (tabId: string, updates: Partial<Tab>) => void;
  onTailorResume: (tab: Tab) => void;
  onDownloadPDF: (tab: Tab) => void;
  onOpenSettings: () => void;
}

export default function ResumeTailor({
  tab,
  onUpdateTab,
  onTailorResume,
  onDownloadPDF,
  onOpenSettings,
}: ResumeTailorProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex-1 card p-6 flex flex-col overflow-y-auto min-h-0">
      <div className="flex-shrink-0 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">
            Base Resume (Markdown)
          </label>
          <span className="text-xs text-gray-500">
            ⌘ + Ctrl + Shift + E
          </span>
        </div>
        <textarea
          className="textarea-field h-64 font-mono text-sm resize-none"
          placeholder="Paste your base resume here in Markdown format..."
          value={tab.baseResume}
          onChange={(e) => onUpdateTab(tab.id, { baseResume: e.target.value })}
        />
      </div>

      <div className="flex-shrink-0 mb-6">
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Job Description
        </label>
        <textarea
          className="textarea-field h-64 font-mono text-sm resize-none"
          placeholder="Paste the job description here..."
          value={tab.jobDescription}
          onChange={(e) => onUpdateTab(tab.id, { jobDescription: e.target.value })}
        />
      </div>

      <div className="flex-shrink-0 flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-hover rounded transition-colors border border-dark-border"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">API Settings</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showSettings && (
            <div className="absolute bottom-full mb-2 left-0 bg-dark-card border border-dark-border rounded-lg shadow-xl p-2 w-48 z-10">
              <button
                onClick={() => {
                  onOpenSettings();
                  setShowSettings(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-dark-hover rounded"
              >
                Settings
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => onTailorResume(tab)}
          disabled={!tab.baseResume || !tab.jobDescription || tab.isGenerating}
          className="btn-primary flex items-center gap-2 flex-1"
        >
          <Sparkles className="w-4 h-4" />
          <span>Tailor My Resume</span>
          <span className="text-xs opacity-75">Ctrl</span>
        </button>

        {tab.tailoredResume && (
          <button
            onClick={() => onDownloadPDF(tab)}
            className="btn-secondary flex items-center gap-2"
            title="Download PDF (Ctrl+Shift+P)"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        )}
      </div>
    </div>
  );
}

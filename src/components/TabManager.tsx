import { X, Plus, Loader2 } from 'lucide-react';
import { Tab } from '../types';

interface TabManagerProps {
  tabs: Tab[];
  activeTabId: string;
  onTabClick: (tabId: string) => void;
  onNewTab: () => void;
  onCloseTab: (tabId: string) => void;
}

export default function TabManager({
  tabs,
  activeTabId,
  onTabClick,
  onNewTab,
  onCloseTab,
}: TabManagerProps) {
  const handleTabMouseDown = (e: React.MouseEvent, tabId: string) => {
    // Middle click (button 1) to close tab
    if (e.button === 1 && tabs.length > 1) {
      e.preventDefault();
      onCloseTab(tabId);
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${
            tab.id === activeTabId ? 'tab-active' : 'tab-inactive'
          } ${tab.isGenerating ? 'relative' : ''}`}
          onClick={() => onTabClick(tab.id)}
          onMouseDown={(e) => handleTabMouseDown(e, tab.id)}
        >
          <div className="flex items-center gap-2">
            {tab.isGenerating && (
              <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
            )}
            <span className="text-sm whitespace-nowrap">{tab.name}</span>
          </div>
          {tabs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
              className="ml-2 hover:bg-dark-border rounded p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
      
      <button
        onClick={onNewTab}
        className="p-2 text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-colors"
        title="New Tab (Ctrl+Shift+E)"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

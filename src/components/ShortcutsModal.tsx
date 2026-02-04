import { X, Keyboard } from 'lucide-react';
import { ShortcutItem } from '../types';

interface ShortcutsModalProps {
  onClose: () => void;
}

const shortcuts: ShortcutItem[] = [
  {
    keys: ['Ctrl', 'Shift', 'E'],
    action: 'New Tab',
    description: 'Create a new resume tab',
  },
  {
    keys: ['Ctrl', 'Shift', 'X'],
    action: 'Close Tab',
    description: 'Close the current tab',
  },
  {
    keys: ['Ctrl', 'Shift', 'P'],
    action: 'Download PDF',
    description: 'Download the tailored resume as PDF',
  },
  {
    keys: ['Ctrl', 'Enter'],
    action: 'Tailor Resume',
    description: 'Generate tailored resume',
  },
];

export default function ShortcutsModal({ onClose }: ShortcutsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-card rounded-lg border border-dark-border w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-white">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-dark-hover rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-dark-hover rounded-lg hover:bg-dark-border transition-colors"
            >
              <div>
                <div className="font-medium text-white mb-1">
                  {shortcut.action}
                </div>
                <div className="text-sm text-gray-400">
                  {shortcut.description}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <span key={keyIndex} className="flex items-center">
                    <kbd className="px-3 py-1.5 bg-dark-card border border-dark-border rounded text-sm font-mono text-gray-300">
                      {key}
                    </kbd>
                    {keyIndex < shortcut.keys.length - 1 && (
                      <span className="mx-1 text-gray-500">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button onClick={onClose} className="btn-primary">
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}

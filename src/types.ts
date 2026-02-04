export interface Tab {
  id: string;
  name: string;
  baseResume: string;
  jobDescription: string;
  tailoredResume: string;
  isGenerating: boolean;
}

export interface APISettings {
  apiKey: string;
  apiUrl: string;
  model: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  companyName: string;
  tabId: string;
  resume: string;
}

export interface ShortcutItem {
  keys: string[];
  action: string;
  description: string;
}

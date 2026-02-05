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

export interface PDFSettings {
  primaryColor: string;
  fontFamily: 'helvetica' | 'arial' | 'calibri' | 'times' | 'georgia' | 'garamond' | 'courier' | 'roboto' | 'opensans' | 'lato';
  theme: 'professional' | 'modern' | 'minimal' | 'creative';
  fontSize: 'small' | 'medium' | 'large';
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

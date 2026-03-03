
export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  sources?: { title: string; uri: string }[];
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  url: string;
  date: string;
  candidateId: string;
  sentiment: 'positivo' | 'neutro' | 'negativo';
  summary: string;
  factCheckStatus: 'verificado' | 'em-analise' | 'alerta';
}

export interface ElectionMetric {
  name: string;
  value: number;
  change: number;
  type: 'percentage' | 'currency' | 'number';
}

export interface Politician {
  id: string;
  name: string;
  party: string;
  role: string;
  spendings: number;
  assets: number;
  location: string;
  alignment: number; // 0 to 100 percentage alignment with government
  bio: string;
  education: string;
}

export interface FactCheck {
  id: string;
  claim: string;
  status: 'fato' | 'fake' | 'impreciso';
  explanation: string;
  source: string;
}

export interface PollingData {
  date: string;
  candidateA: number;
  candidateB: number;
  candidateC: number;
  undecided: number;
}

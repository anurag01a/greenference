import { Complexity } from '../data/mockResponses';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  receipt?: MessageReceipt;
}

export interface MessageReceipt {
  route: string;
  routeType: 'hydro' | 'wind' | 'solar' | 'geo' | 'mixed' | 'gas' | 'coal' | 'local';
  region: string;
  latency: number;
  carbonSaved?: number;
  carbonEmitted?: number;
  carbonUsed?: number;
  isGreen: boolean;
  isLocal?: boolean;
  complexity?: Complexity;
}

export interface RoutingStep {
  id: number;
  icon: 'location' | 'brain' | 'toggle' | 'grid' | 'server';
  text: string;
  subtext?: string;
  duration: number;
  status: 'pending' | 'active' | 'complete';
  highlight?: 'green' | 'red' | 'amber';
}

export interface ChatState {
  messages: Message[];
  isRouting: boolean;
  currentStep: number;
  greenMode: boolean;
  credits: number;
  isUnlocked: boolean;
  totalCarbonSaved: number;
  totalCarbonEmitted: number;
}

export type { Complexity };

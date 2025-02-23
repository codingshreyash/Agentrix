export interface Message {
  id: string;
  sender: 'User' | 'AI';
  text: string;
  timestamp: Date;
  userId?: string;
}

export interface AgentrixEvent {
  type: string;
  data: Record<string, any>;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  role: string;
}

export interface Intent {
  name: string;
  description: string;
  keywords: string[];
}
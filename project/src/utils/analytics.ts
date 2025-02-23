import type { AgentrixEvent } from '../types';

export function logAgentrixEvent(type: string, data: Record<string, any>): void {
  const event: AgentrixEvent = {
    type,
    data,
    timestamp: new Date(),
  };
  
  // This is a placeholder for actual analytics implementation
  console.log('Agentrix Event:', event);
}
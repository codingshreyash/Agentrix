import { Message } from '../types';
import { RECOGNIZED_INTENTS, MOCK_MESSAGES } from '../data/mockData';

export interface AnalyticsEvent {
  timestamp: Date;
  userMessage: string;
  recognizedIntent: string;
  userId?: string;
}

interface AnalyticsState {
  totalUserMessages: number;
  totalAIResponses: number;
  intents: Record<string, number>;
  events: AnalyticsEvent[];
  messagesByHour: Record<string, number>;
  userStats: Record<string, {
    messageCount: number;
    intents: Record<string, number>;
  }>;
}

class AnalyticsStore {
  private state: AnalyticsState = {
    totalUserMessages: 0,
    totalAIResponses: 0,
    intents: {},
    events: [],
    messagesByHour: {},
    userStats: {},
  };

  private listeners: Set<() => void> = new Set();
  private mockDataInterval: number | null = null;

  constructor() {
    // Initialize with mock data
    this.initializeMockData();
    // Start mock real-time updates
    this.startMockUpdates();
  }

  private initializeMockData() {
    MOCK_MESSAGES.forEach(message => {
      this.captureMessage(message);
    });
  }

  private startMockUpdates() {
    if (typeof window !== 'undefined') {
      this.mockDataInterval = window.setInterval(() => {
        const mockUsers = ['DevUser123', 'Traveler456', 'Designer789', 'PM101'];
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const mockMessages = [
          "Can you help me write a unit test?",
          "I need a design document template",
          "Book me a flight to New York",
          "I need a taxi in 30 minutes",
          "Can you recommend a hotel?",
        ];
        const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
        
        const mockUserMessage: Message = {
          id: Date.now().toString(),
          sender: 'User',
          text: randomMessage,
          timestamp: new Date(),
          userId: randomUser,
        };

        this.captureMessage(mockUserMessage);
        
        // Simulate AI response
        setTimeout(() => {
          const mockAIMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'AI',
            text: `Here's a response to your ${randomMessage.toLowerCase().includes('test') ? 'testing' : 
              randomMessage.toLowerCase().includes('design') ? 'design' : 
              randomMessage.toLowerCase().includes('flight') ? 'flight' : 
              'general'} request.`,
            timestamp: new Date(),
            userId: randomUser,
          };
          this.captureMessage(mockAIMessage);
        }, 1000);
      }, 15000); // Add new data every 15 seconds
    }
  }

  private detectIntent(message: string): string {
    const lowercaseMessage = message.toLowerCase();
    for (const intent of RECOGNIZED_INTENTS) {
      if (intent.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        return intent.name;
      }
    }
    return 'general_query';
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
      if (this.mockDataInterval) {
        clearInterval(this.mockDataInterval);
      }
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  getState(): AnalyticsState {
    return { ...this.state };
  }

  captureMessage(message: Message) {
    const hourKey = new Date(message.timestamp).toISOString().slice(0, 13);

    if (message.sender === 'User') {
      const recognizedIntent = this.detectIntent(message.text);
      
      // Update user stats
      if (message.userId) {
        if (!this.state.userStats[message.userId]) {
          this.state.userStats[message.userId] = {
            messageCount: 0,
            intents: {},
          };
        }
        this.state.userStats[message.userId].messageCount++;
        this.state.userStats[message.userId].intents[recognizedIntent] = 
          (this.state.userStats[message.userId].intents[recognizedIntent] || 0) + 1;
      }

      this.state = {
        ...this.state,
        totalUserMessages: this.state.totalUserMessages + 1,
        intents: {
          ...this.state.intents,
          [recognizedIntent]: (this.state.intents[recognizedIntent] || 0) + 1,
        },
        events: [
          {
            timestamp: message.timestamp,
            userMessage: message.text,
            recognizedIntent,
            userId: message.userId,
          },
          ...this.state.events,
        ].slice(0, 100), // Keep last 100 events
        messagesByHour: {
          ...this.state.messagesByHour,
          [hourKey]: (this.state.messagesByHour[hourKey] || 0) + 1,
        },
      };
    } else {
      this.state = {
        ...this.state,
        totalAIResponses: this.state.totalAIResponses + 1,
      };
    }

    this.notify();
  }
}

export const analyticsStore = new AnalyticsStore();
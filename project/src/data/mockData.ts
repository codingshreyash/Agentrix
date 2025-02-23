import { Message, User, Intent } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'DevUser123', name: 'Alex Developer', role: 'developer' },
  { id: 'Traveler456', name: 'Sam Traveler', role: 'traveler' },
  { id: 'Designer789', name: 'Pat Designer', role: 'designer' },
  { id: 'PM101', name: 'Jordan PM', role: 'product_manager' },
];

export const RECOGNIZED_INTENTS: Intent[] = [
  {
    name: 'generate_code',
    description: 'Generate code snippets or complete files',
    keywords: ['code', 'function', 'class', 'implement', 'generate'],
  },
  {
    name: 'create_design_doc',
    description: 'Create or modify design documents',
    keywords: ['design', 'document', 'architecture', 'spec', 'specification'],
  },
  {
    name: 'book_flight',
    description: 'Book or search for flights',
    keywords: ['flight', 'airplane', 'travel', 'book', 'airport'],
  },
  {
    name: 'book_taxi',
    description: 'Book a taxi or ride service',
    keywords: ['taxi', 'ride', 'uber', 'car', 'pickup'],
  },
  {
    name: 'hotel_booking',
    description: 'Book hotel accommodations',
    keywords: ['hotel', 'room', 'stay', 'accommodation', 'booking'],
  },
];

// Generate mock historical messages
const generateMockMessages = (): Message[] => {
  const messages: Message[] = [];
  const now = new Date();
  
  // Helper to generate a random message from a user
  const createUserMessage = (
    userId: string,
    minutesAgo: number,
    text: string
  ): Message => ({
    id: `${Date.now()}-${Math.random()}`,
    sender: 'User',
    text,
    timestamp: new Date(now.getTime() - minutesAgo * 60000),
    userId,
  });

  // Helper to generate an AI response
  const createAIResponse = (
    userMessage: Message,
    text: string
  ): Message => ({
    id: `${Date.now()}-${Math.random()}`,
    sender: 'AI',
    text,
    timestamp: new Date(userMessage.timestamp.getTime() + 2000),
    userId: userMessage.userId,
  });

  // DevUser123's journey
  const devMessages = [
    createUserMessage('DevUser123', 120, "Can you help me write a React component?"),
    createUserMessage('DevUser123', 100, "I need help with TypeScript interfaces"),
    createUserMessage('DevUser123', 80, "Could you create a design document for my new feature?"),
    createUserMessage('DevUser123', 60, "I need architecture recommendations for my app"),
  ];

  // Traveler456's journey
  const travelerMessages = [
    createUserMessage('Traveler456', 90, "I need to book a flight to San Francisco"),
    createUserMessage('Traveler456', 70, "Can you find me a taxi from the airport?"),
    createUserMessage('Traveler456', 50, "I need a hotel near downtown"),
    createUserMessage('Traveler456', 30, "Are there any good restaurants nearby?"),
  ];

  // Add messages and AI responses
  [...devMessages, ...travelerMessages].forEach(msg => {
    messages.push(msg);
    messages.push(
      createAIResponse(
        msg,
        `Here's a response to your request about ${msg.text.toLowerCase().includes('code') ? 'coding' : 
          msg.text.toLowerCase().includes('design') ? 'design' : 
          msg.text.toLowerCase().includes('flight') ? 'flights' : 
          msg.text.toLowerCase().includes('taxi') ? 'taxis' : 
          'your query'}`
      )
    );
  });

  return messages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const MOCK_MESSAGES = generateMockMessages();
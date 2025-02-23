import { Message, User, Intent } from '../types';
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react';

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

export const mockData = {
  kpis: [
    {
      title: 'Daily Active Users',
      value: '1.35M',
      change: '+12.5%',
      positive: true,
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Avg Session Duration',
      value: '4m 32s',
      change: '-8.3%',
      positive: false,
      icon: Clock,
      color: 'emerald'
    },
    {
      title: 'Revenue Impact',
      value: '$12,450',
      change: '+15.2%',
      positive: true,
      icon: DollarSign,
      color: 'orange'
    },
    {
      title: 'Human Escalation Rate',
      value: '4.8%',
      change: '-2.1%',
      positive: true,
      icon: Users,
      color: 'blue'
    }
  ],
  intentDistribution: [
    { intent: 'Book Flights', users: 850000, color: '#9333EA' },
    { intent: 'Schedule Waymo', users: 450000, color: '#F97316' },
    { intent: 'Call Uber', users: 480000, color: '#3B82F6' },
    { intent: 'Boom SuperSonic Flights', users: 115000, color: '#10B981' },
    { intent: 'Cruise Bookings', users: 30000, color: '#EF4444' },
    { intent: 'Rental Cars', users: 25000, color: '#6366F1' }
  ],
  sentimentData: [
    { time: '00:00', positive: 65, neutral: 25, negative: 10 },
    { time: '04:00', positive: 70, neutral: 20, negative: 10 },
    { time: '08:00', positive: 60, neutral: 30, negative: 10 },
    { time: '12:00', positive: 55, neutral: 30, negative: 15 },
    { time: '16:00', positive: 75, neutral: 15, negative: 10 },
    { time: '20:00', positive: 70, neutral: 20, negative: 10 }
  ],
  userBehavior: {
    retention: [
      { day: 1, users: 100 },
      { day: 7, users: 75 },
      { day: 14, users: 60 },
      { day: 30, users: 45 },
      { day: 60, users: 30 },
      { day: 90, users: 25 }
    ],
    sessionDuration: [
      { duration: '0-1m', users: 1200 },
      { duration: '1-3m', users: 2500 },
      { duration: '3-5m', users: 3100 },
      { duration: '5-10m', users: 2300 },
      { duration: '10m+', users: 1400 }
    ]
  },
  revenueData: {
    byIntent: [
      { intent: 'Book Flights', actual: 85000, potential: 95000 },
      { intent: 'Schedule Waymo', actual: 32000, potential: 58000 },
      { intent: 'Call Uber', actual: 42000, potential: 52000 },
      { intent: 'Boom SuperSonic Flights', actual: 12000, potential: 25000 }
    ],
    trending: [
      { month: 'Aug', revenue: 42000 },
      { month: 'Sep', revenue: 48000 },
      { month: 'Oct', revenue: 55000 },
      { month: 'Nov', revenue: 62000 },
      { month: 'Dec', revenue: 70000 },
      { month: 'Jan', revenue: 82000 },
      { month: 'Feb', revenue: 88000 }
    ]
  },
  satisfaction: {
    sentimentOverTime: [
      { date: '2024-08', positive: 75, neutral: 15, negative: 10 },
      { date: '2024-09', positive: 70, neutral: 20, negative: 10 },
      { date: '2024-10', positive: 65, neutral: 20, negative: 15 },
      { date: '2024-11', positive: 80, neutral: 15, negative: 5 },
      { date: '2024-12', positive: 85, neutral: 10, negative: 5 },
      { date: '2025-01', positive: 78, neutral: 12, negative: 10 },
      { date: '2025-02', positive: 82, neutral: 11, negative: 7 }
    ],
    frustrationPoints: [
      { issue: 'Flight Booking Complexity', count: 450, severity: 'high' },
      { issue: 'Waymo Availability', count: 380, severity: 'high' },
      { issue: 'Uber Surge Pricing', count: 320, severity: 'medium' },
      { issue: 'SuperSonic Schedule Changes', count: 280, severity: 'medium' },
      { issue: 'Payment Processing', count: 180, severity: 'low' }
    ],
    escalationsByIntent: [
      { intent: 'Book Flights', rate: 25, total: 1200 },
      { intent: 'Schedule Waymo', rate: 35, total: 800 },
      { intent: 'Call Uber', rate: 15, total: 2000 },
      { intent: 'Boom SuperSonic Flights', rate: 30, total: 600 },
      { intent: 'General Support', rate: 20, total: 400 }
    ]
  },
  intentDistributionOverTime: [
    { date: '08-01-24', 'Book Flights': 820000, 'Schedule Waymo': 125000, 'Call Uber': 440000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 385000, 'Rental Cars': 625000 },
    { date: '08-15-24', 'Book Flights': 805000, 'Schedule Waymo': 135000, 'Call Uber': 420000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 370000, 'Rental Cars': 610000 },
    { date: '09-01-24', 'Book Flights': 790000, 'Schedule Waymo': 142000, 'Call Uber': 450000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 355000, 'Rental Cars': 595000 },
    { date: '09-15-24', 'Book Flights': 810000, 'Schedule Waymo': 155000, 'Call Uber': 430000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 340000, 'Rental Cars': 585000 },
    { date: '10-01-24', 'Book Flights': 830000, 'Schedule Waymo': 168000, 'Call Uber': 460000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 325000, 'Rental Cars': 575000 },
    { date: '10-15-24', 'Book Flights': 815000, 'Schedule Waymo': 175000, 'Call Uber': 440000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 310000, 'Rental Cars': 565000 },
    { date: '11-01-24', 'Book Flights': 800000, 'Schedule Waymo': 185000, 'Call Uber': 470000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 295000, 'Rental Cars': 555000 },
    { date: '11-15-24', 'Book Flights': 825000, 'Schedule Waymo': 195000, 'Call Uber': 450000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 285000, 'Rental Cars': 550000 },
    { date: '12-01-24', 'Book Flights': 845000, 'Schedule Waymo': 215000, 'Call Uber': 480000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 275000, 'Rental Cars': 545000 },
    { date: '12-15-24', 'Book Flights': 830000, 'Schedule Waymo': 245000, 'Call Uber': 460000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 265000, 'Rental Cars': 540000 },
    { date: '01-01-25', 'Book Flights': 815000, 'Schedule Waymo': 285000, 'Call Uber': 490000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 260000, 'Rental Cars': 535000 },
    { date: '01-15-25', 'Book Flights': 840000, 'Schedule Waymo': 345000, 'Call Uber': 470000, 'Boom SuperSonic Flights': 20000, 'Cruise Bookings': 255000, 'Rental Cars': 530000 },
    { date: '02-01-25', 'Book Flights': 860000, 'Schedule Waymo': 425000, 'Call Uber': 500000, 'Boom SuperSonic Flights': 40000, 'Cruise Bookings': 250000, 'Rental Cars': 525000 },
    { date: '02-23-25', 'Book Flights': 850000, 'Schedule Waymo': 650000, 'Call Uber': 480000, 'Boom SuperSonic Flights': 40000, 'Cruise Bookings': 250000, 'Rental Cars': 525000 }
  ]
};

export const intentCategories = {
  'Book Flights': 'supported',
  'Call Uber': 'supported',
  'Cruise Bookings': 'supported',
  'Rental Cars': 'supported',
  'Schedule Waymo': 'unsupported',
  'Boom SuperSonic Flights': 'unsupported'
} as const;
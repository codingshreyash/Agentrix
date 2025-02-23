'use client';

import { useState, useCallback } from 'react';
import { WelcomeInterface } from '@/components/WelcomeInterface';
import { ChatInterface } from '@/components/ChatInterface';
import { TopBar } from '@/components/TopBar';

interface Message {
  text: string;
  isUser: boolean;
  isComplete?: boolean;
}

// Define an array of 5 bot responses
const botResponses = [
  "I can help you plan your trip! Would you like to search for flights or hotels?",
  "Certainly! Let's explore your travel options.",
  "How about checking out some hotels?",
  "Great! I'll search for the best flight deals.",
  "Would you like some car rental options?"
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [botIndex, setBotIndex] = useState(0);

  const handleSubmit = (value: string) => {
    // Add user's message and bot's incomplete message together
    setMessages(prev => {
      const newMessages = [
        ...prev,
        { text: value, isUser: true, isComplete: true },
        { text: botResponses[botIndex], isUser: false, isComplete: false }
      ];
      return newMessages;
    });
    setHasStartedChat(true);
    setBotIndex(prevIndex => (prevIndex + 1) % botResponses.length);

    // Simulate streaming: mark the bot message as complete after a delay
    setTimeout(() => {
      setMessages(prev => {
        const botMsgIndex = prev.length - 1; // last message added
        return prev.map((msg, i) =>
          i === botMsgIndex ? { ...msg, isComplete: true } : msg
        );
      });
    }, 1500);
  };

  const handleStreamComplete = useCallback((index: number) => {
    setMessages(messages =>
      messages.map((msg, i) => {
        if (i === index && !msg.isComplete) {
          return { ...msg, isComplete: true };
        }
        return msg;
      })
    );
  }, []);

  // New callback to navigate back to welcome screen
  const handleLogoClick = () => {
    setHasStartedChat(false);
    setMessages([]);
    setBotIndex(0);
  };

  const actionButtons = [
    { icon: '🛩', label: 'Book Flights', onClick: () => console.log('DeepSearch clicked') },
    { icon: '🏨', label: 'Book Hotels', onClick: () => console.log('Think clicked') },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {!hasStartedChat ? (
        <div className="p-8 flex items-center justify-center h-full">
          <WelcomeInterface
            userName="Perbhat Kumar"
            onSendMessage={handleSubmit}
            actionButtons={actionButtons}
          />
        </div>
      ) : (
        <>
          <TopBar onLogoClick={handleLogoClick} />
          <div className="flex-1 overflow-auto">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSubmit}
              onStreamComplete={handleStreamComplete}
            />
          </div>
        </>
      )}
    </div>
  );
}

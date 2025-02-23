'use client';

import { useState, useCallback } from 'react';
import { WelcomeInterface } from '@/components/WelcomeInterface';
import { ChatInterface } from '@/components/ChatInterface';

interface Message {
  text: string;
  isUser: boolean;
  isComplete?: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasStartedChat, setHasStartedChat] = useState(false);

  const handleSubmit = (value: string) => {
    setMessages(prev => [...prev, { text: value, isUser: true, isComplete: true }]);
    setHasStartedChat(true);
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I can help you plan your trip! Would you like to search for flights or hotels?", 
        isUser: false,
        isComplete: false
      }]);
    }, 1000);
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

  const actionButtons = [
    { icon: '🛩', label: 'Book Flights', onClick: () => console.log('DeepSearch clicked') },
    { icon: '🏨', label: 'Book Hotels', onClick: () => console.log('Think clicked') },
  ];

  return (
    <div className="min-h-screen">
      {!hasStartedChat ? (
        <div className="p-8 flex items-center justify-center min-h-screen">
          <WelcomeInterface
            userName="Perbhat Kumar"
            onSendMessage={handleSubmit}
            actionButtons={actionButtons}
          />
        </div>
      ) : (
        <ChatInterface
          messages={messages}
          onSendMessage={handleSubmit}
          onStreamComplete={handleStreamComplete}
        />
      )}
    </div>
  );
}

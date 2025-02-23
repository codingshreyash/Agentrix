import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Users } from 'lucide-react';
import type { Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { analyticsStore } from '../store/analytics';
import { MOCK_USERS } from '../data/mockData';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS[0].id);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'User',
      text: currentMessage,
      timestamp: new Date(),
      userId: selectedUser,
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Capture analytics
    analyticsStore.captureMessage(userMessage);

    try {
      // Simulated API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentMessage, userId: selectedUser }),
      });

      if (!response.ok) throw new Error('API call failed');

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'AI',
        text: data.message || 'I apologize, but I am currently unavailable.',
        timestamp: new Date(),
        userId: selectedUser,
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Capture AI response analytics
      analyticsStore.captureMessage(aiMessage);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'AI',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        userId: selectedUser,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-900">
      <div className="border-b border-gray-700 p-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-400" />
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {MOCK_USERS.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 p-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-700 p-4">
        <div className="flex gap-2">
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !currentMessage.trim()}
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'User';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-gray-700 text-gray-100 rounded-bl-none'
        }`}
      >
        <div className="text-xs text-gray-300 mb-1">{message.sender}</div>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
}
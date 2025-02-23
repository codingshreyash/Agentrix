import React from 'react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'User';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="bg-[#ffd700] w-8 h-8 rounded flex items-center justify-center mr-2 flex-shrink-0">
          <img 
            src="/virtual-agent-icon.png" 
            alt="Virtual Agent"
            className="w-5 h-5"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-[#1f1f2e] text-white'
            : 'bg-[#2d3139] text-white'
        }`}
      >
        <div className="text-sm">
          {message.text}
        </div>
        <div className="text-xs mt-1 text-gray-400">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
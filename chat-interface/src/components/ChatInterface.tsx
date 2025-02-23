import { useState, useCallback } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MessageActions } from './MessageActions';
import { TopBar } from './TopBar';

interface Message {
  text: string;
  isUser: boolean;
  isComplete?: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onStreamComplete: (index: number) => void;
}

export const ChatInterface = ({ messages, onSendMessage, onStreamComplete }: ChatInterfaceProps) => {
  const handleStreamingCompleteForIndex = useCallback((index: number) => {
    onStreamComplete(index);
  }, [onStreamComplete]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />

      {/* Messages area with scrolling */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="max-w-3xl mx-auto px-8 space-y-8">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index}
              message={message.text}
              isUser={message.isUser}
              isStreaming={!message.isUser && !message.isComplete}
              onStreamingComplete={() => handleStreamingCompleteForIndex(index)}
              actions={!message.isUser && message.isComplete ? (
                <MessageActions 
                  onRegenerate={() => console.log('regenerate')}
                  onCopy={() => console.log('copy')}
                  onShare={() => console.log('share')}
                  onLike={() => console.log('like')}
                  onDislike={() => console.log('dislike')}
                />
              ) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Input area fixed at bottom */}
      <div className="border-t border-gray-100 p-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSubmit={onSendMessage} />
        </div>
      </div>
    </div>
  );
};

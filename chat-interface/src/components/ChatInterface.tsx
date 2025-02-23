import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MessageActions } from './MessageActions';
import { TopBar } from './TopBar';

interface Message {
  text: string;
  isUser: boolean;
  isComplete?: boolean;
  showFlightsWidget?: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onStreamComplete: (index: number) => void;
}

export const ChatInterface = ({ messages, onSendMessage, onStreamComplete }: ChatInterfaceProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleStreamingCompleteForIndex = useCallback((index: number) => {
    onStreamComplete(index);
  }, [onStreamComplete]);

  return (
    <div className="flex flex-col h-full">
      {/* <TopBar /> */}

      {/* Messages area with scrolling */}
      <div ref={messagesContainerRef} className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto px-8 space-y-8">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index}
              message={message.text}
              isUser={message.isUser}
              isStreaming={!message.isUser && !message.isComplete}
              onStreamingComplete={() => handleStreamingCompleteForIndex(index)}
              showFlightsWidget={message.showFlightsWidget}
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
          <div ref={bottomRef} /> {/* dummy element to scroll into view */}
        </div>
      </div>

      {/* Input area fixed at bottom */}
      <div className="p-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSubmit={onSendMessage} />
        </div>
      </div>
    </div>
  );
};

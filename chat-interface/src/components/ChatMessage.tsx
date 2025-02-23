import { StreamingText } from './StreamingText';

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
  isStreaming?: boolean;
  onStreamingComplete?: () => void;
  actions?: React.ReactNode;
}

export const ChatMessage = ({ 
  message, 
  isUser = false, 
  isStreaming = false,
  onStreamingComplete,
  actions 
}: ChatMessageProps) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-2xl ${isUser ? 'bg-blue-50 rounded-2xl px-6 py-4' : ''}`}>
        <div className={`text-base ${isUser ? 'text-gray-800' : ''}`}>
          {isUser ? (
            message
          ) : (
            <StreamingText 
              text={message} 
              isStreaming={isStreaming}
              onStreamingComplete={onStreamingComplete}
            />
          )}
        </div>
        {actions && !isStreaming && (
          <div className="flex gap-2 mt-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

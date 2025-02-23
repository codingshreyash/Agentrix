import { useState, useEffect, useRef } from 'react';

interface StreamingTextProps {
  text: string;
  isStreaming?: boolean;
  onStreamingComplete?: () => void;
}

export const StreamingText = ({ text, isStreaming = true, onStreamingComplete }: StreamingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const hasCalledComplete = useRef(false);
  const onStreamingCompleteRef = useRef(onStreamingComplete);

  // Update the ref when onStreamingComplete changes.
  useEffect(() => {
    onStreamingCompleteRef.current = onStreamingComplete;
  }, [onStreamingComplete]);

  useEffect(() => {
    let cancelled = false;
    hasCalledComplete.current = false;
    setDisplayedText('');
    setIsComplete(false);
    const words = text.split(' ');
    
    if (!isStreaming) {
      setDisplayedText(text);
      setIsComplete(true);
      if (onStreamingCompleteRef.current && !hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onStreamingCompleteRef.current();
      }
      return;
    }

    let currentIndex = 0;
    async function streamWords() {
      while (currentIndex < words.length && !cancelled) {
        await new Promise(resolve => setTimeout(resolve, 50));
        if (cancelled) break;
        setDisplayedText(prev => prev + (prev ? ' ' : '') + words[currentIndex]);
        currentIndex++;
      }
      if (!cancelled) {
        setIsComplete(true);
        if (onStreamingCompleteRef.current && !hasCalledComplete.current) {
          hasCalledComplete.current = true;
          onStreamingCompleteRef.current();
        }
      }
    }
    streamWords();
    return () => {
      cancelled = true;
    };
  }, [text, isStreaming]);

  return <span className={isComplete ? 'final-text' : 'streaming-text'}>{displayedText}</span>;
};

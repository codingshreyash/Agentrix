import { useState, useEffect, useRef } from 'react';

interface StreamingTextProps {
  text: string;
  isStreaming?: boolean;
  onStreamingComplete?: () => void;
}

export const StreamingText = ({ text, isStreaming = true, onStreamingComplete }: StreamingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const hasCalledComplete = useRef(false);
  const onStreamingCompleteRef = useRef(onStreamingComplete);

  // Update the ref when onStreamingComplete changes.
  useEffect(() => {
    onStreamingCompleteRef.current = onStreamingComplete;
  }, [onStreamingComplete]);

  useEffect(() => {
    hasCalledComplete.current = false;
    setDisplayedText('');
    const words = text.split(' ');
    
    if (!isStreaming) {
      setDisplayedText(text);
      if (onStreamingCompleteRef.current && !hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onStreamingCompleteRef.current();
      }
      return;
    }

    let currentIndex = 0;
    async function streamWords() {
      while (currentIndex < words.length) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setDisplayedText(prev => prev + (prev ? ' ' : '') + words[currentIndex]);
        currentIndex++;
      }
      if (onStreamingCompleteRef.current && !hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onStreamingCompleteRef.current();
      }
    }
    streamWords();
  }, [text, isStreaming]);

  return <span>{displayedText}</span>;
};

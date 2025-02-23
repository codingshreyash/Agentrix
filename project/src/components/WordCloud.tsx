import React from 'react';
import { useEffect, useRef } from 'react';

interface Keyword {
  text: string;
  value: number;
  intent: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface WordCloudProps {
  keywords: Keyword[];
  onKeywordHover: (keyword: Keyword | null) => void;
}

export function WordCloud({ keywords, onKeywordHover }: WordCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = 300;

    // Simple layout algorithm for demo
    keywords.forEach((keyword, i) => {
      const size = Math.max(14, Math.min(36, 14 + keyword.value));
      const angle = (i % 2) * 90;
      const left = Math.random() * (width - 100);
      const top = Math.random() * (height - 50);

      const span = document.createElement('span');
      span.textContent = keyword.text;
      span.style.position = 'absolute';
      span.style.left = `${left}px`;
      span.style.top = `${top}px`;
      span.style.fontSize = `${size}px`;
      span.style.color = keyword.color;
      span.style.transform = `rotate(${angle}deg)`;
      span.style.transition = 'all 0.3s ease';
      span.style.cursor = 'pointer';

      span.addEventListener('mouseenter', () => {
        span.style.transform = `rotate(${angle}deg) scale(1.2)`;
        onKeywordHover(keyword);
      });

      span.addEventListener('mouseleave', () => {
        span.style.transform = `rotate(${angle}deg) scale(1)`;
        onKeywordHover(null);
      });

      container.appendChild(span);
    });

    return () => {
      container.innerHTML = '';
    };
  }, [keywords, onKeywordHover]);

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Trending Keywords</h3>
      <div
        ref={containerRef}
        className="relative h-[300px] overflow-hidden"
      />
    </div>
  );
}
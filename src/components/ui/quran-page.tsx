import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import IslamicFrame from './islamic-frame';

interface QuranPageProps {
  pageNumber: number;
  surahName: string;
  juzNumber: number;
  hizbNumber: number;
  content: string;
  className?: string;
  onPageClick?: () => void;
  isReadingMode?: boolean;
}

const QuranPage: React.FC<QuranPageProps> = ({
  pageNumber,
  surahName,
  juzNumber,
  hizbNumber,
  content,
  className,
  onPageClick,
  isReadingMode = false
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(24);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-adjust font size based on content length
  useEffect(() => {
    if (pageRef.current) {
      const contentLength = content.length;
      const containerHeight = pageRef.current.clientHeight;
      
      // Dynamic font sizing algorithm
      let newFontSize = 24;
      if (contentLength < 500) {
        newFontSize = Math.min(32, Math.max(20, containerHeight / 20));
      } else if (contentLength < 1000) {
        newFontSize = Math.min(28, Math.max(18, containerHeight / 25));
      } else if (contentLength < 1500) {
        newFontSize = Math.min(24, Math.max(16, containerHeight / 30));
      } else {
        newFontSize = Math.min(20, Math.max(14, containerHeight / 35));
      }
      
      setFontSize(newFontSize);
    }
  }, [content]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  
  const pageVariant = isReadingMode ? 'minimal' : 'royal';

  return (
    <div className={cn('relative group', className)}>
      <IslamicFrame 
        variant={pageVariant}
        withPattern={!isReadingMode}
        withGlow={isReadingMode}
        animated={!isReadingMode}
        className={cn(
          'cursor-pointer select-none min-h-[600px] max-w-4xl mx-auto',
          isVisible ? 'animate-fade-in' : 'opacity-0',
          isReadingMode ? 'shadow-reading reading-mode-paper' : ''
        )}
      >
        {/* Page Header */}
        <div className="text-center mb-8 relative">
          {/* Bismillah */}
          <div className="text-3xl md:text-4xl font-arabic-title arabic-calligraphy mb-6">
            ﷽
          </div>
          
          {/* Decorative Separator */}
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1 max-w-32" />
            <div className="mx-4 w-3 h-3 islamic-ornament" />
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1 max-w-32" />
          </div>
          
          {/* Page Info */}
          <div className="text-sm md:text-base text-muted-foreground space-y-1">
            <div className="font-arabic-title text-primary font-semibold">{surahName}</div>
            <div className="flex justify-center items-center gap-4 text-xs md:text-sm">
              <span>الصفحة {pageNumber}</span>
              <span>•</span>
              <span>الجزء {juzNumber}</span>
              <span>•</span>
              <span>الحزب {hizbNumber}</span>
            </div>
          </div>
        </div>

        {/* Quran Content */}
        <div 
          ref={pageRef}
          className={cn(
            'quran-text text-center arabic-content leading-loose',
            isReadingMode ? 'reading-mode-text' : 'text-foreground'
          )}
          style={{ fontSize: `${fontSize}px` }}
          onClick={onPageClick}
        >
          <div className="whitespace-pre-line inline-block">
            {content}
          </div>
        </div>

        {/* Page Footer */}
        <div className="text-center mt-8 pt-6 border-t border-border/30">
          <div className="text-lg font-arabic-title text-primary/80">
            صدق الله العظيم
          </div>
        </div>

        {/* Sparkle Effects for Interactive Pages */}
        {!isReadingMode && (
          <>
            <div className="absolute top-8 left-8 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse" />
            <div className="absolute top-16 right-12 w-1 h-1 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-bounce-gentle" />
            <div className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 group-hover:animate-pulse" />
          </>
        )}
      </IslamicFrame>
    </div>
  );
};

export default QuranPage;
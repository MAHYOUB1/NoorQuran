import React from 'react';
import { cn } from '@/lib/utils';

interface IslamicFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'ornate' | 'minimal' | 'royal';
  withPattern?: boolean;
  withGlow?: boolean;
  animated?: boolean;
}

const IslamicFrame: React.FC<IslamicFrameProps> = ({
  children,
  className,
  variant = 'default',
  withPattern = true,
  withGlow = false,
  animated = true
}) => {
  const frameVariants = {
    default: 'islamic-frame',
    ornate: 'islamic-frame border-4 geometric-border',
    minimal: 'bg-card/90 backdrop-blur-sm border border-border/50 rounded-2xl',
    royal: 'islamic-frame shadow-royal bg-gradient-to-br from-card via-background to-card'
  };

  const getFrameClasses = () => {
    const baseClasses = frameVariants[variant];
    const patternClasses = withPattern ? 'islamic-pattern' : '';
    const glowClasses = withGlow ? 'pulse-glow' : '';
    const animationClasses = animated ? 'transition-all duration-5000 hover:scale-[1.02]' : '';
    
    return cn(baseClasses, patternClasses, glowClasses, animationClasses, className);
  };

  return (
    <div className={getFrameClasses()}>
      {/* Floating Ornaments */}
      {variant === 'ornate' && (
        <>
          <div className="absolute -top-3 -left-3 w-6 h-6 islamic-ornament floating-element opacity-70" />
          <div className="absolute -top-3 -right-3 w-6 h-6 islamic-ornament floating-element opacity-70" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 islamic-ornament floating-element opacity-70" style={{ animationDelay: '4s' }} />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 islamic-ornament floating-element opacity-70" style={{ animationDelay: '6s' }} />
        </>
      )}
      
      {/* Corner Decorations */}
      {variant === 'royal' && (
        <>
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/60 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/60 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/60 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/60 rounded-br-lg" />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};

export default IslamicFrame;
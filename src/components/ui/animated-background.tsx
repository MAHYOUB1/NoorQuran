import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'mosque' | 'royal' | 'sunset';
  className?: string;
  withParticles?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = 'default',
  className,
  withParticles = true
}) => {
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'mosque':
        return 'bg-gradient-to-br from-background via-card to-secondary/10';
      case 'royal':
        return 'bg-gradient-to-br from-primary/5 via-background to-secondary/5';
      case 'sunset':
        return 'bg-gradient-to-br from-orange-50 via-background to-purple-50 dark:from-orange-950/20 dark:via-background dark:to-purple-950/20';
      default:
        return 'gradient-warm';
    }
  };

  return (
    <div className={cn('relative min-h-screen overflow-hidden', getBackgroundStyle(), className)}>
      {/* Floating Geometric Patterns */}
      {withParticles && (
        <>
          {/* Large decorative circles */}
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-primary/20 animate-rotate-slow" />
          <div className="absolute top-32 right-16 w-24 h-24 rounded-full border border-secondary/20 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
          <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full border border-primary/10 animate-rotate-slow" style={{ animationDuration: '40s' }} />
          
          {/* Islamic Star Patterns */}
          <div className="absolute top-1/4 left-1/4 opacity-30">
            <svg width="60" height="60" viewBox="0 0 60 60" className="animate-pulse">
              <path d="M30 0 L36 18 L54 12 L42 30 L54 48 L36 42 L30 60 L24 42 L6 48 L18 30 L6 12 L24 18 Z" fill="currentColor" className="text-primary/40" />
            </svg>
          </div>
          <div className="absolute top-3/4 right-1/4 opacity-20">
            <svg width="40" height="40" viewBox="0 0 60 60" className="animate-pulse" style={{ animationDelay: '2s' }}>
              <path d="M30 0 L36 18 L54 12 L42 30 L54 48 L36 42 L30 60 L24 42 L6 48 L18 30 L6 12 L24 18 Z" fill="currentColor" className="text-secondary/40" />
            </svg>
          </div>
          
          {/* Floating Dots */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-bounce-gentle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
          
          {/* Gradient Orbs */}
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-radial from-secondary/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
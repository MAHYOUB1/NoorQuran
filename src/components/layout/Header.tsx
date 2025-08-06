import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button-variants';
import { Moon, Sun, BookOpen, Headphones, Home , Code } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const Header: React.FC = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b shadow-soft sticky top-0 z-50 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <h1 className="text-3xl font-arabic-title gradient-primary bg-clip-text text-transparent">
              نــور
            </h1>
            <span className="text-sm text-muted-foreground">
              القرآن الكريم
            </span>
          </Link>
          
            <nav className="flex items-center space-x-1 space-x-reverse overflow-auto">
  
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
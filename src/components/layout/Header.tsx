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
    <header className="bg-card/80 backdrop-blur-sm border-b shadow-soft sticky top-0 z-50" dir='rtl'>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
        
          <nav className="flex items-center space-x-1 space-x-reverse overflow-auto">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/">
                <Home className="h-3 w-3 ml-0" />
                الرئيسية
              </Link>
            </Button>
            
            <Button
              variant={isActive('/reading') ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/reading">
                <BookOpen className="h-3 w-3 ml-1" />
                القراءة
              </Link>
            </Button>
            
            <Button
              variant={isActive('/listening') ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/listening">
                <Headphones className="h-3 w-3 ml-1" />
                الاستماع
              </Link>
              </Button>
            <Button
              variant={isActive('/about') ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/about">
                <Code className="h-3 w-3 ml-1" />
                عني
              </Link>
            </Button>
            
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
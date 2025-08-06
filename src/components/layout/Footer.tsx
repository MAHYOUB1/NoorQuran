import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button-variants';
import { Moon, Sun, BookOpen, Headphones, Home , Code } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const Footer: React.FC = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="bg-card/80 backdrop-blur-sm border-b shadow-soft sticky bottom-0 z-50">
      <div className="container mx-auto px-4 py-4">
        
          
            <nav className="flex justify-between space-x-1 space-x-reverse overflow-auto">
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
              variant={isActive('/about') ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/about">
                <Code className="h-3 w-3 ml-1" />
                عني
              </Link>
            </Button>
            
            
          </nav>
        
      </div>
    </footer>
  );
};

export default Footer;
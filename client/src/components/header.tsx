import { Button } from "@/components/ui/button";
import { Brain, Moon, Sun, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDarkMode = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <header className="glass-card sticky top-0 z-50 border-b border-border/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="gradient-bg p-2 rounded-xl">
              <Brain className="text-white h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">AI Tools & Agents Finder</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-muted-foreground hover:text-primary transition-colors font-medium text-lg"
              data-testid="link-features"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-muted-foreground hover:text-primary transition-colors font-medium text-lg"
              data-testid="link-how-it-works"
            >
              How it Works
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl"
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              className="btn-primary"
              data-testid="button-sign-in"
            >
              Sign In
            </Button>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl"
            data-testid="button-mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}

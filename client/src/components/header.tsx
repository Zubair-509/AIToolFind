import { Button } from "@/components/ui/button";
import { Brain, Menu } from "lucide-react";

export function Header() {

  return (
    <header className="glass-card sticky top-0 z-50 border-b border-border/20 backdrop-blur-xl">
      {/* Floating orbs for decoration */}
      <div className="floating-orb w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 top-4 left-[10%] opacity-60"></div>
      <div className="floating-orb w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 top-6 right-[15%] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="gradient-bg p-3 rounded-2xl neon-glow">
              <Brain className="text-white h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              AI Tools & Agents Finder
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium text-lg hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              data-testid="link-home"
            >
              Home
            </a>
            <a 
              href="#features" 
              className="text-gray-300 hover:text-purple-400 transition-all duration-300 font-medium text-lg hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              data-testid="link-features"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium text-lg hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              data-testid="link-how-it-works"
            >
              How it Works
            </a>
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

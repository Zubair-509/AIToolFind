import { Button } from "@/components/ui/button";
import { Brain, Menu } from "lucide-react";

export function Header() {

  return (
    <header className="glass-card sticky top-0 z-50 border-b border-border/10">
      {/* Floating orbs for decoration */}
      <div className="floating-orb w-4 h-4 gradient-bg top-4 left-[10%] opacity-40"></div>
      <div className="floating-orb w-3 h-3 gradient-bg top-6 right-[15%] opacity-30"></div>
      
      <div className="container">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4 fade-in">
            <div className="gradient-bg p-3 rounded-2xl neon-glow">
              <Brain className="text-white h-8 w-8" />
            </div>
            <h1 className="text-2xl font-light accent-gradient">
              AI ToolPilot
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8 fade-in stagger-2">
            <a 
              href="/" 
              className="text-muted-foreground hover:text-foreground transition-all duration-500 font-light text-lg hover:drop-shadow-[0_0_12px_hsla(120,100%,50%,0.3)]"
              data-testid="link-home"
            >
              Home
            </a>
            <a 
              href="#features" 
              className="text-muted-foreground hover:text-foreground transition-all duration-500 font-light text-lg hover:drop-shadow-[0_0_12px_hsla(280,100%,70%,0.3)]"
              data-testid="link-features"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-muted-foreground hover:text-foreground transition-all duration-500 font-light text-lg hover:drop-shadow-[0_0_12px_hsla(180,100%,50%,0.3)]"
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
            className="md:hidden rounded-xl glass-effect border-0 fade-in stagger-2"
            data-testid="button-mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}

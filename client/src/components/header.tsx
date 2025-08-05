import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Brain className="text-primary text-2xl mr-3" />
            <h1 className="text-xl font-bold text-gray-900">AI Tools & Agents Finder</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              data-testid="link-features"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              data-testid="link-how-it-works"
            >
              How it Works
            </a>
            <Button 
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              data-testid="button-sign-in"
            >
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

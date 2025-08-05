import { Brain, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="glass-card border-t border-border/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="gradient-bg p-2 rounded-xl">
              <Brain className="text-white h-6 w-6" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI Tools & Agents Finder
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>Powered by AI</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 AI Tools Finder. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="gradient-bg p-2 rounded-xl">
                <Brain className="text-white h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">AI Tools & Agents Finder</h3>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Discover the perfect AI tools and agents for your business with personalized 
              recommendations powered by advanced AI analysis.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">Powered by AI Intelligence</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground text-lg mb-6">Product</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium" data-testid="link-features-footer">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium" data-testid="link-how-it-works-footer">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium" data-testid="link-pricing">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium" data-testid="link-about">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium" data-testid="link-contact">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium" data-testid="link-privacy">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground font-medium">&copy; 2024 AI Tools & Agents Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


import { Brain, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { FloatingElement } from "@/components/animations/FloatingElement";

export function Footer() {
  return (
    <footer className="glass-card border-t border-border/10 mt-20">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <AnimatedSection className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <FloatingElement duration={5} amplitude={2}>
                <div className="gradient-bg p-2 rounded-xl neon-glow">
                  <Brain className="text-white h-6 w-6" />
                </div>
              </FloatingElement>
              <h3 className="text-2xl font-light accent-gradient">AI ToolPilot</h3>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-light">
              Discover the perfect AI tools and agents for your business with personalized 
              recommendations powered by advanced AI analysis.
            </p>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 gradient-bg rounded p-1 text-white" />
              <span className="font-light gradient-text">Powered by AI Intelligence</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h4 className="font-light text-foreground text-lg mb-6 gradient-text">Product</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <a 
                  href="#features" 
                  className="hover:text-foreground transition-all duration-500 font-light hover:drop-shadow-[0_0_8px_hsla(280,100%,70%,0.3)] cursor-pointer" 
                  data-testid="link-features-footer"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  className="hover:text-foreground transition-all duration-500 font-light hover:drop-shadow-[0_0_8px_hsla(180,100%,50%,0.3)] cursor-pointer" 
                  data-testid="link-how-it-works-footer"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-all duration-500 font-light hover:drop-shadow-[0_0_8px_hsla(320,100%,70%,0.3)]" data-testid="link-pricing">
                  Pricing
                </a>
              </li>
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <h4 className="font-light text-foreground text-lg mb-6 gradient-text">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-foreground transition-all duration-500 font-light hover:drop-shadow-[0_0_8px_hsla(240,100%,70%,0.3)]" data-testid="link-about">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-foreground transition-all duration-500 font-light hover:drop-shadow-[0_0_8px_hsla(120,100%,50%,0.3)]" data-testid="link-contact">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-foreground transition-all duration-500 font-light hover:drop-shadow-[0_0_8px_hsla(60,100%,50%,0.3)]" data-testid="link-privacy">
                  Privacy
                </a>
              </li>
            </ul>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={0.6} className="border-t border-border/20 mt-12 pt-8 text-center">
          <p className="text-muted-foreground font-light mono">&copy; 2024 AI ToolPilot. All rights reserved.</p>
        </AnimatedSection>
      </div>
    </footer>
  );
}

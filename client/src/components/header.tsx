import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Menu } from "lucide-react";
import { Link } from "wouter";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedButton } from "@/components/animations/AnimatedButton";
import { FloatingElement } from "@/components/animations/FloatingElement";

export function Header() {

  return (
    <header className="glass-card sticky top-0 z-50 border-b border-border/10">
      {/* Floating orbs for decoration */}
      <div className="floating-orb w-4 h-4 gradient-bg top-4 left-[10%] opacity-40"></div>
      <div className="floating-orb w-3 h-3 gradient-bg top-6 right-[15%] opacity-30"></div>

      <div className="container">
        <div className="flex justify-between items-center h-20">
          <AnimatedSection direction="left" className="flex items-center gap-4">
            <FloatingElement duration={4} amplitude={3}>
              <div className="gradient-bg p-3 rounded-2xl neon-glow">
                <Brain className="text-white h-8 w-8" />
              </div>
            </FloatingElement>
            <h1 className="text-2xl font-light accent-gradient">
              AI ToolPilot
            </h1>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-muted-foreground hover:text-foreground transition-all duration-500 font-light text-lg hover:drop-shadow-[0_0_12px_hsla(120,100%,50%,0.3)]"
              data-testid="link-home"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-all duration-500 font-light text-lg hover:drop-shadow-[0_0_12px_hsla(280,100%,70%,0.3)] cursor-pointer"
              data-testid="link-features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-all duration-500 font-light text-lg hover:drop-shadow-[0_0_12px_hsla(180,100%,50%,0.3)] cursor-pointer"
              data-testid="link-how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              How it Works
            </a>
            <Link href="/input">
              <AnimatedButton
                className="btn-primary"
                data-testid="button-get-started"
              >
                Get Started
              </AnimatedButton>
            </Link>
            </nav>
          </AnimatedSection>
          <AnimatedButton
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl glass-effect border-0"
            data-testid="button-mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
}
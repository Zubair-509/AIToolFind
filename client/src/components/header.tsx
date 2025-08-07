import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Menu } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth";
import { Menu, X, User, LogOut } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

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
            {isLoading ? (
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card p-2">
                  <DropdownMenuItem disabled className="font-bold text-lg capitalize text-foreground">
                    {user.name}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="flex gap-2 text-red-500 focus:text-red-400 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/signin">
                <Button
                  className="btn-primary"
                  data-testid="button-sign-in"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl glass-effect border-0 fade-in stagger-2"
            data-testid="button-mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden p-4 border-t border-border/10 bg-background/80 backdrop-blur-lg">
          <nav className="flex flex-col space-y-4 fade-in stagger-2">
            <a
              href="/"
              className="text-muted-foreground hover:text-foreground transition-all duration-500 font-light text-lg hover:drop-shadow-[0_0_12px_hsla(120,100%,50%,0.3)]"
              data-testid="link-home-mobile"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-all duration-500 font-light text-lg hover:drop-shadow-[0_0_12px_hsla(280,100%,70%,0.3)] cursor-pointer"
              data-testid="link-features-mobile"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-all duration-500 font-light text-lg hover:drop-shadow-[0_0_12px_hsla(180,100%,50%,0.3)] cursor-pointer"
              data-testid="link-how-it-works-mobile"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              How it Works
            </a>
            {isLoading ? (
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
            ) : user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-0 py-0 h-auto text-left">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground hover:text-foreground font-light text-lg capitalize">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="glass-card p-2">
                    <DropdownMenuItem disabled className="font-bold text-lg capitalize text-foreground">
                      {user.name}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()} className="flex gap-2 text-red-500 focus:text-red-400 cursor-pointer">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/signin">
                <Button
                  className="btn-primary"
                  data-testid="button-sign-in-mobile"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
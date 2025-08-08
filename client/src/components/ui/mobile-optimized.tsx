
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useIsMobile, useIsSmallMobile } from "@/hooks/use-mobile";

interface MobileOptimizedProps {
  children: ReactNode;
  className?: string;
}

export function TouchOptimized({ children, className }: MobileOptimizedProps) {
  const isMobile = useIsMobile();
  
  if (!isMobile) return <>{children}</>;
  
  return (
    <div className={cn(
      "touch-manipulation", // Optimizes touch events
      "select-none", // Prevents text selection during touch
      className
    )}>
      {children}
    </div>
  );
}

export function MobileContainer({ children, className }: MobileOptimizedProps) {
  const isSmallMobile = useIsSmallMobile();
  
  return (
    <div className={cn(
      "w-full",
      isSmallMobile ? "px-4" : "px-6",
      "mx-auto",
      className
    )}>
      {children}
    </div>
  );
}

export function ResponsiveGrid({ 
  children, 
  className,
  cols = { sm: 1, md: 2, lg: 3 }
}: MobileOptimizedProps & { 
  cols?: { sm: number; md: number; lg: number } 
}) {
  return (
    <div className={cn(
      "grid gap-4 sm:gap-6",
      `grid-cols-${cols.sm} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg}`,
      className
    )}>
      {children}
    </div>
  );
}

interface MobileButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

export function MobileOptimizedButton({ 
  children, 
  onClick, 
  variant = 'primary',
  className,
  disabled = false
}: MobileButtonProps) {
  const isMobile = useIsMobile();
  
  const baseClasses = cn(
    // Base button styles
    "inline-flex items-center justify-center",
    "font-medium rounded-xl",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    
    // Mobile optimizations
    isMobile && [
      "min-h-[48px]", // Touch target size
      "px-6 py-3",
      "text-base",
      "active:scale-95", // Touch feedback
      "touch-manipulation" // Better touch handling
    ],
    
    // Desktop styles
    !isMobile && [
      "px-8 py-4",
      "text-sm"
    ],
    
    // Variant styles
    variant === 'primary' && [
      "bg-gradient-to-r from-purple-600 to-blue-600",
      "text-white",
      "hover:from-purple-700 hover:to-blue-700",
      "focus:ring-purple-500"
    ],
    
    variant === 'secondary' && [
      "bg-white/10 backdrop-blur-sm",
      "text-white border border-white/20",
      "hover:bg-white/20",
      "focus:ring-white/50"
    ],
    
    className
  );
  
  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      // Prevent double-tap zoom on mobile
      onTouchStart={() => {}}
    >
      {children}
    </button>
  );
}

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useIsMobile, useIsSmallMobile } from "@/hooks/use-mobile";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export function AnimatedCard({ 
  children, 
  className = "", 
  delay = 0,
  index = 0 
}: AnimatedCardProps) {
  const isMobile = useIsMobile();
  const isSmallMobile = useIsSmallMobile();

  // Reduce motion on mobile for better performance
  const shouldReduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Mobile optimized animations
  const mobileInitial = { y: 20, opacity: 0 };
  const desktopInitial = { y: 60, opacity: 0, scale: 0.95 };
  
  const mobileAnimate = { y: 0, opacity: 1 };
  const desktopAnimate = { y: 0, opacity: 1, scale: 1 };
  
  // Simplified hover effects for mobile
  const getHoverAnimation = () => {
    if (shouldReduceMotion) return {};
    
    if (isMobile || isSmallMobile) {
      return {
        scale: 1.01,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        }
      };
    }
    
    return {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25), 0 0 40px rgba(139, 92, 246, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    };
  };

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? {} : (isMobile ? mobileInitial : desktopInitial)}
      whileInView={shouldReduceMotion ? {} : (isMobile ? mobileAnimate : desktopAnimate)}
      viewport={{ 
        once: true, 
        margin: isMobile ? "-50px" : "-100px" 
      }}
      transition={shouldReduceMotion ? {} : {
        duration: isMobile ? 0.3 : 0.5,
        delay: delay + (index * (isMobile ? 0.05 : 0.1)),
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={getHoverAnimation()}
      // Add touch optimization for mobile
      whileTap={isMobile ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  );
}
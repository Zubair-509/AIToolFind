import { motion } from "framer-motion";
import { ReactNode } from "react";

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
  return (
    <motion.div
      className={className}
      initial={{ y: 60, opacity: 0, scale: 0.95 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: delay + (index * 0.1),
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25), 0 0 40px rgba(139, 92, 246, 0.1)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  );
}
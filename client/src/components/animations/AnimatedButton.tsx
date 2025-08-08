import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}

export function AnimatedButton({ 
  children, 
  className = "", 
  onClick,
  disabled = false,
  type = "button",
  ...props 
}: AnimatedButtonProps) {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(139, 92, 246, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
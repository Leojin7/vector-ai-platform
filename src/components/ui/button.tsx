
"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, backgroundColor: "#1d4ed8" }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-400",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

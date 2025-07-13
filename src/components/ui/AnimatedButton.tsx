"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedButton({ children, className, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "#6C47FF" }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

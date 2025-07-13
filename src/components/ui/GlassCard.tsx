"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        boxShadow: "0 20px 40px 0 rgba(80,80,255,0.18)",
        backdropFilter: "blur(16px)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={cn(
        "relative rounded-2xl bg-white/10 dark:bg-[#23244d]/70 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden transition-all",
        className
      )}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-400/10 to-indigo-500/20 animate-gradient-move pointer-events-none" />
      {/* Card content */}
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
}

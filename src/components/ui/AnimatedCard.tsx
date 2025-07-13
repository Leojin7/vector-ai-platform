import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedCard({ children, className, ...props }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={cn(
        "rounded-xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg transition-all",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

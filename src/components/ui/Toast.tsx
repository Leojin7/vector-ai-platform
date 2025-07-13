'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Brain, Sparkles } from 'lucide-react';
import type { Toast as ToastType } from './useToast';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
  index: number;
}

const toastStyles = {
  success: {
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
    borderGradient: 'from-emerald-500/30 to-green-500/20',
    bgGradient: 'from-emerald-500/10 via-emerald-400/5 to-green-500/10',
    progressColor: 'bg-gradient-to-r from-emerald-500 to-green-500',
    glowColor: 'shadow-emerald-500/20',
  },
  error: {
    icon: AlertCircle,
    iconColor: 'text-red-500',
    borderGradient: 'from-red-500/30 to-pink-500/20',
    bgGradient: 'from-red-500/10 via-red-400/5 to-pink-500/10',
    progressColor: 'bg-gradient-to-r from-red-500 to-pink-500',
    glowColor: 'shadow-red-500/20',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    borderGradient: 'from-amber-500/30 to-yellow-500/20',
    bgGradient: 'from-amber-500/10 via-amber-400/5 to-yellow-500/10',
    progressColor: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    glowColor: 'shadow-amber-500/20',
  },
  info: {
    icon: Info,
    iconColor: 'text-blue-500',
    borderGradient: 'from-blue-500/30 to-cyan-500/20',
    bgGradient: 'from-blue-500/10 via-blue-400/5 to-cyan-500/10',
    progressColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    glowColor: 'shadow-blue-500/20',
  },
  ai: {
    icon: Brain,
    iconColor: 'text-purple-500',
    borderGradient: 'from-purple-500/30 to-indigo-500/20',
    bgGradient: 'from-purple-500/10 via-purple-400/5 to-indigo-500/10',
    progressColor: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    glowColor: 'shadow-purple-500/20',
  },
};

export default function Toast({ toast, onDismiss, index }: ToastProps) {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);
  const config = toastStyles[toast.type];
  const IconComponent = config.icon;
  const duration = toast.duration ?? 5000;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!duration || duration <= 0 || !toast.dismissible) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;
      setProgress(newProgress);

      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
  }, [duration, toast.dismissible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(toast.id), 200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          initial={{
            opacity: 0,
            x: 400,
            scale: 0.8,
            rotateY: 45,
            z: -100
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            rotateY: 0,
            z: 0
          }}
          exit={{
            opacity: 0,
            x: 400,
            scale: 0.8,
            rotateY: -45,
            z: -100,
            transition: { duration: 0.2 }
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: index * 0.1
          }}
          whileHover={{
            scale: 1.02,
            rotateY: 3,
            z: 10,
            transition: { duration: 0.2 }
          }}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
          className={`
            relative w-full max-w-md cursor-pointer overflow-hidden
            backdrop-blur-xl bg-gradient-to-br ${config.bgGradient}
            border border-white/20 dark:border-gray-700/30
            rounded-2xl shadow-2xl ${config.glowColor}
            group transition-all duration-300
          `}
          onClick={() => toast.action?.onClick()}
        >
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/10 dark:to-gray-900/5" />

          {/* Animated border gradient */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${config.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

          {/* Main content */}
          <div className="relative p-5 pr-14">
            <div className="flex items-start gap-4">
              {/* Icon with micro-animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2 + index * 0.05,
                  type: "spring",
                  stiffness: 500
                }}
                className={`flex-shrink-0 p-2 rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm ${config.iconColor}`}
              >
                <IconComponent className="w-5 h-5" />
                {toast.aiGenerated && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-3 h-3 text-purple-400" />
                  </motion.div>
                )}
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <motion.h4
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate"
                  >
                    {toast.title}
                  </motion.h4>
                )}

                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  {toast.message}
                </motion.p>

                {/* Progress indicator for AI tasks */}
                {typeof toast.progress === 'number' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3"
                  >
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Processing...</span>
                      <span>{Math.round(toast.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${toast.progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`h-2 rounded-full ${config.progressColor}`}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Action button */}
                {toast.action && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.action?.onClick();
                    }}
                    className="mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors underline-offset-2 hover:underline"
                  >
                    {toast.action.label}
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Dismiss button */}
          {toast.dismissible && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors group/button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 text-gray-400 group-hover/button:text-gray-600 dark:group-hover/button:text-gray-300 transition-colors" />
            </motion.button>
          )}

          {/* Auto-dismiss progress bar */}
          {toast.dismissible && duration > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30 dark:bg-gray-700/30 overflow-hidden">
              <motion.div
                className={`h-1 ${config.progressColor}`}
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          )}

          {/* Ambient glow effect */}
          <div className={`absolute inset-0 rounded-2xl opacity-20 blur-xl ${config.bgGradient} -z-20`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

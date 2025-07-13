'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useToast } from './useToast';
import Toast from './Toast';
import { Trash2, Bell, BellOff } from 'lucide-react';

export default function Toaster() {
  const { toasts, toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Load user preference for sound
    const soundPref = localStorage.getItem('vector-toast-sound');
    if (soundPref !== null) {
      setSoundEnabled(JSON.parse(soundPref));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vector-toast-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Play notification sound (respecting user preference)
  useEffect(() => {
    if (toasts.length > 0 && soundEnabled) {
      const lastToast = toasts[toasts.length - 1];
      if (Date.now() - lastToast.createdAt.getTime() < 1000) {
        // Play subtle notification sound for new toasts
        if ('AudioContext' in window) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
          gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
        }
      }
    }
  }, [toasts.length, soundEnabled]);

  if (!mounted || typeof window === 'undefined') {
    return null;
  }

  const toasterElement = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-4 right-4 z-[9999] pointer-events-none"
      style={{
        maxHeight: 'calc(100vh - 2rem)',
        width: '420px',
        maxWidth: 'calc(100vw - 2rem)'
      }}
    >
      {/* Toast Container with Spatial Depth */}
      <div className="space-y-3 pointer-events-auto" style={{ perspective: '1000px' }}>
        <AnimatePresence mode="popLayout">
          {toasts
            .slice()
            .reverse()
            .map((toastItem, index) => (
              <Toast
                key={toastItem.id}
                toast={toastItem}
                onDismiss={toast.dismiss}
                index={index}
              />
            ))}
        </AnimatePresence>
      </div>

      {/* Toast Controls */}
      {toasts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="mt-4 flex justify-between items-center gap-3"
        >
          {/* Clear All Button */}
          {toasts.length > 1 && (
            <motion.button
              onClick={toast.dismissAll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 
                       hover:text-gray-900 dark:hover:text-white
                       backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 
                       border border-white/30 dark:border-gray-700/30
                       rounded-full shadow-lg hover:shadow-xl
                       transition-all duration-200"
            >
              <Trash2 className="w-3 h-3" />
              Clear All ({toasts.length})
            </motion.button>
          )}

          {/* Sound Toggle */}
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 dark:text-gray-400 
                     hover:text-gray-900 dark:hover:text-white
                     backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 
                     border border-white/30 dark:border-gray-700/30
                     rounded-full shadow-lg hover:shadow-xl
                     transition-all duration-200"
            title={soundEnabled ? 'Disable notification sounds' : 'Enable notification sounds'}
          >
            {soundEnabled ? (
              <Bell className="w-4 h-4" />
            ) : (
              <BellOff className="w-4 h-4" />
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Toast Counter for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {toasts.length > 0 && `${toasts.length} notification${toasts.length > 1 ? 's' : ''} visible`}
      </div>
    </motion.div>
  );

  return createPortal(toasterElement, document.body);
}

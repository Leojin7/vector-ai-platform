'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'ai';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  progress?: number;
  aiGenerated?: boolean;
  createdAt: Date;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  updateToast: (id: string, updates: Partial<Toast>) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toastData: Omit<Toast, 'id' | 'createdAt'>) => {
    const id = uuidv4();
    const newToast: Toast = {
      ...toastData,
      id,
      createdAt: new Date(),
      duration: toastData.duration ?? (toastData.type === 'error' ? 8000 : 5000),
      dismissible: toastData.dismissible ?? true,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss logic
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, newToast.duration);
    }

    // Haptic feedback for mobile
    if ('vibrate' in navigator && toastData.type === 'error') {
      navigator.vibrate([100, 50, 100]);
    }

    return id;
  }, []);

  const updateToast = useCallback((id: string, updates: Partial<Toast>) => {
    setToasts((prev) =>
      prev.map(toast =>
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, updateToast, dismiss, dismissAll }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, updateToast, dismiss, dismissAll } = context;

  // Enhanced toast methods with AI integration
  const toast = {
    success: (message: string, options?: Partial<Toast>) =>
      addToast({ type: 'success', message, ...options }),

    error: (message: string, options?: Partial<Toast>) =>
      addToast({ type: 'error', message, ...options }),

    warning: (message: string, options?: Partial<Toast>) =>
      addToast({ type: 'warning', message, ...options }),

    info: (message: string, options?: Partial<Toast>) =>
      addToast({ type: 'info', message, ...options }),

    ai: (message: string, options?: Partial<Toast>) =>
      addToast({
        type: 'ai',
        message,
        aiGenerated: true,
        duration: 6000,
        ...options
      }),

    // Workflow-specific notifications
    workflowComplete: (name: string) =>
      addToast({
        type: 'success',
        title: 'Workflow Complete',
        message: `"${name}" finished successfully`,
        action: { label: 'View Results', onClick: () => console.log('Navigate to results') }
      }),

    aiProgress: (message: string, progress: number) => {
      const id = addToast({
        type: 'ai',
        message,
        progress,
        duration: 0,
        dismissible: false
      });
      return { id, update: (newProgress: number) => updateToast(id, { progress: newProgress }) };
    },

    dismiss,
    dismissAll,
  };

  return { toast, toasts: context.toasts };
}

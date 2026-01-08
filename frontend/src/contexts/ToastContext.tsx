'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// Toast notification types
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// Toast Context Types
interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

// Provider Props
interface ToastProviderProps {
  children: ReactNode;
}

// Toast Provider Component
// Manages toast notification state and display
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Generate unique ID for toast
  const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Show a toast notification
  const showToast = useCallback((message: string, type: ToastType = 'info'): void => {
    const id = generateId();
    const newToast: Toast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after duration based on type
    const duration = type === 'error' ? 5000 : 3000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  // Remove a toast notification
  const removeToast = useCallback((id: string): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const value: ToastContextType = {
    showToast,
    toasts,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container - Fixed position at top-right */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto px-4 py-3 rounded-lg shadow-medium
              text-white font-medium min-w-[280px] max-w-md
              animate-slide-in-right
              ${toast.type === 'success' ? 'bg-green-500' : ''}
              ${toast.type === 'error' ? 'bg-red-500' : ''}
              ${toast.type === 'warning' ? 'bg-yellow-500' : ''}
              ${toast.type === 'info' ? 'bg-blue-500' : ''}
            `}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/80 hover:text-white text-sm leading-none"
                aria-label="Dismiss notification"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Custom hook to use toast context
export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

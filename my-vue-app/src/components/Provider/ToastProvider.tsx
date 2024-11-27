import React, { createContext, useContext, useState, ReactNode } from "react";
import ToastComponent from "../Toast";

interface ToastContextType {
  toast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<string[]>([]);

  const toast = (message: string) => {
    setToasts((prev) => [...prev, message]);

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((msg) => msg !== message));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-4">
        {toasts.map((message, index) => (
          <ToastComponent key={index} message={message} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

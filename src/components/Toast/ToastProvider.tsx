import React, { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create a ToastContext
interface ToastContextType {
  showToast: (
    message: string,
    type?: "success" | "error" | "info" | "warning"
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider component
const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* ToastContainer is where all toasts will be rendered */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      />
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;

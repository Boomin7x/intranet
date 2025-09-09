import { toast as toastify } from "react-toastify";
import type { ToastOptions, Id } from "react-toastify";

const defaultOptions: ToastOptions = {
   position: "top-right",
   autoClose: 3000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   pauseOnFocusLoss: true,
   theme: "colored",
};

const success = (message: string, options?: ToastOptions): Id =>
   toastify.success(message, { ...defaultOptions, ...options });

const error = (message: string, options?: ToastOptions): Id =>
   toastify.error(message, { ...defaultOptions, ...options });

const info = (message: string, options?: ToastOptions): Id =>
   toastify.info(message, { ...defaultOptions, ...options });

const warn = (message: string, options?: ToastOptions): Id =>
   toastify.warn(message, { ...defaultOptions, ...options });

export const toast = {
   success,
   error,
   info,
   warn,
   promise: toastify.promise,
   dismiss: toastify.dismiss,
   isActive: toastify.isActive,
};

export default toast;

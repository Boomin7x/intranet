import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@fontsource/outfit/900.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.tsx";
import "./i18n"; // Import i18n configuration
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import { LocalizationProvider } from "@mui/x-date-pickers"; // Import LocalizationProvider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <RecoilRoot>
            <I18nextProvider i18n={i18n}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <App />
                  <ToastContainer
                     position="top-right"
                     autoClose={3000}
                     hideProgressBar={false}
                     newestOnTop
                     closeOnClick
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme="colored"
                  />
               </LocalizationProvider>
            </I18nextProvider>
         </RecoilRoot>
      </ThemeProvider>
   </React.StrictMode>,
);

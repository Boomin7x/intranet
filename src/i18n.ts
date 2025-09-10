import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import english from "./locales/en/translation";
import french from "./locales/fr/translation";
// import Backend from "i18next-http-backend"; // No longer needed

// import english from "./locales/en/translation"; // Corrected import to .ts file
// import frTranslations from "./locales/fr/translation"; // Corrected import to .ts file

i18n
   // .use(Backend) // No longer needed
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources: {
         en: english, // Use the directly imported object which contains all namespaces
         fr: french, // Use the directly imported object which contains all namespaces
      },
      fallbackLng: "fr",
      debug: true,
      interpolation: {
         escapeValue: false,
      },
      // backend: { // No longer needed
      //    loadPath: "/locales/{{lng}}/{{ns}}.json",
      // },
   });

export default i18n;

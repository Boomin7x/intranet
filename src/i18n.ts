import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import Backend from "i18next-http-backend"; // No longer needed

import enTranslation from "./locales/en/translation";
import frTranslation from "./locales/fr/translation";

i18n
   // .use(Backend) // No longer needed
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources: {
         en: {
            translation: enTranslation,
         },
         fr: {
            translation: frTranslation,
         },
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

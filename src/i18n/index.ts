
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./locales/en.json";
import es from "./locales/es.json";

const deviceLng =
  (Array.isArray(Localization.getLocales) &&
    Localization.getLocales()?.[0]?.languageCode) ||
  "en";

i18n
  .use(initReactI18next)
  .init({
   
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: deviceLng,           
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    returnNull: false,        
  });

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en.json";
import frTranslations from "./locales/fr.json";

// The language detector is intentionally NOT registered here: the app always
// initializes in English so SSR output matches the first client render. The
// detected language is applied after mount in the I18nProvider, which also
// persists the choice through the detector's localStorage cache.
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: enTranslations,
      },
      fr: {
        translation: frTranslations,
      },
    },
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;

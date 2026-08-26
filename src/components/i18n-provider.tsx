"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "@/i18n/config";

const detector = new LanguageDetector(undefined, {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
});

function normalizeLanguage(lng: string | undefined): "en" | "fr" {
  return lng && lng.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      document.documentElement.lang = lng;
      detector.cacheUserLanguage(lng);
    };

    // Apply the detected language after mount so the SSR HTML (English)
    // always matches the first client render, avoiding hydration mismatch.
    const detected = detector.detect();
    const first = Array.isArray(detected) ? detected[0] : detected;
    const lng = normalizeLanguage(first);
    if (lng !== i18n.language) {
      i18n.changeLanguage(lng);
    }
    document.documentElement.lang = i18n.language;

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

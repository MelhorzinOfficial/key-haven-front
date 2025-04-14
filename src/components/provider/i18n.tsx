// lib/i18n-client.tsx
"use client";

import { NextIntlClientProvider } from "next-intl";
import { useState, useEffect, ReactNode } from "react";

// Lista de idiomas suportados
export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
];

/**
 * Provides internationalization context and translated messages to React components.
 *
 * Initializes the locale from `localStorage` or defaults to English, loads translation messages dynamically, and updates the locale in response to changes in `localStorage`. Displays a loading spinner while messages are being fetched.
 *
 * @param children - The React components that will receive internationalization context.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("preferredLanguage") || "en";
    }
    return "en";
  });

  const [messages, setMessages] = useState(null);

  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await fetch(`/messages/${locale}.json`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Erro ao carregar traduções:", error);
      }
    }
    loadMessages();
  }, [locale]);

  // Sincroniza com mudanças no localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLocale = localStorage.getItem("preferredLanguage");
      if (savedLocale && savedLocale !== locale) {
        setLocale(savedLocale);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [locale]);

  if (!messages) {
    return (  
      <div className="flex items-center justify-center p-4">  
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>  
      </div>  
    );  
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

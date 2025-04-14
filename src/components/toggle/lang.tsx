"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { languages } from "../provider/i18n";

interface LanguageSwitcherProps {
  variant?: "header" | "sidebar";
  className?: string;
}

/**
 * Renders a language selection dropdown menu with animated UI, allowing users to switch the application's language.
 *
 * The selected language is persisted in localStorage and synchronized across browser tabs. Changing the language reloads the page to apply the new locale.
 *
 * @param variant - Determines the button style and layout, either "header" or "sidebar".
 * @param className - Optional additional CSS classes for custom styling.
 *
 * @remark The component reloads the page after a language change to ensure the new locale is fully applied.
 */
export default function LanguageSwitcher({ variant = "header", className }: LanguageSwitcherProps) {
  const t = useTranslations();
  const [locale, setLocale] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("preferredLanguage") || "en";
    }
    return "en";
  });
  const [isOpen, setIsOpen] = useState(false);

  const isSidebar = variant === "sidebar";

  const buttonStyles = cn("relative h-9 w-9 rounded-full bg-background/10 backdrop-blur-sm border-0", "hover:bg-background/20 transition-all duration-300", isSidebar && "h-full w-full justify-start gap-3 rounded-lg px-3 py-2 text-left", className);

  const hoverAnimation = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  const handleChange = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("preferredLanguage", newLocale);
    window.location.reload();
  };

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

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover="hover" whileTap="tap" variants={hoverAnimation}>
          <Button variant="ghost" size="icon" className={buttonStyles} aria-label="Select language">
            {isSidebar ? (
              <>
                <Globe className="h-4 w-4" />
                <span className="font-medium">{languages.find((lang) => lang.code === locale)?.name || "English"}</span>
              </>
            ) : (
              <Globe className="h-4 w-4" />
            )}
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px] mt-2 bg-background/80 backdrop-blur-lg border border-border/50 rounded-xl shadow-lg p-1">
        {languages.map((language, i) => (
          <motion.div key={language.code} custom={i} initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={itemVariants}>
            <DropdownMenuItem className={cn("flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer", "hover:bg-accent/80 transition-colors duration-300", locale === language.code && "bg-accent/50")} onClick={() => handleChange(language.code)}>
              <span className="text-base mr-2">{language.flag}</span>
              <span className="flex-1 font-medium">{t(`language.${language.code}`)}</span>
              {locale === language.code && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          </motion.div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

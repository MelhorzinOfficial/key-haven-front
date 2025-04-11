"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { I18nProvider } from "@/components/provider/i18n";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <I18nProvider>{children}</I18nProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

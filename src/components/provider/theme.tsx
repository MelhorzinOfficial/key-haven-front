"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Provides theme context to its child components using the NextThemesProvider.
 *
 * Wraps its children with theme management capabilities, enabling dynamic theme switching throughout the application.
 *
 * @param children - The React nodes that will have access to the theme context.
 */
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

'use client';
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { motion } from "framer-motion";

export function ThemeProvider(props: any) {
  return <NextThemesProvider {...props} />;
}

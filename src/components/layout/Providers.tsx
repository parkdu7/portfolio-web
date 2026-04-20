'use client';

import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ContactModalProvider } from '@/contexts/ContactModalContext';
import { AuthProvider } from '@/contexts/AuthContext';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="portfolio-theme"
    >
      <AuthProvider>
        <LanguageProvider>
          <ContactModalProvider>
            {children}
          </ContactModalProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

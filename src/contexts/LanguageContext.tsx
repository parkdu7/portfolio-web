'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { translations } from '@/data/translations';
import type { Lang, Translation } from '@/types';

interface LanguageContextValue {
  lang: Lang;
  t: Translation;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');

  const toggleLang = useCallback(() => {
    setLang(prev => (prev === 'ko' ? 'en' : 'ko'));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}

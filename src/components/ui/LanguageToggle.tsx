'use client';

import { motion } from 'motion/react';
import { useLang } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <motion.button
      onClick={toggleLang}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-1 glass rounded-full px-1 py-1 text-sm font-medium"
      aria-label="Toggle language"
    >
      <motion.span
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
          lang === 'ko'
            ? 'bg-primary-500 text-white'
            : 'text-[var(--fg-muted)]'
        }`}
      >
        KR
      </motion.span>
      <motion.span
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
          lang === 'en'
            ? 'bg-primary-500 text-white'
            : 'text-[var(--fg-muted)]'
        }`}
      >
        EN
      </motion.span>
    </motion.button>
  );
}

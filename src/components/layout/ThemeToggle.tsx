'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Mounted guard: prevents hydration mismatch
  // Server doesn't know the stored theme, client does.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Same dimensions as the button to prevent layout shift
    return <div className="w-10 h-10" aria-hidden />;
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 flex items-center justify-center overlay-btn rounded-full"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 30, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? (
          <Sun size={16} className="text-yellow-400" />
        ) : (
          <Moon size={16} className="text-primary-600" />
        )}
      </motion.div>
    </motion.button>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ChevronDown } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ProficiencyBar } from '@/components/ui/ProficiencyBar';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { useLang } from '@/contexts/LanguageContext';

const roleBadgeColors = [
  'bg-primary-500/15 text-primary-500 border-primary-500/20',
  'bg-emerald-500/15 text-emerald-500 border-emerald-500/20',
  'bg-purple-500/15 text-purple-500 border-purple-500/20',
];

function RoleTyper({ roles }: { roles: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="block text-primary-500 font-semibold"
        >
          {roles[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <SectionWrapper id="hero" className="min-h-screen flex flex-col justify-center relative">
      {/* Top-right controls */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text content */}
          <div>
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[var(--fg-muted)] text-lg mb-2"
            >
              {t.hero.greeting}
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
            >
              {t.hero.name}
            </motion.h1>

            {/* Role typer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl mb-4"
            >
              <RoleTyper roles={t.hero.roles} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[var(--fg-muted)] leading-relaxed mb-6 max-w-md"
            >
              {t.hero.tagline}
            </motion.p>

            {/* Role badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {t.hero.roles.map((role, i) => (
                <span
                  key={role}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${roleBadgeColors[i % roleBadgeColors.length]}`}
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* Resume download CTA */}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-primary-500
                         text-white font-semibold text-sm shadow-lg shadow-primary-500/25
                         hover:bg-primary-600 transition-colors"
            >
              <Download size={16} />
              {t.hero.downloadResume}
            </motion.a>
          </div>

          {/* Right: profile image + proficiency bars */}
          <div className="flex flex-col items-center lg:items-end gap-8">
            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
              className="relative"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 blur-xl opacity-30" />
              {/* Profile border ring */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-1
                              bg-gradient-to-br from-primary-400 via-primary-500 to-purple-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-secondary)]">
                  <img
                    src="/images/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback: show initials
                      const el = e.currentTarget.parentElement;
                      if (el) {
                        el.innerHTML = '<div class="w-full h-full flex items-center justify-center text-4xl font-bold text-primary-500">홍</div>';
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Proficiency bars */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-2xl p-6 w-full max-w-sm"
            >
              <p className="text-xs text-[var(--fg-muted)] uppercase tracking-wider font-semibold mb-4">
                Proficiency
              </p>
              {t.hero.proficiencies.map((item, i) => (
                <ProficiencyBar
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  delay={0.6 + i * 0.1}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
                   text-[var(--fg-muted)] text-xs"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

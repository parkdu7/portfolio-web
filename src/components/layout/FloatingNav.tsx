'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Trophy, Cpu, FolderOpen, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { useActiveSection, SECTION_IDS, type SectionId } from '@/hooks/useActiveSection';
import { useLang } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const NAV_ITEMS: { id: SectionId; Icon: React.ElementType }[] = [
  { id: 'hero',         Icon: User },
  { id: 'achievements', Icon: Trophy },
  { id: 'techstack',    Icon: Cpu },
  { id: 'projects',     Icon: FolderOpen },
  { id: 'contact',      Icon: Mail },
];

function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ─── Desktop Side Nav ────────────────────────────────────────
function DesktopNav() {
  const [collapsed, setCollapsed] = useState(false);
  const activeSection = useActiveSection();
  const { t } = useLang();

  return (
    <motion.nav
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:block"
      aria-label="Site navigation"
    >
      <motion.div
        animate={{ width: collapsed ? 56 : 168 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="glass-nav rounded-2xl py-3 px-2 flex flex-col gap-1 overflow-hidden"
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(p => !p)}
          className="flex items-center justify-center w-8 h-8 rounded-xl self-end
                     text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-white/10 transition-colors"
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Nav items */}
        {NAV_ITEMS.map(({ id, Icon }) => {
          const isActive = activeSection === id;
          return (
            <motion.button
              key={id}
              onClick={() => scrollToSection(id)}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex items-center gap-3 px-2 py-2.5 rounded-xl text-left transition-colors',
                isActive
                  ? 'bg-primary-500 text-white'
                  : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-white/10'
              )}
              aria-current={isActive ? 'location' : undefined}
              aria-label={t.nav[id]}
            >
              <Icon
                size={16}
                className="shrink-0"
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {t.nav[id]}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.nav>
  );
}

// ─── Mobile Bottom Tab Bar ───────────────────────────────────
function MobileNav() {
  const activeSection = useActiveSection();
  const { t } = useLang();

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      aria-label="Site navigation"
    >
      <div className="glass-nav border-t border-[var(--nav-border)] flex">
        {NAV_ITEMS.map(({ id, Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                'flex-1 flex flex-col items-center gap-0.5 py-3 transition-colors',
                isActive ? 'text-primary-500' : 'text-[var(--fg-muted)]'
              )}
              aria-current={isActive ? 'location' : undefined}
              aria-label={t.nav[id]}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{t.nav[id]}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute top-0 w-8 h-0.5 bg-primary-500 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

export function FloatingNav() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}

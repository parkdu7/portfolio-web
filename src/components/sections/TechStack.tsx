'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useLang } from '@/contexts/LanguageContext';
import { techStackData } from '@/data/techStack';
import type { TechLevel } from '@/types';
import { cn } from '@/lib/utils';

const levelColors: Record<TechLevel, string> = {
  expert: 'bg-primary-500/20 text-primary-400',
  proficient: 'bg-emerald-500/20 text-emerald-400',
  familiar: 'bg-orange-500/20 text-orange-400',
};

const levelLabels: Record<TechLevel, string> = {
  expert: 'Expert',
  proficient: 'Proficient',
  familiar: 'Familiar',
};

export function TechStack() {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeCategory = techStackData[activeIndex];

  const goTo = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
  };

  return (
    <SectionWrapper id="techstack" title={t.sections.techStack}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">

          {/* Left: category list (mobile: horizontal scroll, desktop: vertical) */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible
                          md:w-44 shrink-0 pb-1 md:pb-0 scrollbar-none">
            {techStackData.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => goTo(i)}
                className={cn(
                  'flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium',
                  'transition-all duration-200 text-left shrink-0 md:shrink whitespace-nowrap',
                  activeIndex === i
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                    : 'glass-card text-(--fg-muted) hover:text-(--fg)'
                )}
              >
                <span className="text-base">{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Right: tech items with slide animation */}
          <div className="flex-1 relative overflow-hidden" style={{ minHeight: 240 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 36 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -36 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
              >
                {activeCategory.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ii * 0.05 }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 cursor-default"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img
                        src={item.icon}
                        alt={item.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-center leading-tight">
                      {item.name}
                    </span>
                    <span className={cn(
                      'text-[10px] px-2 py-0.5 rounded-full font-medium',
                      levelColors[item.level]
                    )}>
                      {levelLabels[item.level]}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}

'use client';

import { motion } from 'motion/react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useLang } from '@/contexts/LanguageContext';
import { achievementsData } from '@/data/achievements';
import type { AchievementType } from '@/types';
import { cn } from '@/lib/utils';

const typeColors: Record<AchievementType, { bg: string; border: string; dot: string }> = {
  award: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    dot: 'bg-yellow-500',
  },
  cert: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    dot: 'bg-blue-500',
  },
  score: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  activity: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    dot: 'bg-purple-500',
  },
};

const typeOrder: AchievementType[] = ['award', 'cert', 'score', 'activity'];

export function Achievements() {
  const { t } = useLang();

  const grouped = typeOrder.reduce(
    (acc, type) => {
      acc[type] = achievementsData.filter(a => a.type === type);
      return acc;
    },
    {} as Record<AchievementType, typeof achievementsData>
  );

  return (
    <SectionWrapper id="achievements" title={t.sections.achievements}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {typeOrder.map((type, ti) => {
            const items = grouped[type];
            if (!items.length) return null;
            const colors = typeColors[type];

            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ti * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-5">
                  <div className={cn('w-2 h-2 rounded-full', colors.dot)} />
                  <h3 className="text-sm font-semibold text-[var(--fg-muted)] uppercase tracking-wider">
                    {t.achievements[type]}
                  </h3>
                </div>

                {/* Achievement items */}
                <div className="space-y-3">
                  {items.map((item, ii) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ti * 0.1 + ii * 0.06 }}
                      className={cn(
                        'p-4 rounded-xl border',
                        colors.bg,
                        colors.border
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm leading-tight">{item.title}</p>
                          <p className="text-xs text-[var(--fg-muted)] mt-0.5">{item.issuer}</p>
                          {item.description && (
                            <p className="text-xs text-[var(--fg-muted)] mt-1.5 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-[var(--fg-muted)] whitespace-nowrap shrink-0 font-mono">
                          {item.date}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

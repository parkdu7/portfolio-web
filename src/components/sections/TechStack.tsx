'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useLang } from '@/contexts/LanguageContext';
import { techStackData } from '@/data/techStack';
import type { TechCategoryName, TechLevel } from '@/types';
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
  const [activeCategory, setActiveCategory] = useState<TechCategoryName | 'All'>('All');

  const categories = ['All', ...techStackData.map(c => c.name)] as const;

  const filteredData =
    activeCategory === 'All'
      ? techStackData
      : techStackData.filter(c => c.name === activeCategory);

  return (
    <SectionWrapper id="techstack" title={t.sections.techStack}>
      <div className="max-w-6xl mx-auto">
        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat as TechCategoryName | 'All')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === cat
                  ? 'bg-primary-500 text-white'
                  : 'glass-card text-[var(--fg-muted)] hover:text-[var(--fg)]'
              )}
            >
              {cat === 'All' ? '✦ All' : `${techStackData.find(c => c.name === cat)?.emoji ?? ''} ${cat}`}
            </motion.button>
          ))}
        </div>

        {/* Tech grid */}
        {filteredData.map((category, ci) => (
          <div key={category.name} className="mb-10">
            <motion.h3
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.05 }}
              className="text-lg font-semibold mb-4 flex items-center gap-2"
            >
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {category.items.map((item, ii) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ii * 0.05 + ci * 0.02 }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="glass-card rounded-xl p-4 flex flex-col items-center gap-2.5 cursor-default"
                >
                  {/* Icon with fallback to colored circle */}
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
                  <span className="text-xs font-semibold text-center leading-tight">{item.name}</span>
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', levelColors[item.level])}>
                    {levelLabels[item.level]}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

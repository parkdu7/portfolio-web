'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface ProficiencyBarProps {
  label: string;
  value: number;
  delay?: number;
}

export function ProficiencyBar({ label, value, delay = 0 }: ProficiencyBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-[var(--fg)]">{label}</span>
        <span className="text-xs text-[var(--fg-muted)] font-mono">{value}%</span>
      </div>
      <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
          }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : 0 }}
          transition={{
            duration: 1.2,
            ease: [0.4, 0, 0.2, 1],
            delay: delay,
          }}
        />
      </div>
    </div>
  );
}

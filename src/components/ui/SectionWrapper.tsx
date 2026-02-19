'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '@/lib/utils';
import type { SectionId } from '@/hooks/useActiveSection';

interface SectionWrapperProps {
  id: SectionId;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function SectionWrapper({ id, children, className, title }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className={cn('py-24 px-4 md:px-8', className)}
    >
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">{title}</h2>
          <div className="mt-3 w-12 h-1 bg-primary-500 rounded-full" />
        </motion.div>
      )}
      {children}
    </motion.section>
  );
}

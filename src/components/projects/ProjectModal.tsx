'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, Clock, User } from 'lucide-react';
import { ImageCarousel } from './ImageCarousel';
import { useLang } from '@/contexts/LanguageContext';
import type { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLang();

  // Keyboard: ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            aria-hidden
          />

          {/* Modal panel - shares layoutId with ProjectCard */}
          {/* IMPORTANT: No createPortal here - layoutId requires same React tree */}
          <motion.div
            key={`modal-${project.id}`}
            layoutId={`project-card-${project.id}`}
            className="fixed inset-3 md:inset-6 lg:inset-12 z-50 flex flex-col md:flex-row
                       glass rounded-3xl overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 48px)' }}
            transition={{
              layout: { type: 'spring', stiffness: 280, damping: 30 },
            }}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 glass rounded-full flex items-center
                         justify-center hover:bg-red-500/20 transition-colors"
              aria-label={t.projects.close}
            >
              <X size={16} />
            </motion.button>

            {/* ─── LEFT: Image Carousel (55% width on desktop) ─── */}
            <div className="w-full md:w-[55%] h-64 md:h-full shrink-0 overflow-hidden
                            bg-[var(--bg-secondary)]">
              <ImageCarousel images={project.images} projectId={project.id} />
            </div>

            {/* ─── RIGHT: Scrollable description (45% width on desktop) ─── */}
            <div className="flex-1 h-full overflow-y-auto scrollbar-thin p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                exit={{ opacity: 0 }}
              >
                {/* Title */}
                <motion.h2
                  layoutId={`project-title-${project.id}`}
                  className="text-2xl md:text-3xl font-bold mb-2 pr-10"
                >
                  {project.title}
                </motion.h2>

                {/* Meta: role + period */}
                <div className="flex flex-wrap gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-sm text-[var(--fg-muted)]">
                    <User size={14} className="text-primary-400" />
                    <span>{t.projects.role}: </span>
                    <span className="text-[var(--fg)]">{project.role}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[var(--fg-muted)]">
                    <Clock size={14} className="text-primary-400" />
                    <span>{t.projects.period}: </span>
                    <span className="text-[var(--fg)] font-mono text-xs">{project.period}</span>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-wider mb-2">
                    {t.projects.techStack}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techTags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-400
                                   border border-primary-500/20 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full description */}
                <div className="mb-6">
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed whitespace-pre-wrap">
                    {project.fullDesc}
                  </p>
                </div>

                {/* Key features */}
                <div className="mb-8">
                  <h3 className="text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-wider mb-3">
                    {t.projects.keyFeatures}
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 + i * 0.05 } }}
                        className="flex items-start gap-2 text-sm text-[var(--fg-muted)]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-[var(--border)]">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm
                                 font-medium hover:bg-[var(--glass-border)] transition-colors"
                    >
                      <Github size={15} />
                      {t.projects.viewGithub}
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white
                                 rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors"
                    >
                      <ExternalLink size={15} />
                      {t.projects.viewDemo}
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useEffect, useState, useCallback } from 'react';
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
  // Lazy mount: carousel only renders AFTER modal open animation completes
  const [carouselReady, setCarouselReady] = useState(false);

  const handleClose = useCallback(() => {
    setCarouselReady(false);
    onClose();
  }, [onClose]);

  // Reset carousel ready state when project changes
  useEffect(() => {
    if (!project) setCarouselReady(false);
  }, [project]);

  // Keyboard: ESC to close
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, handleClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop - pure opacity, zero blur */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-40"
            aria-hidden
          />

          {/* Modal - GPU transforms only, no shadow during animation */}
          <motion.div
            key={`modal-${project.id}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onAnimationComplete={(def) => {
              // Only set ready on the "animate" (open) phase, not "exit"
              if (def && typeof def === 'object' && 'opacity' in def && def.opacity === 1) {
                setCarouselReady(true);
              }
            }}
            className="fixed inset-3 md:inset-6 lg:inset-12 z-50 flex flex-col md:flex-row
                       rounded-2xl overflow-hidden border border-[var(--card-border)]
                       bg-[var(--bg-secondary)]"
            style={{
              maxHeight: 'calc(100vh - 48px)',
              willChange: 'transform, opacity',
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center
                         justify-center overlay-btn hover:bg-red-500/20 transition-colors"
              aria-label={t.projects.close}
            >
              <X size={14} />
            </button>

            {/* LEFT: Image area */}
            <div className="w-full md:w-[55%] h-56 md:h-full shrink-0 overflow-hidden
                            bg-[var(--bg)]">
              {carouselReady ? (
                <ImageCarousel images={project.images} />
              ) : (
                // Static first image while modal animates in
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://placehold.co/800x600/1e40af/white?text=Image`;
                  }}
                />
              )}
            </div>

            {/* RIGHT: Scrollable description */}
            <div className="flex-1 h-full overflow-y-auto scrollbar-thin p-6 md:p-8">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold mb-2 pr-10">
                {project.title}
              </h2>

              {/* Meta */}
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
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[var(--fg-muted)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                      {item}
                    </li>
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
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                               font-medium border border-[var(--border)]
                               hover:bg-primary-500/10 transition-colors"
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

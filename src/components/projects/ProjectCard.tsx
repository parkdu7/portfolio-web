'use client';

import { motion } from 'motion/react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
}

export function ProjectCard({ project, onOpen, index }: ProjectCardProps) {
  return (
    <motion.div
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} details`}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-900/30 to-primary-700/20">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://placehold.co/800x400/1e40af/white?text=${encodeURIComponent(project.title)}`;
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Period badge */}
        <span className="absolute top-3 right-3 overlay-btn text-xs px-2 py-1 rounded-full font-mono">
          {project.period.split(' ')[0]}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold mb-1.5 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--fg-muted)] leading-relaxed line-clamp-2 mb-4">
          {project.shortDesc}
        </p>

        {/* Tech tags (show first 4) */}
        <div className="flex flex-wrap gap-1.5">
          {project.techTags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400
                         border border-primary-500/20 font-medium"
            >
              {tag}
            </span>
          ))}
          {project.techTags.length > 4 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full text-[var(--fg-muted)]">
              +{project.techTags.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

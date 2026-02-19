'use client';

import { useState, useEffect } from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { useLang } from '@/contexts/LanguageContext';
import { projectsData } from '@/data/projects';
import type { Project } from '@/types';

export function Projects() {
  const { t } = useLang();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Scroll lock when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <SectionWrapper id="projects" title={t.sections.projects}>
      <div className="max-w-6xl mx-auto">
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Modal - rendered in same tree as ProjectCards (required for layoutId animation) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SectionWrapper>
  );
}

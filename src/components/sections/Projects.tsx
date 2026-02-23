"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { useLang } from "@/contexts/LanguageContext";
import { projectsData } from "@/data/projects";
import type { Project } from "@/types";

const PAGE_SIZE = 3;

export function Projects() {
    const { t } = useLang();
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(1);

    const totalPages = Math.ceil(projectsData.length / PAGE_SIZE);
    const paged = projectsData.slice(
        page * PAGE_SIZE,
        page * PAGE_SIZE + PAGE_SIZE,
    );

    const goTo = (next: number, dir: number) => {
        setDirection(dir);
        setPage(next);
    };

    // Scroll lock when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    return (
        <SectionWrapper id='projects' title={t.sections.projects}>
            <div className='max-w-6xl mx-auto'>
                {/* Grid with slide animation */}
                <div className='relative overflow-hidden'>
                    <AnimatePresence mode='wait' custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={{
                                enter: (d: number) => ({
                                    opacity: 0,
                                    x: d * 48,
                                }),
                                center: { opacity: 1, x: 0 },
                                exit: (d: number) => ({
                                    opacity: 0,
                                    x: d * -48,
                                }),
                            }}
                            initial='enter'
                            animate='center'
                            exit='exit'
                            transition={{
                                duration: 0.3,
                                ease: [0.23, 1, 0.32, 1],
                            }}
                            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                        >
                            {paged.map((project, i) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={i}
                                    onOpen={setSelectedProject}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className='flex items-center justify-center gap-4 mt-10'>
                        <button
                            onClick={() => goTo(page - 1, -1)}
                            disabled={page === 0}
                            className='w-10 h-10 rounded-full flex items-center justify-center
                         border border-(--border) transition-colors
                         hover:bg-primary-500/10 hover:border-primary-500/40
                         disabled:opacity-30 disabled:cursor-not-allowed'
                            aria-label='이전 페이지'
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* Dot indicators */}
                        <div className='flex items-center gap-2'>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i, i > page ? 1 : -1)}
                                    className={`rounded-full transition-all duration-200 ${
                                        i === page
                                            ? "w-6 h-2 bg-primary-500"
                                            : "w-2 h-2 bg-gray-400/40 hover:bg-gray-400/70"
                                    }`}
                                    aria-label={`${i + 1}페이지`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => goTo(page + 1, 1)}
                            disabled={page === totalPages - 1}
                            className='w-10 h-10 rounded-full flex items-center justify-center
                         border border-(--border) transition-colors
                         hover:bg-primary-500/10 hover:border-primary-500/40
                         disabled:opacity-30 disabled:cursor-not-allowed'
                            aria-label='다음 페이지'
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </SectionWrapper>
    );
}

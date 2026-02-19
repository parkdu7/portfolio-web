'use client';

import { useState, useEffect, useRef } from 'react';

export const SECTION_IDS = ['hero', 'achievements', 'techstack', 'projects', 'contact'] as const;
export type SectionId = typeof SECTION_IDS[number];

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const intersectingRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          intersectingRef.current[entry.target.id] = entry.isIntersecting;
        });

        // Pick the first (top-most in DOM order) intersecting section
        const firstVisible = SECTION_IDS.find(id => intersectingRef.current[id]);
        if (firstVisible) {
          setActiveSection(firstVisible);
        }
      },
      {
        // Shrink detection zone to the middle 20% of viewport
        // Prevents multiple sections from appearing active near boundaries
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

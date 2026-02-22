import type { Translations } from '@/types';

export const translations: Translations = {
  ko: {
    nav: {
      hero: '소개',
      achievements: '수상/자격',
      techstack: '기술 스택',
      projects: '프로젝트',
      contact: '연락처',
    },
    hero: {
      greeting: '안녕하세요, 저는',
      name: '박승균',
      tagline: '꼼꼼한 설계와 실전 경험으로 성장하는 개발자입니다',
      roles: ['Android Developer', 'Frontend Developer', 'Backend Developer'],
      downloadResume: '이력서 다운로드',
      proficiencies: [
        { label: 'Kotlin / Android', value: 95 },
        { label: 'JavaScript / React', value: 90 },
        { label: 'TypeScript / Next.js', value: 80 },
        { label: 'Java / Spring Boot', value: 65 },
      ],
    },
    sections: {
      achievements: '수상 및 자격',
      techStack: '기술 스택',
      projects: '프로젝트',
      contact: '연락처',
    },
    achievements: {
      award: '🏆 수상',
      cert: '📜 자격증',
      score: '📊 어학 점수',
      activity: '🌱 활동',
    },
    projects: {
      techStack: '사용 기술',
      keyFeatures: '핵심 기능',
      role: '역할',
      period: '기간',
      viewGithub: 'GitHub 보기',
      viewDemo: '데모 보기',
      close: '닫기',
    },
    contact: {
      title: '함께 만들어요',
      subtitle: '새로운 프로젝트, 협업, 취업 기회에 대해 언제든지 연락주세요.',
      email: '이메일',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
  },
  en: {
    nav: {
      hero: 'About',
      achievements: 'Awards',
      techstack: 'Tech Stack',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Park Seung Gyun',
      tagline: 'Developer who grows through careful design and real-world experience',
      roles: ['Android Developer', 'Frontend Developer', 'Backend Developer'],
      downloadResume: 'Download Resume',
      proficiencies: [
        { label: 'Kotlin / Android', value: 95 },
        { label: 'JavaScript / React', value: 90 },
        { label: 'TypeScript / Next.js', value: 80 },
        { label: 'Java / Spring Boot', value: 65 },
      ],
    },
    sections: {
      achievements: 'Awards & Certifications',
      techStack: 'Tech Stack',
      projects: 'Projects',
      contact: 'Contact',
    },
    achievements: {
      award: '🏆 Award',
      cert: '📜 Certification',
      score: '📊 Language Score',
      activity: '🌱 Activity',
    },
    projects: {
      techStack: 'Tech Stack',
      keyFeatures: 'Key Features',
      role: 'Role',
      period: 'Period',
      viewGithub: 'View on GitHub',
      viewDemo: 'Live Demo',
      close: 'Close',
    },
    contact: {
      title: "Let's Build Together",
      subtitle: 'Feel free to reach out for new projects, collaborations, or job opportunities.',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
  },
};

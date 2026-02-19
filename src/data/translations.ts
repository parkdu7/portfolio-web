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
      name: '홍길동',
      tagline: '사용자 경험을 코드로 구현하는 개발자입니다',
      roles: ['Android Developer', 'Backend Developer', 'Frontend Developer'],
      downloadResume: '이력서 다운로드',
      proficiencies: [
        { label: 'Android / Kotlin', value: 90 },
        { label: 'Backend / Spring Boot', value: 80 },
        { label: 'Frontend / React', value: 75 },
        { label: 'Database / SQL', value: 78 },
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
      name: 'Gildong Hong',
      tagline: 'Developer who turns ideas into great user experiences',
      roles: ['Android Developer', 'Backend Developer', 'Frontend Developer'],
      downloadResume: 'Download Resume',
      proficiencies: [
        { label: 'Android / Kotlin', value: 90 },
        { label: 'Backend / Spring Boot', value: 80 },
        { label: 'Frontend / React', value: 75 },
        { label: 'Database / SQL', value: 78 },
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

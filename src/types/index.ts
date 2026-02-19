// ─── Project ─────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  images: string[];
  techTags: string[];
  role: string;
  period: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// ─── Achievement ─────────────────────────────────────────────
export type AchievementType = 'award' | 'cert' | 'score' | 'activity';

export interface Achievement {
  id: string;
  type: AchievementType;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

// ─── Tech Stack ───────────────────────────────────────────────
export type TechLevel = 'expert' | 'proficient' | 'familiar';
export type TechCategoryName = 'Frontend' | 'Backend' | 'Mobile' | 'Database' | 'DevOps';

export interface TechItem {
  name: string;
  icon: string;
  level: TechLevel;
  color?: string;
}

export interface TechCategory {
  name: TechCategoryName;
  emoji: string;
  items: TechItem[];
}

// ─── Translations ─────────────────────────────────────────────
export interface NavTranslation {
  hero: string;
  achievements: string;
  techstack: string;
  projects: string;
  contact: string;
}

export interface HeroTranslation {
  greeting: string;
  name: string;
  tagline: string;
  roles: string[];
  downloadResume: string;
  proficiencies: { label: string; value: number }[];
}

export interface Translation {
  nav: NavTranslation;
  hero: HeroTranslation;
  sections: {
    achievements: string;
    techStack: string;
    projects: string;
    contact: string;
  };
  achievements: {
    award: string;
    cert: string;
    score: string;
    activity: string;
  };
  projects: {
    techStack: string;
    keyFeatures: string;
    role: string;
    period: string;
    viewGithub: string;
    viewDemo: string;
    close: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    github: string;
    linkedin: string;
  };
}

export type Lang = 'ko' | 'en';
export type Translations = Record<Lang, Translation>;

import type { TechCategory } from '@/types';

export const techStackData: TechCategory[] = [
  {
    name: 'Frontend',
    emoji: '🎨',
    items: [
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', level: 'proficient', color: '#61DAFB' },
      { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000', level: 'proficient', color: '#000000' },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6', level: 'proficient', color: '#3178C6' },
      { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', level: 'proficient', color: '#06B6D4' },
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E', level: 'expert', color: '#F7DF1E' },
    ],
  },
  {
    name: 'Backend',
    emoji: '⚙️',
    items: [
      { name: 'Spring Boot', icon: 'https://cdn.simpleicons.org/springboot/6DB33F', level: 'proficient', color: '#6DB33F' },
      { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933', level: 'proficient', color: '#339933' },
      { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/000000', level: 'proficient', color: '#ED8B00' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', level: 'familiar', color: '#3776AB' },
      { name: 'REST API', icon: 'https://cdn.simpleicons.org/fastapi/009688', level: 'expert', color: '#009688' },
    ],
  },
  {
    name: 'Mobile',
    emoji: '📱',
    items: [
      { name: 'Android', icon: 'https://cdn.simpleicons.org/android/3DDC84', level: 'expert', color: '#3DDC84' },
      { name: 'Kotlin', icon: 'https://cdn.simpleicons.org/kotlin/7F52FF', level: 'expert', color: '#7F52FF' },
      { name: 'Jetpack Compose', icon: 'https://cdn.simpleicons.org/jetpackcompose/4285F4', level: 'proficient', color: '#4285F4' },
      { name: 'React Native', icon: 'https://cdn.simpleicons.org/react/61DAFB', level: 'familiar', color: '#61DAFB' },
    ],
  },
  {
    name: 'Database',
    emoji: '🗄️',
    items: [
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', level: 'proficient', color: '#4169E1' },
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1', level: 'proficient', color: '#4479A1' },
      { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D', level: 'familiar', color: '#DC382D' },
      { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248', level: 'familiar', color: '#47A248' },
      { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28', level: 'proficient', color: '#FFCA28' },
    ],
  },
  {
    name: 'DevOps',
    emoji: '🚀',
    items: [
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED', level: 'familiar', color: '#2496ED' },
      { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032', level: 'expert', color: '#F05032' },
      { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/2088FF', level: 'familiar', color: '#2088FF' },
      { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000', level: 'proficient', color: '#000000' },
      { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/FCC624', level: 'familiar', color: '#FCC624' },
    ],
  },
];

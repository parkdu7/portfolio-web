import type { TechCategory } from '@/types';

export const techStackData: TechCategory[] = [
  {
    name: 'Frontend',
    emoji: '🎨',
    items: [
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E', level: 'expert', color: '#F7DF1E' },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6', level: 'proficient', color: '#3178C6' },
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', level: 'proficient', color: '#61DAFB' },
      { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000', level: 'familiar', color: '#000000' },
      { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', level: 'proficient', color: '#06B6D4' },
    ],
  },
  {
    name: 'Backend',
    emoji: '⚙️',
    items: [
      { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/000000', level: 'familiar', color: '#ED8B00' },
      { name: 'Spring Boot', icon: 'https://cdn.simpleicons.org/springboot/6DB33F', level: 'familiar', color: '#6DB33F' },
      { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933', level: 'familiar', color: '#339933' },
      { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688', level: 'familiar', color: '#009688' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', level: 'familiar', color: '#3776AB' },
    ],
  },
  {
    name: 'Mobile',
    emoji: '📱',
    items: [
      { name: 'Kotlin', icon: 'https://cdn.simpleicons.org/kotlin/7F52FF', level: 'expert', color: '#7F52FF' },
      { name: 'Android', icon: 'https://cdn.simpleicons.org/android/3DDC84', level: 'expert', color: '#3DDC84' },
      { name: 'Jetpack Compose', icon: 'https://cdn.simpleicons.org/jetpackcompose/4285F4', level: 'proficient', color: '#4285F4' },
      { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B', level: 'familiar', color: '#02569B' },
    ],
  },
  {
    name: 'Database',
    emoji: '🗄️',
    items: [
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1', level: 'proficient', color: '#4479A1' },
      { name: 'MariaDB', icon: 'https://cdn.simpleicons.org/mariadb/003545', level: 'proficient', color: '#003545' },
      { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248', level: 'familiar', color: '#47A248' },
      { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D', level: 'familiar', color: '#DC382D' },
      { name: 'HBase', icon: 'https://cdn.simpleicons.org/apachehadoop/66CCFF', level: 'familiar', color: '#66CCFF' },
    ],
  },
  {
    name: 'DevOps',
    emoji: '🚀',
    items: [
      { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032', level: 'expert', color: '#F05032' },
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED', level: 'proficient', color: '#2496ED' },
      { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/2088FF', level: 'familiar', color: '#2088FF' },
      { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/FCC624', level: 'familiar', color: '#FCC624' },
      { name: 'AWS EC2', icon: 'https://cdn.simpleicons.org/amazonec2/FF9900', level: 'familiar', color: '#FF9900' },
    ],
  },
];

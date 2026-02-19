import type { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'smart-campus',
    title: 'Smart Campus App',
    shortDesc: '교내 스마트 캠퍼스 통합 플랫폼 - 강의실 예약, 공지사항, 학생 커뮤니티',
    fullDesc: `캠퍼스 내 다양한 서비스를 하나의 앱으로 통합한 올인원 플랫폼입니다.

학생들이 강의실 예약, 식단 조회, 공지사항 확인, 커뮤니티 활동 등을 하나의 앱에서 처리할 수 있도록 설계했습니다.

기존에 분산되어 있던 5개의 별도 웹사이트를 단일 모바일 앱으로 통합하여 사용자 경험을 크게 개선했습니다.

실시간 알림 시스템으로 강의 취소, 시설 예약 확인 등을 즉시 받아볼 수 있습니다.`,
    images: [
      '/images/projects/smart-campus-1.jpg',
      '/images/projects/smart-campus-2.jpg',
      '/images/projects/smart-campus-3.jpg',
    ],
    techTags: ['Android', 'Kotlin', 'Jetpack Compose', 'Spring Boot', 'PostgreSQL', 'Firebase'],
    role: 'Android Developer & Backend Developer',
    period: '2024.03 – 2024.08 (6개월)',
    highlights: [
      '강의실 실시간 예약 시스템 (WebSocket 기반)',
      'FCM 푸시 알림 통합 (일평균 2,000+ 전송)',
      'JWT 인증 + Refresh Token 보안 흐름 구현',
      '사용자 500명 베타 테스트, 만족도 4.6/5',
      'Jetpack Compose로 UI 구현, 단위 테스트 커버리지 78%',
    ],
    githubUrl: 'https://github.com',
    liveUrl: undefined,
  },
  {
    id: 'devlog',
    title: 'DevLog - 개발자 블로그 플랫폼',
    shortDesc: 'Markdown 기반 개발자 블로그 플랫폼. 태그 검색, 시리즈, 댓글 기능 포함.',
    fullDesc: `개발자를 위한 기술 블로그 플랫폼으로, Velog에서 영감을 받아 직접 구현했습니다.

Markdown 에디터와 실시간 미리보기를 지원하며, 코드 하이라이팅, 수식 렌더링(KaTeX)을 내장했습니다.

SEO 최적화를 위해 Next.js SSG/ISR을 적극 활용했고, Lighthouse 성능 점수 95점을 달성했습니다.

태그 기반 검색과 시리즈 기능으로 글을 체계적으로 관리할 수 있습니다.`,
    images: [
      '/images/projects/devlog-1.jpg',
      '/images/projects/devlog-2.jpg',
    ],
    techTags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Vercel'],
    role: 'Full-Stack Developer',
    period: '2024.09 – 2024.12 (4개월)',
    highlights: [
      'Next.js ISR로 빌드 없이 콘텐츠 업데이트',
      'Prisma ORM으로 타입 안전한 DB 쿼리',
      'Lighthouse 성능 점수 95점 달성',
      'GitHub OAuth 소셜 로그인 구현',
      'Vercel Analytics + Custom 방문자 추적',
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 'fitness-tracker',
    title: 'FitTrack - 운동 기록 앱',
    shortDesc: '개인 맞춤형 운동 루틴 & 기록 앱. 머신러닝 기반 자세 분석 기능 포함.',
    fullDesc: `사용자의 운동 패턴을 분석하고 개인화된 루틴을 추천하는 Android 피트니스 앱입니다.

ML Kit의 Pose Detection을 활용해 스마트폰 카메라로 운동 자세를 실시간 분석하고 피드백을 제공합니다.

Room DB + DataStore로 오프라인 우선 아키텍처를 구현하여 네트워크 없이도 완전히 사용 가능합니다.

Hilt를 통한 의존성 주입과 MVVM 패턴으로 테스트 가능한 아키텍처를 설계했습니다.`,
    images: [
      '/images/projects/fitness-1.jpg',
      '/images/projects/fitness-2.jpg',
    ],
    techTags: ['Android', 'Kotlin', 'ML Kit', 'Room DB', 'Hilt', 'Coroutines'],
    role: 'Android Developer',
    period: '2025.01 – 2025.04 (4개월)',
    highlights: [
      'ML Kit Pose Detection 실시간 자세 분석',
      'Room DB + WorkManager 오프라인 동기화',
      'Hilt 의존성 주입 + MVVM + Clean Architecture',
      'Coroutines + Flow 비동기 처리',
      '단위/통합 테스트 커버리지 82%',
    ],
    githubUrl: 'https://github.com',
    liveUrl: undefined,
  },
];

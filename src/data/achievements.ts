import type { Achievement } from '@/types';

export const achievementsData: Achievement[] = [
  // Awards
  {
    id: 'capstone-award',
    type: 'award',
    title: '캡스톤 디자인 우수상',
    issuer: '한국대학교 공과대학',
    date: '2024.12',
    description: 'Smart Campus App 프로젝트로 전체 2위 수상',
  },
  {
    id: 'hackathon-2024',
    type: 'award',
    title: '교내 해커톤 최우수상',
    issuer: '한국대학교 SW중심사업단',
    date: '2024.06',
    description: '24시간 해커톤, 팀 리더로 참가하여 최우수상 수상',
  },
  {
    id: 'coding-contest',
    type: 'award',
    title: '알고리즘 경진대회 장려상',
    issuer: '한국정보올림피아드',
    date: '2023.10',
    description: '지역 예선 통과, 본선 진출',
  },

  // Certifications
  {
    id: 'sqld',
    type: 'cert',
    title: 'SQLD (SQL 개발자)',
    issuer: '한국데이터산업진흥원',
    date: '2024.09',
  },
  {
    id: 'adsp',
    type: 'cert',
    title: 'ADsP (데이터 분석 준전문가)',
    issuer: '한국데이터산업진흥원',
    date: '2024.04',
  },
  {
    id: 'linux-cert',
    type: 'cert',
    title: 'LINUX Master 2급',
    issuer: '한국정보통신진흥협회',
    date: '2023.12',
  },

  // Language Scores
  {
    id: 'toeic',
    type: 'score',
    title: 'TOEIC 875점',
    issuer: 'ETS',
    date: '2024.11',
    description: 'Reading 450 / Listening 425',
  },
  {
    id: 'opic',
    type: 'score',
    title: 'OPIc IH',
    issuer: 'ACTFL',
    date: '2024.08',
  },

  // Activities
  {
    id: 'dev-club',
    type: 'activity',
    title: '교내 개발 동아리 GDSC 운영진',
    issuer: 'Google Developer Student Clubs',
    date: '2023.09 – 2024.08',
    description: '스터디 기획 및 운영, 세션 발표 4회',
  },
  {
    id: 'opensource',
    type: 'activity',
    title: '오픈소스 컨트리뷰톤 참가',
    issuer: '정보통신산업진흥원',
    date: '2024.09',
    description: 'React 기반 오픈소스 프로젝트 PR 3건 머지',
  },
];

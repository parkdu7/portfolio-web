import type { Achievement } from '@/types';

export const achievementsData: Achievement[] = [
  // Awards
  {
    id: 'shinhan-hackathon',
    type: 'award',
    title: '신한은행 해커톤 대상',
    issuer: '신한은행',
    date: '2025.02',
    description: '캠핑! (캠펑) - 위치기반 캠퍼스 커뮤니티 앱',
  },
  {
    id: 'ssafy-specialized',
    type: 'award',
    title: 'SSAFY 특화 프로젝트 우수상 (1위)',
    issuer: '삼성 청년 SW 아카데미',
    date: '2025',
    description: 'RSP - 논문 검색/추천 빅데이터 플랫폼',
  },
  {
    id: 'ssafy-autonomous',
    type: 'award',
    title: 'SSAFY 자율 프로젝트 우수상 (2위)',
    issuer: '삼성 청년 SW 아카데미',
    date: '2025',
    description: 'ARFNI - GUI 인프라 배포 자동화 플랫폼',
  },

  // Certifications
  {
    id: 'sqld',
    type: 'cert',
    title: 'SQLD (SQL 개발자)',
    issuer: '한국데이터산업진흥원',
    date: '2024',
  },

  // Language Scores
  {
    id: 'opic',
    type: 'score',
    title: 'OPIc IM1',
    issuer: 'ACTFL',
    date: '2024',
  },
  {
    id: 'toeic',
    type: 'score',
    title: 'TOEIC 760점',
    issuer: 'ETS',
    date: '2024',
  },

  // Activities
  {
    id: 'ssafy',
    type: 'activity',
    title: '삼성 청년 SW 아카데미 (SSAFY) 13기',
    issuer: '삼성전자',
    date: '2024.07 – 2025.06',
    description: 'Java, Algorithm, Web 과정 수료',
  },
  {
    id: 'likelion',
    type: 'activity',
    title: '멋쟁이사자처럼 대학 12기',
    issuer: '멋쟁이사자처럼',
    date: '2024.03 – 2024.12',
    description: '웹 개발 교육 및 프로젝트 참여',
  },
  {
    id: 'lowain-intern',
    type: 'activity',
    title: '로웨인 IoT 개발 인턴',
    issuer: '(주)로웨인',
    date: '2024.10 – 2024.11',
    description: 'Flutter 기반 스마트팜 대시보드 개발',
  },
];

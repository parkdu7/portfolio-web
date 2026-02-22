import type { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "camping",
    title: "캠핑! (캠펑)",
    shortDesc: "위치 기반 캠퍼스 커뮤니티 앱 — 신한은행 해커톤 대상 수상",
    fullDesc: `침체된 캠퍼스 커뮤니티를 활성화하기 위해 위치 기반 소셜 플랫폼을 기획 및 개발했습니다.

Geohash-8 알고리즘으로 사용자 위치를 인코딩하고, WebSocket/STOMP를 통해 근처 게시물을 실시간으로 알림합니다. QuadTree 공간 분할 알고리즘을 직접 구현하여 500개 마커 환경에서도 60fps를 유지하는 지도 클러스터링을 완성했습니다.

안드로이드 클라이언트에서 라이브러리 없이 raw WebSocket 위에 STOMP 프레임을 직접 조립하여 STOMP 프로토콜을 구현했으며, MarkerPool 객체 재사용 패턴과 아이콘 캐시 시스템으로 렌더링 성능을 최적화했습니다.

신한은행 해커톤(2주)에서 팀 5명 중 Android 및 백엔드를 담당하여 대상을 수상했습니다.`,
    images: [
      "/images/projects/camping/1.png",
      "/images/projects/camping/2.png",
      "/images/projects/camping/3.png",
    ],
    techTags: [
      "Android",
      "Kotlin",
      "Spring Boot",
      "WebSocket",
      "STOMP",
      "Geohash",
      "QuadTree",
      "MySQL",
    ],
    role: "Android Developer & Backend Developer",
    period: "2025.01 – 2025.02 (2주)",
    highlights: [
      "Geohash + STOMP 기반 실시간 위치 알림 시스템",
      "QuadTree 알고리즘으로 500개 마커 60fps 유지",
      "raw WebSocket 위에 STOMP 프로토콜 직접 구현",
      "MarkerPool 객체 재사용으로 렌더링 성능 최적화",
      "신한은행 해커톤 대상 수상 (2주 / 팀 5명)",
    ],
  },
  {
    id: "ssafy-market",
    title: "SSAFY 마켓",
    shortDesc: "SSAFY 캠퍼스 중고거래 플랫폼 — 400명 실사용자 운영",
    fullDesc: `삼성 SW아카데미(SSAFY) 교육생을 위한 캠퍼스 중고거래 웹 플랫폼으로, 프론트엔드 전체를 담당했습니다.

React 18 + TypeScript + Vite로 SPA를 구축하고, TanStack Query로 서버 상태를 관리했습니다. 낙관적 업데이트와 캐싱 전략을 적용하여 반응성을 높였으며, WebSocket/STOMP 기반 실시간 1:1 채팅 시스템을 구현했습니다.

싱글톤 패턴의 websocketService로 연결을 전역 관리하고, React Query + Zustand store 동시 업데이트로 채팅 읽음 상태를 양방향 동기화했습니다. URL 기반 상태 관리(useSearchParams)와 모바일 반응형 레이아웃(리스트/그리드 전환)을 적용하여 UX를 개선했습니다.

실제 교육생 400명이 사용하는 서비스로 운영되었습니다.`,
    images: [
      "/images/projects/ssafy-market/1.png",
      "/images/projects/ssafy-market/2.png",
      "/images/projects/ssafy-market/3.png",
    ],
    techTags: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Zustand",
      "WebSocket",
      "STOMP",
      "Tailwind CSS",
    ],
    role: "Frontend Developer",
    period: "2024.09 – 2024.11",
    highlights: [
      "TanStack Query 낙관적 업데이트 + 캐싱 전략",
      "WebSocket/STOMP 실시간 1:1 채팅 시스템",
      "싱글톤 websocketService + Zustand 양방향 동기화",
      "URL 기반 상태 관리 (useSearchParams)",
      "실사용자 400명 운영",
    ],
  },
  {
    id: "rsp",
    title: "RSP — Research Search Platform",
    shortDesc: "논문 검색/추천 빅데이터 플랫폼 — SSAFY 특화 프로젝트 우수상 1위",
    fullDesc: `연구자를 위한 논문 검색 및 추천 시스템으로, 하이브리드 검색 엔진과 빅데이터 파이프라인을 개발했습니다.

검색 파이프라인은 3단계로 구성됩니다. Stage 1에서 OpenSearch BM25로 최대 1,000개 후보를 추출하고, Stage 2에서 768차원 임베딩 벡터(all-mpnet-base-v2)로 의미적 유사도를 계산합니다. Stage 3에서 키워드(40%) + 의미(40%) + 인용수(20%) 가중 조합으로 최종 랭킹을 산출합니다.

asyncio.gather()로 Stage 1과 임베딩 생성을 동시에 실행하고, ThreadPoolExecutor(max_workers=10)로 병렬 처리, HBase 5분 TTL 캐싱으로 반복 조회를 방지하여 평균 응답시간 250ms를 달성했습니다.

PySpark로 논문 간 유사도를 사전 계산하여 마인드맵 형태의 실시간 연관 논문 탐색 기능을 제공합니다.`,
    images: [
      "/images/projects/rsp/1.png",
      "/images/projects/rsp/2.png",
      "/images/projects/rsp/3.png",
    ],
    techTags: [
      "OpenSearch",
      "PySpark",
      "HBase",
      "FastAPI",
      "Python",
      "React",
      "TypeScript",
      "Docker",
    ],
    role: "AI & Data Engineer",
    period: "2025.02 – 2025.04",
    highlights: [
      "3단계 하이브리드 검색 엔진 (BM25 + 임베딩 + 인용수)",
      "asyncio + ThreadPoolExecutor 비동기 병렬 처리",
      "HBase TTL 캐싱으로 평균 응답시간 250ms 달성",
      "PySpark 배치 처리 기반 마인드맵 연관 논문 탐색",
      "SSAFY 특화 프로젝트 우수상 1위",
    ],
  },
  {
    id: "arfni",
    title: "ARFNI",
    shortDesc: "GUI 기반 인프라 배포 자동화 플랫폼 — SSAFY 자율 프로젝트 우수상 2위",
    fullDesc: `React Flow 캔버스에서 드래그앤드롭으로 인프라를 설계하면 stack.yaml을 자동 생성하고, Go CLI 엔진이 Docker/EC2에 자동 배포하는 오픈소스 플랫폼입니다.

YAML 기반 선언형 플러그인 시스템을 설계하여 외부 개발자가 새로운 서비스를 쉽게 추가할 수 있도록 했습니다. 노드/엣지 분석 → 환경변수 자동 주입 → stack.yaml 생성 → GitHub CI/CD 워크플로우 자동 생성까지 배포 파이프라인 전체를 자동화했습니다.

Redux Toolkit으로 Canvas 상태를 관리하고, Debounce(2초) 자동 저장으로 Race Condition을 방지했습니다. Tauri IPC 기반 실시간 배포 로그를 구독하고, Go 엔진에서 AtomicBool로 중복 배포를 방지하며 멀티스레드 stdout/stderr 스트리밍을 구현했습니다.`,
    images: [
      "/images/projects/arfni/1.png",
      "/images/projects/arfni/2.png",
      "/images/projects/arfni/3.png",
    ],
    techTags: [
      "React 19",
      "Redux Toolkit",
      "React Flow",
      "Tauri 2",
      "TypeScript",
      "Go",
      "Docker",
      "GitHub Actions",
    ],
    role: "Frontend Developer",
    period: "2025.04 – 2025.05",
    highlights: [
      "YAML 선언형 플러그인 시스템 설계",
      "노드/엣지 분석 → stack.yaml 자동 생성",
      "Tauri IPC 실시간 배포 로그 구독",
      "Go CLI AtomicBool 기반 중복 배포 방지",
      "SSAFY 자율 프로젝트 우수상 2위",
    ],
  },
  {
    id: "ragohaltae",
    title: "라고할때",
    shortDesc: "학습형 모의투자 앱 — KR-FinBERT AI 금융 뉴스 감성 분석",
    fullDesc: `주식 투자 초보자를 위한 모의투자 학습 앱으로, Android 개발과 백엔드 일부를 담당했습니다.

한국어 금융 특화 AI 모델인 KR-FinBERT로 구글 뉴스 RSS를 크롤링하여 감성 점수(-1.0 ~ 1.0)를 산출하고, 이를 자동매매봇의 판단 지표로 활용합니다. Selenium으로 뉴스 본문을 추출하고 Flask 마이크로서비스에서 AI 분석을 담당합니다.

WebSocket 구독 최적화로 실시간 주가 렌더링 부하를 줄였으며, Spring Boot + Flask 마이크로서비스 전환으로 메모리 사용량 58% 절감(8.1GB → 3.4GB), 시스템 부하 55% 감소(47% → 21%)를 달성했습니다.

FCM 푸시 알림으로 데일리 퀴즈와 거래 알림을 제공하며, 메인/학습/포트폴리오/랭킹 화면 Android UI를 개발했습니다.`,
    images: [
      "/images/projects/ragohaltae/1.png",
      "/images/projects/ragohaltae/2.png",
      "/images/projects/ragohaltae/3.png",
    ],
    techTags: [
      "Android",
      "Kotlin",
      "Spring Boot",
      "Flask",
      "KR-FinBERT",
      "WebSocket",
      "MySQL",
      "Docker Compose",
    ],
    role: "Android Developer & Backend Developer",
    period: "2025.01 – 2025.02",
    highlights: [
      "KR-FinBERT 기반 금융 뉴스 감성 분석 (-1.0 ~ 1.0)",
      "마이크로서비스 전환으로 메모리 58% 절감",
      "WebSocket 최적화로 실시간 주가 렌더링 부하 감소",
      "FCM 푸시 알림 (데일리 퀴즈, 거래 알림)",
      "Android MVVM 아키텍처",
    ],
  },
  {
    id: "lowain",
    title: "로웨인 스마트팜 대시보드",
    shortDesc: "Flutter 기반 IoT 스마트팜 모니터링 대시보드 — 인턴십 프로젝트",
    fullDesc: `식물공장의 양액 재배 환경을 실시간으로 모니터링하고 제어하는 IoT 대시보드를 Flutter로 개발했습니다. (주)로웨인 인턴십 프로젝트입니다.

Clean Architecture(Presentation/Domain/Data 레이어)와 Cubit 상태관리를 적용했습니다. Syncfusion 게이지로 온도/pH/EC 센서 데이터를 실시간 시각화하고, FL Chart로 시계열 추이를 라인 차트로 표시합니다.

LayoutBuilder로 태블릿 반응형 게이지를 최적화하고, const 생성자로 불필요한 재빌드를 방지했습니다. List.from()으로 데이터 불변성을 보장하고, 드롭다운 기반 다중 장비 전환 UI를 구현했습니다.

백엔드는 Node-Red 기반 서버를 FastAPI + MQTT(paho-mqtt)로 리팩토링하고, MongoDB Projection으로 데이터 전송량 60%를 절감했습니다.`,
    images: [
      "/images/projects/lowain/1.png",
      "/images/projects/lowain/2.png",
    ],
    techTags: [
      "Flutter",
      "Dart",
      "FastAPI",
      "MQTT",
      "MongoDB",
      "Docker Compose",
      "IoT",
    ],
    role: "Mobile Developer & Backend Developer (인턴)",
    period: "2024.10 – 2024.11",
    highlights: [
      "Clean Architecture + Cubit 상태관리",
      "Syncfusion 게이지 + FL Chart 실시간 시각화",
      "FastAPI + MQTT 기반 IoT 데이터 수집",
      "MongoDB Projection으로 데이터 전송량 60% 절감",
      "태블릿 반응형 레이아웃 최적화",
    ],
  },
  {
    id: "mongdangbul",
    title: "몽당불",
    shortDesc: "온라인 독서 토론 플랫폼 — Claude API 기반 AI 토론 요약",
    fullDesc: `실시간 소통과 모바일 최적화에 중점을 둔 독서 토론 커뮤니티 플랫폼입니다. 프론트엔드와 백엔드를 함께 개발했습니다.

Socket.io를 이용한 실시간 채팅 시스템을 구현했으며, 토론 종료 시 Claude AI가 전체 대화를 분석하여 핵심 의견을 요약합니다. JSON 추출 안전성을 위해 extractJSON 함수를 직접 구현했습니다.

findOrCreate 패턴으로 참여자 재연결 시 중복 생성을 방지하고, 복합 기본키(userId + roomId)로 참여자를 관리합니다. 카카오 OAuth 소셜 로그인, 네이버 책 검색 API 연동, PWA 배포로 모바일에서도 앱처럼 사용할 수 있습니다.

Sequelize ORM으로 9개 모델의 데이터베이스를 설계하고, useEffect 클린업으로 소켓을 안전하게 해제합니다.`,
    images: [
      "/images/projects/mongdangbul/1.png",
      "/images/projects/mongdangbul/2.png",
    ],
    techTags: [
      "React",
      "Node.js",
      "Socket.io",
      "Claude API",
      "MariaDB",
      "Sequelize",
      "PWA",
    ],
    role: "Full-Stack Developer",
    period: "2024",
    highlights: [
      "Socket.io 실시간 토론 채팅",
      "Claude API 기반 AI 토론 요약 (JSON 파싱 안전화)",
      "findOrCreate 패턴으로 재연결 시 중복 방지",
      "카카오 OAuth + 네이버 책 검색 API 연동",
      "PWA 배포로 모바일 앱 경험 제공",
    ],
  },
  {
    id: "cheatday",
    title: "치팅데이",
    shortDesc: "AI 식단 분석 건강관리 웹앱 — GPT Vision + 3D 캐릭터",
    fullDesc: `다이어트 중 치팅데이의 올바른 인식과 맞춤 칼로리 기반 식단/운동 관리 웹 앱입니다. 프론트엔드를 단독으로 개발했습니다.

GPT Vision API로 음식 사진을 분석하여 칼로리와 영양소를 자동 추출합니다. 5초 폴링과 3분 타임아웃 설정으로 비동기 이미지 분석 UX를 최적화하여, 식단 입력 시간을 5분에서 30초로 90% 단축했습니다.

React Three Fiber로 GLTF 3D 캐릭터를 로딩하고 체중 변화에 따라 애니메이션을 제어합니다. react-spring으로 칼로리 프로그레스 바를 애니메이션하고, Chart.js로 영양소 차트를 표시합니다.

browser-image-compression으로 클라이언트 측 이미지를 압축하고, Context API + localStorage + Axios Interceptor로 인증 상태를 관리합니다. 54개 컴포넌트 파일을 개발했습니다.`,
    images: [
      "/images/projects/cheatday/1.png",
      "/images/projects/cheatday/2.png",
      "/images/projects/cheatday/3.png",
    ],
    techTags: [
      "React",
      "Three.js",
      "React Three Fiber",
      "GPT Vision API",
      "Chart.js",
      "Node.js",
      "MariaDB",
    ],
    role: "Frontend Developer",
    period: "2024.07 – 2024.08 (5주)",
    highlights: [
      "GPT Vision API 기반 음식 이미지 자동 분석",
      "식단 입력 시간 90% 단축 (5분 → 30초)",
      "React Three Fiber 3D 캐릭터 및 애니메이션",
      "5초 폴링 + 3분 타임아웃 비동기 분석 UX",
      "54개 컴포넌트 단독 개발",
    ],
  },
  {
    id: "myspec",
    title: "MySpec",
    shortDesc: "PC 하드웨어 성능 측정 및 게임 사양 비교 플랫폼",
    fullDesc: `사용자의 PC 하드웨어 정보를 수집하고 성능 분석, 게임 요구사양 비교, 사용자 랭킹 비교가 가능한 웹 플랫폼입니다. 프론트엔드를 담당했습니다.

Windows 데스크톱 앱(localhost:3000)과 연동하여 하드웨어 정보를 자동 수집합니다. react-window와 react-window-infinite-loader로 대용량 랭킹 데이터를 가상화 스크롤로 처리하여 DOM 노드를 최소화했습니다.

TanStack Query의 staleTime/gcTime을 분리하여 SWR(Stale-While-Revalidate) 패턴을 구현하고, localhost macAddress를 localStorage에 저장하여 사용자를 식별합니다. CPU/GPU/RAM 동적 필터링과 조건부 Grid 레이아웃(3열/2열)을 적용했습니다.

React Router Location State로 페이지 간 하드웨어 데이터를 전달하고, 30회 이상의 커밋으로 CORS 이슈를 해결했습니다.`,
    images: [
      "/images/projects/myspec/1.png",
      "/images/projects/myspec/2.png",
    ],
    techTags: [
      "React",
      "TypeScript",
      "TanStack Query",
      "react-window",
      "Styled-components",
      "Netlify",
    ],
    role: "Frontend Developer",
    period: "2024",
    highlights: [
      "react-window 가상화 스크롤로 대용량 데이터 처리",
      "TanStack Query SWR 패턴 (staleTime/gcTime 분리)",
      "Windows 데스크톱 앱 연동 하드웨어 자동 수집",
      "CPU/GPU/RAM 동적 필터링 시스템",
      "게임 사양 비교 + 사용자 랭킹 기능",
    ],
    liveUrl: undefined,
  },
  {
    id: "sequence",
    title: "Sequence",
    shortDesc: "개발자/디자이너/기획자 팀 모집 및 협업 포트폴리오 플랫폼",
    fullDesc: `개발자, 디자이너, 기획자가 프로젝트 팀원을 모집하고 협업 경험을 포트폴리오로 관리하는 플랫폼입니다. 풀스택으로 개발에 참여했습니다.

6개 카테고리 다중 필터링과 검색어 기반 실시간 검색을 구현했습니다. Material-UI Masonry로 반응형 그리드를 구성하고, 아카이브 상세 페이지에 권한 기반 UI(작성자 vs 일반 사용자)를 적용했습니다.

Recoil로 전역 상태를 관리하고, SessionStorage 기반 인증 토큰 관리로 보안을 확보했습니다. Axios 인스턴스를 tokenAxios와 axiosInstance로 분리하여 인증/비인증 요청을 구분했습니다.

TypeScript 인터페이스와 제네릭 타입으로 재사용 가능한 컴포넌트를 설계하고, React Router 동적 라우팅과 state를 활용했습니다.`,
    images: [
      "/images/projects/sequence/1.png",
      "/images/projects/sequence/2.png",
    ],
    techTags: [
      "React",
      "TypeScript",
      "Recoil",
      "Styled-components",
      "Material-UI",
      "Axios",
    ],
    role: "Full-Stack Developer",
    period: "2024",
    highlights: [
      "6개 카테고리 다중 필터링 + 실시간 검색",
      "Material-UI Masonry 반응형 그리드",
      "Recoil 전역 상태 + SessionStorage 인증 관리",
      "Axios 인스턴스 분리 (인증/비인증 요청)",
      "TypeScript 제네릭 기반 재사용 컴포넌트",
    ],
    liveUrl: "https://sequence.agong.store",
  },
];

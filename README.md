# Blue-ming 🌸

**춘천시 청년 창업 AI 컨설팅 플랫폼 (공모전 출품작)**

춘천시 청년 창업자들의 창업 진입장벽을 낮추기 위해 기획된 AI 기반 컨설팅 플랫폼입니다.

> **⚠️ 본 프로젝트는 공모전 제출을 위한 프로토타입입니다. 실제 운영 중인 서비스가 아닙니다.**

<div align="center">
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![OpenAI](https://img.shields.io/badge/OpenAI-API-green?style=flat-square&logo=openai)](https://openai.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  
</div>

---

## 🎯 프로젝트 개요

Blue-ming은 춘천시 청년 창업자들을 위한 AI 기반 가상 컨설팅 플랫폼 기획안입니다. 4개 분야(재무, 정책, 마케팅, 기술)의 전문가 AI가 춘천시 맞춤형 데이터와 창업 정책을 바탕으로 개인 맞춤형 상담을 제공하는 서비스를 제안합니다.

### 기획 의도
- 🏢 **지역 맞춤형** - 춘천시 특화 정보와 정책 데이터 활용
- 🤖 **AI 기반** - OpenAI GPT를 활용한 전문가 수준 상담 구현
- 🎯 **원스톱 서비스** - 창업 전 과정을 하나의 플랫폼에서 지원
- ⏰ **접근성** - 24시간 언제든 이용 가능한 AI 상담

---

## ✨ 주요 기능 (구현 완료)

**🤖 AI 창업 상담**
- 4개 전문 분야 AI 상담사 구현 (재무/정책/마케팅/기술)
- 춘천시 특화 프롬프트 기반 맞춤형 조언
- 실시간 채팅 인터페이스

**📚 창업 정보 허브**
- 춘천시 창업 지원 정책 정보 정리
- 업종별 창업 가이드 및 성공 사례
- 상권 분석 샘플 데이터 제공

**🛠️ 문서 생성 도구**
- AI 기반 사업계획서 자동 생성 기능
- 정책 지원금 신청서 템플릿
- PDF 내보내기 기능

**📊 성공 예측 대시보드**
- 창업 성향 분석 및 성공률 예측
- 진행 상황 추적 인터페이스
- 춘천시 창업 트렌드 시각화

---

## 🛠️ 기술 스택

**Frontend**
- Next.js 15.3.3, TypeScript
- Tailwind CSS, Radix UI
- Recharts (데이터 시각화)

**Backend & AI**
- Next.js API Routes
- OpenAI GPT-4 API
- React Markdown

---

## 🚀 로컬 실행 방법

### 사전 요구사항
- Node.js 18.0+
- OpenAI API 키 (테스트용)

### 실행 절차

```bash
# 저장소 클론
git clone https://github.com/your-username/blue-ming.git
cd blue-ming

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
```

`.env.local` 파일에 다음 내용을 추가하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

```bash
# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 접속

---

## 📁 프로젝트 구조

```
blue-ming/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/         # API 라우트 (AI 상담, 문서 생성)
│   │   ├── chat/        # AI 상담 페이지
│   │   ├── dashboard/   # 대시보드
│   │   ├── info/        # 정보 허브
│   │   └── tools/       # 문서 생성 도구
│   ├── components/      # 재사용 컴포넌트
│   └── lib/            # 유틸리티 및 데이터
├── public/             # 정적 파일
└── package.json
```

---

## 🔧 개발 명령어

```bash
npm run dev        # 개발 서버 실행
npm run build      # 프로덕션 빌드
npm start          # 프로덕션 서버 실행
npm run lint       # 코드 품질 검사
```

---

## 💡 주요 구현 사항

**AI 상담 시스템**
- 각 분야별 전문화된 시스템 프롬프트 설정
- 춘천시 특화 정보 반영된 상담 로직
- 대화 히스토리 관리 및 컨텍스트 유지

**사업계획서 생성**
- 사용자 입력 기반 자동 문서 생성
- PDF 변환 및 다운로드 기능
- 템플릿 기반 구조화된 출력

**반응형 UI/UX**
- 모바일 친화적 인터페이스
- 접근성을 고려한 컴포넌트 설계
- 직관적인 네비게이션 구조

---

## 📄 라이선스

본 프로젝트는 MIT 라이선스를 따릅니다. 교육 및 연구 목적으로 자유롭게 활용하실 수 있습니다.

---

## 📞 문의

- **GitHub Issues**: [이슈 제기](https://github.com/your-username/blue-ming/issues)
- **이메일**: support@blue-ming.kr

---

<div align="center">
  <strong>춘천시 청년 창업 생태계 발전을 위한 기술적 제안 🚀</strong>
</div>
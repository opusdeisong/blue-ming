import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { businessInfo } = await req.json();
    
    const {
      businessName,
      businessType,
      targetMarket,
      budget,
      location,
      description
    } = businessInfo;

    const systemPrompt = `당신은 춘천시 창업 생태계 전문 사업계획서 작성 AI입니다.

다음 요구사항에 맞춰 전문적인 사업계획서를 **마크다운 형식**으로 작성해주세요:

1. 춘천시 지역 특성과 시장 환경을 반영
2. 실제 데이터와 통계에 기반한 분석
3. 구체적이고 실행 가능한 계획
4. 투자자나 정책자금 심사관이 검토하기에 적합한 수준
5. 춘천시 지원 정책과 연계 방안 포함

**출력 형식: 마크다운(Markdown)**
- 제목은 # ## ### 형태로 구조화
- 중요한 내용은 **굵게** 표시
- 목록은 - 또는 1. 2. 3. 형태로 작성
- 표가 필요한 경우 마크다운 테이블 형식 사용

사업계획서 구성:
# 사업 개요
## 시장 분석 (춘천 지역 특화)
## 사업 모델
## 마케팅 전략
## 운영 계획
## 재무 계획
## 위험 분석 및 대응 방안
## 춘천시 정책 활용 방안

각 섹션은 구체적이고 실무적으로 작성하되, **반드시 마크다운 형식**으로 출력해주세요.`;

    const userPrompt = `다음 정보로 사업계획서를 **마크다운 형식**으로 작성해주세요:

**사업명**: ${businessName}
**사업 분야**: ${businessType}
**타겟 시장**: ${targetMarket}
**예상 예산**: ${budget}
**위치**: ${location}
**사업 설명**: ${description}

춘천시 지역 특성을 고려한 전문적인 사업계획서를 **마크다운 형식**으로 완전히 작성해주세요. 중간에 끊기지 않도록 충분히 상세하게 작성해주세요.`;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        businessPlan: generateMockBusinessPlan(businessInfo),
        isSimulation: true
      });
    }

          const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini", // 빠른 성능을 위해 mini 모델 사용
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 4096, // 모델 지원 범위에 맞춰 조정
        temperature: 0.7,
      });

    const businessPlan = completion.choices[0]?.message?.content;
    if (!businessPlan) {
      throw new Error('사업계획서를 생성할 수 없습니다.');
    }

    return NextResponse.json({ businessPlan });

  } catch (error: unknown) {
    console.error('사업계획서 생성 오류:', error);
    
    if (error instanceof Error && 'status' in error && (error as { status: number }).status === 401) {
      return NextResponse.json({ 
        error: 'OpenAI API 키가 유효하지 않습니다.' 
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: '사업계획서 생성 중 오류가 발생했습니다.' 
    }, { status: 500 });
  }
}

interface BusinessInfo {
  businessName: string;
  businessType: string;
  targetMarket: string;
  budget: string;
  location?: string;
  description: string;
}

function generateMockBusinessPlan(businessInfo: BusinessInfo): string {
  return `# ${businessInfo.businessName} 사업계획서

## 1. 사업 개요

### 1.1 사업명
**${businessInfo.businessName}**

### 1.2 사업 분야
**${businessInfo.businessType}**

### 1.3 사업 위치
**${businessInfo.location || '춘천시'}**

### 1.4 사업 개요
${businessInfo.description}

## 2. 시장 분석

### 2.1 춘천시 지역 시장 현황
- **춘천시 인구**: 약 28만명 (2024년 기준)
- **대학생 인구**: 약 3만명 (강원대, 한림대, 춘천교대)
- **연간 관광객**: 약 800만명
- **주요 상권**: 명동거리, 석사동, 온의동 신시가지

### 2.2 타겟 시장
**${businessInfo.targetMarket}**

### 2.3 경쟁 분석
춘천 지역 내 유사 업종 분석 및 차별화 전략이 필요합니다.

| 구분 | 현황 | 기회요소 |
|------|------|----------|
| 기존 업체 수 | 중간 수준 | 차별화 가능 |
| 시장 포화도 | 보통 | 신규 진입 여지 |
| 고객 수요 | 꾸준함 | 성장 잠재력 |

## 3. 사업 모델

### 3.1 수익 모델
- **주요 수익원**: 핵심 서비스/제품 판매
- **부가 수익원**: 추가 서비스 및 상품
- **가격 전략**: 경쟁력 있는 가격 정책

### 3.2 운영 방식
- **운영 시간**: 고객 니즈에 맞춘 최적화
- **인력 구성**: 효율적인 팀 구성
- **서비스 프로세스**: 체계적인 운영 방식

## 4. 마케팅 전략

### 4.1 춘천 지역 특화 마케팅
- **대학가 마케팅**: 학생 할인, 캠퍼스 이벤트
- **관광객 대상**: 여행 패키지, SNS 홍보
- **지역 커뮤니티**: 주민 참여 프로그램

### 4.2 온라인 마케팅
- **SNS 마케팅**: 인스타그램, 페이스북 활용
- **디지털 플랫폼**: 배달앱, 예약 시스템
- **콘텐츠 마케팅**: 블로그, 유튜브 채널

## 5. 재무 계획

### 5.1 초기 투자비용
**예상 총 투자비용**: ${businessInfo.budget}

| 항목 | 예상 비용 | 비율 |
|------|-----------|------|
| 시설비 | 40% | 인테리어, 장비 |
| 운영비 | 30% | 임대료, 인건비 |
| 마케팅비 | 20% | 홍보, 광고 |
| 예비비 | 10% | 비상 자금 |

### 5.2 손익 계획
- **1년차 목표 매출**: 상세 분석 필요
- **손익분기점**: 창업 후 8-12개월 예상
- **3년 재무 전망**: 안정적 성장 목표

## 6. 위험 분석 및 대응 방안

### 6.1 주요 위험 요소
- **시장 위험**: 경기 변동, 소비 패턴 변화
- **운영 위험**: 인력 관리, 품질 관리
- **재무 위험**: 현금 흐름, 자금 조달

### 6.2 대응 방안
각 위험에 대한 구체적 대응 계획을 수립하여 사업 안정성을 확보합니다.

## 7. 춘천시 정책 활용 방안

### 7.1 활용 가능한 지원 정책
- **청년창업 지원금**: 최대 1,000만원
- **창업공간 지원 프로그램**: 임대료 지원
- **강원도 지역혁신 사업**: 기술 개발 지원

### 7.2 신청 계획
| 정책명 | 신청 시기 | 지원 내용 | 우선순위 |
|--------|-----------|-----------|----------|
| 청년창업지원금 | 1분기 | 1,000만원 | 높음 |
| 창업공간지원 | 2분기 | 임대료 50% | 중간 |
| 기술개발지원 | 3분기 | R&D 자금 | 낮음 |

---

**본 사업계획서는 AI가 생성한 기본 템플릿입니다. 실제 사업 추진 시 상세한 시장조사와 전문가 검토가 필요합니다.**`;
} 
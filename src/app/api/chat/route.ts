import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function getSystemPrompt(agentType: string): string {
  const systemPrompts: Record<string, string> = {
    '재무': `당신은 춘천시 창업 생태계에 특화된 재무 전문가 AI 'Blue-ming Finance'입니다.

전문 분야:
- 춘천시 청년 창업 지원금 (최대 1,000만원) 및 지역 특화 정책 활용
- 강원도 및 중앙정부 창업 지원 프로그램 연계
- 춘천 지역 특성 (관광업, 대학가, 음식업 등)을 고려한 업종별 재무 계획
- 투자 유치, 크라우드펀딩, 정책자금 조달 전략
- 손익분기점, ROI, 현금흐름 분석

**응답 스타일:**
- 친근하고 대화하는 듯한 톤으로 답변
- 마크다운 형식(#, ##, **, *, -, |) 사용 금지
- 자연스러운 문장으로 정보 전달
- 단락 구분은 빈 줄로만 처리
- 궁금한 점이 있으면 편하게 물어보라고 격려

답변 시 반드시:
1. 춘천시 구체적 데이터와 정책을 우선 언급
2. 실제 법률과 규정에 근거한 정확한 정보 제공
3. 단계별 실행 가능한 액션 플랜 제시
4. 춘천 지역 창업 성공 사례 및 시장 동향 반영`,

    '정책': `당신은 춘천시 창업 지원 정책 전문가 AI 'Blue-ming Policy'입니다.

전문 분야:
- 춘천시청 창업 지원 정책 (청년창업 지원금, 창업공간 지원 등)
- K-스타트업, 중소벤처기업부 정책자금
- 강원도 특구 및 지역혁신 프로그램
- 사업자등록, 각종 인허가 절차
- 창업 관련 세제 혜택 및 규제 사항

**응답 스타일:**
- 친근하고 대화하는 듯한 톤으로 답변
- 마크다운 형식(#, ##, **, *, -, |) 사용 금지
- 자연스러운 문장으로 정보 전달
- 단락 구분은 빈 줄로만 처리
- 궁금한 점이 있으면 편하게 물어보라고 격려

답변 시 반드시:
1. 최신 정책 정보와 신청 기간, 조건을 정확히 안내
2. 춘천시청 및 관련 기관 연락처 제공
3. 신청 서류 및 절차를 단계별로 설명
4. 정책 우선순위와 전략적 신청 방법 제안
5. 실제 법령과 고시에 근거한 신뢰할 수 있는 정보만 제공`,

    '마케팅': `당신은 춘천시 지역 특화 마케팅 전문가 AI 'Blue-ming Marketing'입니다.

전문 분야:
- 춘천 지역 특성 활용 마케팅 (닭갈비, 막국수, 소양호, 남이섬 등)
- 대학가 타겟 마케팅 (강원대, 한림대, 춘천교대 등)
- 관광객 대상 비즈니스 모델 및 마케팅 전략
- 로컬 브랜딩 및 지역 커뮤니티 마케팅
- 디지털 마케팅, SNS 활용, 온라인 진출 전략

**응답 스타일:**
- 친근하고 대화하는 듯한 톤으로 답변
- 마크다운 형식(#, ##, **, *, -, |) 사용 금지
- 자연스러운 문장으로 정보 전달
- 단락 구분은 빈 줄로만 처리
- 궁금한 점이 있으면 편하게 물어보라고 격려

답변 시 반드시:
1. 춘천의 지역적 특색과 문화를 마케팅에 활용하는 구체적 방안
2. 예산 효율적인 마케팅 전략 (스타트업 현실 고려)
3. 춘천 지역 미디어 및 채널 활용 방법
4. 타겟 고객별 차별화된 접근 전략
5. 측정 가능한 KPI와 성과 지표 제시`,

    '기술': `당신은 춘천시 IT 창업 전문가 AI 'Blue-ming Tech'입니다.

전문 분야:
- 강원도 디지털 혁신 정책 및 스마트시티 사업 연계
- MVP 개발, 기술 스택 선정, 개발팀 구성
- 클라우드 서비스, 개인정보보호법, 정보통신망법 준수
- 춘천/강원 지역 IT 인력 채용 및 개발 생태계
- 스타트업 기술 검증, 특허, 지식재산권

**응답 스타일:**
- 친근하고 대화하는 듯한 톤으로 답변
- 마크다운 형식(#, ##, **, *, -, |) 사용 금지
- 자연스러운 문장으로 정보 전달
- 단락 구분은 빈 줄로만 처리
- 궁금한 점이 있으면 편하게 물어보라고 격려

답변 시 반드시:
1. 국내 법규 (개인정보보호법, 정보통신망법 등) 준수 방안
2. 춘천/강원 지역 IT 인프라 및 지원 시설 활용 방법
3. 현실적이고 실행 가능한 기술 솔루션
4. 스타트업 단계별 기술 개발 로드맵
5. 비용 효율적인 개발 방법론 및 도구 추천`
  }
  return systemPrompts[agentType as keyof typeof systemPrompts] || systemPrompts['정책']
}

export async function POST(req: NextRequest) {
  try {
    const { message, agentType } = await req.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // API 키가 없는 경우 바로 시뮬레이션 응답 반환
    if (!process.env.OPENAI_API_KEY) {
      return handleSimulation(agentType)
    }
    
    try {
      const systemPrompt = getSystemPrompt(agentType)

      const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini", // 빠른 성능을 위해 mini 모델 사용
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 4096, // 적절한 응답 길이로 조정
        temperature: 0.7,
      })

      const response = completion.choices[0]?.message?.content || '죄송합니다. 응답을 생성할 수 없습니다.'

      return NextResponse.json({
        content: response,
        agentType: agentType || '정책'
      })

    } catch (error) {
      console.error('OpenAI API Error:', error)
      
      if (error instanceof OpenAI.APIError && error.status === 401) {
        return NextResponse.json({
          content: "OpenAI API 키가 유효하지 않습니다. .env.local 파일을 확인하고 서버를 재시작해주세요.",
          agentType: agentType || '정책',
          isError: true,
        }, { status: 401 })
      }

      return NextResponse.json({
        content: "API 호출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        agentType: agentType || '정책',
        isError: true,
      }, { status: 500 })
    }
  } catch (error) {
    console.error('API 라우트 오류:', error)
    return NextResponse.json({ 
      error: '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
    }, { status: 500 })
  }
}

function handleSimulation(agentType: string) {
  const fallbackResponses = {
    '재무': '안녕하세요! 춘천시 청년 창업 지원금을 활용하시면 최대 1,000만원까지 지원받을 수 있어요. 카페 창업을 예로 들면 총 2,500만원 정도가 필요한데, 지원금을 받으시면 자기자본은 1,500만원 정도만 준비하시면 됩니다. 재무 계획에 대해 더 궁금한 점이 있으시면 언제든 물어봐 주세요!',
    '정책': '안녕하세요! 춘천시에서는 청년 창업자분들을 위해 정말 다양한 지원 정책을 운영하고 있어요. 창업 지원금은 연중 상시로 신청할 수 있고, 만 18세부터 39세까지의 청년이 대상입니다. 공간 지원이나 교육 프로그램도 있으니까 단계별로 활용하실 수 있을 거예요. 어떤 정책이 가장 궁금하신가요?',
    '마케팅': '안녕하세요! 춘천 지역은 SNS 마케팅이 정말 효과적이에요. 특히 인스타그램이나 네이버 블로그로 로컬 마케팅을 하시면 좋을 것 같아요. 춘천 닭갈비나 막국수 같은 지역 특산품과 연계해서 메뉴를 개발하시면 차별화도 되고요. 관광객들한테도 어필할 수 있을 거예요. 구체적으로 어떤 업종으로 창업 준비하고 계신가요?',
    '기술': '안녕하세요! 춘천에서 IT 창업을 준비하고 계시는군요. 강원도에서도 디지털 혁신 정책들을 많이 지원하고 있어서 좋은 기회가 많을 거예요. MVP 개발부터 시작해서 기술 스택 선정, 개발팀 구성까지 단계별로 도와드릴 수 있어요. 어떤 서비스나 제품을 개발하려고 하시는지 좀 더 자세히 얘기해 주시면 더 구체적인 조언을 드릴 수 있을 것 같아요!'
  }

  return NextResponse.json({
    content: fallbackResponses[agentType as keyof typeof fallbackResponses] || fallbackResponses['정책'],
    agentType: agentType || '정책',
    isSimulation: true
  })
} 
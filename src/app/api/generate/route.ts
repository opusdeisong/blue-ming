import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { type, formData } = await req.json()

    if (!type || !formData) {
      return NextResponse.json({ error: 'Type and formData are required' }, { status: 400 })
    }

    let prompt = ''
    let systemPrompt = ''

    switch (type) {
      case 'business-plan':
        systemPrompt = '당신은 춘천시 청년 창업 지원을 위한 사업계획서 작성 전문가입니다. 체계적이고 실용적인 사업계획서를 작성해주세요.'
        prompt = `다음 정보를 바탕으로 춘천시 청년 창업을 위한 사업계획서를 작성해주세요:

사업명: ${formData.businessName || '미입력'}
업종: ${formData.businessType || '미입력'}
위치: ${formData.location || '미입력'}
예산: ${formData.budget || '미입력'}
타겟 고객: ${formData.targetMarket || '미입력'}

다음 구조로 작성해주세요:
1. 사업 개요
2. 시장 분석 (춘천시 특성 반영)
3. 타겟 고객 분석
4. 마케팅 전략
5. 재무 계획
6. 리스크 분석
7. 성공 전략`
        break

      case 'brand-generator':
        systemPrompt = '당신은 창의적인 브랜드명 생성 전문가입니다. 춘천 지역 특성을 반영한 기억하기 쉽고 매력적인 브랜드명을 제안해주세요.'
        prompt = `다음 조건으로 브랜드명을 5개 제안해주세요:

업종: ${formData.businessType || '미입력'}
위치: 춘천시 ${formData.location || ''}
컨셉: 청년 창업, 지역 친화적

조건:
- 춘천의 지역적 특성 반영 (소양강, 의암호, 닭갈비, 막국수 등)
- 기억하기 쉽고 발음하기 쉬운 이름
- 젊은 층에게 어필하는 모던한 감성
- 각 브랜드명에 대한 간단한 설명 포함`
        break

      case 'marketing':
        systemPrompt = '당신은 춘천시 지역 마케팅 전문가입니다. 청년 창업자를 위한 실용적이고 비용 효율적인 마케팅 콘텐츠를 제작해주세요.'
        prompt = `다음 정보를 바탕으로 마케팅 콘텐츠를 생성해주세요:

사업명: ${formData.businessName || '우리 브랜드'}
업종: ${formData.businessType || '미입력'}
위치: 춘천시 ${formData.location || ''}
타겟 고객: ${formData.targetMarket || '일반 고객'}

다음을 포함해주세요:
1. 인스타그램 게시물 아이디어 (2-3개)
2. 마케팅 슬로건 (3-5개)
3. SNS 해시태그 전략
4. 지역 특색을 활용한 마케팅 아이디어`
        break

      case 'prediction':
        systemPrompt = '당신은 창업 성공률 분석 전문가입니다. 데이터 기반으로 객관적이고 구체적인 분석을 제공해주세요.'
        prompt = `다음 정보를 바탕으로 창업 성공 예측 분석을 해주세요:

업종: ${formData.businessType || '미입력'}
위치: 춘천시 ${formData.location || ''}
예산: ${formData.budget || '미입력'}
타겟 고객: ${formData.targetMarket || '미입력'}

다음을 포함해주세요:
1. 종합 성공률 (60-90% 범위)
2. 분석 요소별 점수 (위치, 업종 적합성, 자금 계획, 시장 경쟁력)
3. 주요 리스크 요인 3가지
4. 성공률 향상 방안 4가지
5. 구체적인 개선 제안`
        break

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4096,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || '죄송합니다. 콘텐츠를 생성할 수 없습니다.'

    return NextResponse.json({
      content: response,
      type: type
    })

  } catch (error) {
    console.error('OpenAI API Error:', error)
    
    // API 키가 없거나 오류가 발생한 경우 시뮬레이션 응답 반환
    const fallbackResponses = {
      'business-plan': `# 새로운 창업 사업계획서

## 1. 사업 개요
**사업명**: 미입력
**업종**: 미입력
**위치**: 미입력
**예상 투자금**: 미입력

## 2. 시장 분석
춘천시에서 선택된 업종은 안정적인 수요가 예상됩니다.

## 3. 타겟 고객
주요 타겟: 일반 고객

## 4. 마케팅 전략
- SNS 마케팅 활용
- 지역 특색 반영한 서비스 개발

## 5. 재무 계획
**초기 투자비**: 미입력
**예상 손익분기점**: 창업 후 8-12개월`,

      'brand-generator': `# 창업 브랜드명 추천

## 추천 브랜드명:
1. **춘천의 맛**
2. **소양강 카페**
3. **블루밍 스토어**
4. **호수가 브랜드**

## 브랜드 컨셉:
- 춘천 지역성 반영
- 청년 친화적 네이밍
- 기억하기 쉬운 이름`,

      'marketing': `# 우리 브랜드 마케팅 콘텐츠

## 인스타그램 게시물:
1. "춘천에 새로운 창업이 오픈했어요! 🎉"
2. "지역 특산품을 활용한 특별한 메뉴 소개"

## 마케팅 슬로건:
- "춘천에서 시작된 청년의 꿈"
- "소양강처럼 자연스럽게"

## SNS 해시태그:
#춘천 #청년창업 #신규오픈`,

      'prediction': `# 창업 성공 예측 분석

## 종합 성공률: 75%

### 분석 요소별 점수:
- **위치 분석**: 85점
- **업종 적합성**: 80점  
- **자금 계획**: 75점
- **시장 경쟁력**: 70점

### 주요 리스크:
1. 계절적 매출 변동
2. 임대료 상승 위험
3. 경쟁 업체 증가

### 성공률 향상 방안:
1. 지역 특화 서비스 개발
2. SNS 마케팅 강화
3. 고객 서비스 차별화
4. 춘천시 지원 정책 활용`
    }

    // 요청 본문을 다시 파싱하여 type 얻기
    const requestBody = await req.json().catch(() => ({ type: 'business-plan' }))
    const requestType = requestBody.type || 'business-plan'

    return NextResponse.json({
      content: fallbackResponses[requestType as keyof typeof fallbackResponses] || fallbackResponses['business-plan'],
      type: requestType,
      isSimulation: true
    })
  }
} 
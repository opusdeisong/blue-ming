export interface Policy {
  id: string
  name: string
  amount: string
  conditions: string[]
  applicationPeriod: string
  category: string
  description: string
}

export interface BusinessArea {
  type: string
  percentage: number
  averageStartupCost: string
  successRate: string
  description: string
}

export interface Location {
  name: string
  footTraffic: string
  rentCost: string
  recommendedBusiness: string[]
  description: string
}

export interface AgentResponse {
  agentType: string
  response: string
  suggestions?: string[]
}

export const policies: Policy[] = [
  {
    id: "youth-startup-fund",
    name: "춘천시 청년 창업 지원금",
    amount: "최대 1,000만원",
    conditions: ["만 18-39세", "춘천시 거주", "창업 1년 이내"],
    applicationPeriod: "연중 상시",
    category: "자금지원",
    description: "청년 창업자의 초기 자금 부담을 줄이기 위한 지원 정책입니다."
  },
  {
    id: "startup-space",
    name: "청년 창업 공간 지원",
    amount: "임대료 50% 지원",
    conditions: ["만 18-39세", "춘천시 내 창업", "사업계획서 제출"],
    applicationPeriod: "분기별 모집",
    category: "공간지원",
    description: "창업 초기 사무공간 확보를 위한 임대료 지원 프로그램입니다."
  },
  {
    id: "education-program",
    name: "창업 교육 프로그램",
    amount: "무료 교육",
    conditions: ["춘천시 거주", "창업 희망자"],
    applicationPeriod: "월 1회 개강",
    category: "교육지원",
    description: "체계적인 창업 교육을 통한 성공률 향상 프로그램입니다."
  }
]

export const businessAreas: BusinessArea[] = [
  {
    type: "한식음식점",
    percentage: 17.6,
    averageStartupCost: "3,000만원",
    successRate: "65%",
    description: "춘천의 대표적인 창업 분야로 안정적인 수요를 보입니다."
  },
  {
    type: "커피/음료점",
    percentage: 3.7,
    averageStartupCost: "2,500만원",
    successRate: "58%",
    description: "젊은 층을 타겟으로 한 카페 창업이 인기입니다."
  },
  {
    type: "치킨/패스트푸드",
    percentage: 8.2,
    averageStartupCost: "2,000만원",
    successRate: "72%",
    description: "프랜차이즈 중심의 안정적인 사업 모델입니다."
  },
  {
    type: "편의점/소매업",
    percentage: 12.4,
    averageStartupCost: "1,500만원",
    successRate: "78%",
    description: "지역 밀착형 사업으로 꾸준한 수익을 기대할 수 있습니다."
  }
]

export const locations: Location[] = [
  {
    name: "명동거리",
    footTraffic: "높음",
    rentCost: "월 200만원",
    recommendedBusiness: ["카페", "음식점", "의류매장"],
    description: "춘천의 대표적인 상권으로 유동인구가 많습니다."
  },
  {
    name: "석사동 상권",
    footTraffic: "보통",
    rentCost: "월 120만원",
    recommendedBusiness: ["편의점", "치킨집", "학원"],
    description: "대학가 주변으로 젊은 층 고객이 많습니다."
  },
  {
    name: "온의동 신시가지",
    footTraffic: "높음",
    rentCost: "월 180만원",
    recommendedBusiness: ["카페", "레스토랑", "뷰티샵"],
    description: "신규 개발지역으로 성장 가능성이 높습니다."
  }
]

export const aiScenarios = {
  "재무": {
    responses: [
      "춘천시 청년 창업 지원금을 활용하시면 최대 1,000만원까지 지원받을 수 있습니다. 카페 창업의 경우 평균 2,500만원이 필요하므로, 자기자본 1,500만원 정도 준비하시는 것을 권장합니다.",
      "창업 초기 운영자금은 최소 6개월치를 확보하시는 것이 좋습니다. 월 고정비를 계산해보면 임대료, 인건비, 재료비 등을 포함해 월 300-400만원 정도 예상됩니다.",
      "매출 예측은 위치와 타겟 고객에 따라 달라집니다. 명동거리의 경우 일 평균 50-80만원, 월 1,500-2,400만원 정도의 매출을 기대할 수 있습니다."
    ]
  },
  "정책": {
    responses: [
      "춘천시에서는 청년 창업자를 위한 다양한 지원 정책을 운영하고 있습니다. 창업 지원금 외에도 공간 지원, 교육 프로그램 등이 있어 단계별로 활용하실 수 있습니다.",
      "창업 교육 프로그램은 매월 개강하며, 사업계획서 작성부터 마케팅, 회계까지 체계적으로 학습할 수 있습니다. 수료 시 창업 지원금 신청에도 유리합니다.",
      "청년 창업 공간 지원 프로그램을 통해 임대료의 50%를 지원받을 수 있습니다. 분기별로 모집하니 미리 사업계획서를 준비해두시기 바랍니다."
    ]
  },
  "마케팅": {
    responses: [
      "춘천 지역 특성상 SNS 마케팅이 효과적입니다. 특히 인스타그램과 네이버 블로그를 활용한 로컬 마케팅을 추천드립니다.",
      "춘천 닭갈비, 막국수 등 지역 특산품과 연계한 메뉴 개발로 차별화를 꾀할 수 있습니다. 관광객 대상 마케팅도 고려해보세요.",
      "대학생이 많은 지역 특성을 활용해 학생 할인, 단체 이벤트 등을 기획하면 고정 고객 확보에 도움이 됩니다."
    ]
  },
  "법무": {
    responses: [
      "음식점 창업 시 필요한 허가는 일반음식점 신고, 건물 용도 확인, 상호명 신고 등이 있습니다. 춘천시청 민원실에서 원스톱으로 처리 가능합니다.",
      "사업자등록은 개인사업자 또는 법인으로 할 수 있으며, 초기에는 개인사업자로 시작하는 것이 세무상 유리합니다.",
      "근로자 고용 시 4대보험 가입이 의무이며, 최저임금 준수, 근로계약서 작성 등 노동법을 반드시 준수해야 합니다."
    ]
  }
} 
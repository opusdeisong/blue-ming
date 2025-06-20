'use client'

import { useState } from 'react'
import { Search, MapPin, ExternalLink, CheckCircle, TrendingUp, Users } from 'lucide-react'
import Header from '@/components/Header'
import { policies, businessAreas, locations } from '@/lib/data'

type TabType = 'policies' | 'business' | 'locations' | 'success'

const successStories = [
  {
    name: "카페 '산너머'",
    owner: "김○○ (26세)",
    business: "커피전문점",
    location: "명동거리",
    investment: "2,800만원",
    revenue: "월 2,100만원",
    story: "춘천시 청년 창업 지원금을 받아 시작한 카페가 지역 명소가 되었습니다.",
    tips: ["지역 특색을 살린 메뉴 개발", "SNS 마케팅 적극 활용", "고객과의 소통 중시"]
  },
  {
    name: "맛집 '춘천막국수'",
    owner: "이○○ (29세)",
    business: "한식음식점",
    location: "석사동",
    investment: "3,500만원",
    revenue: "월 2,800만원",
    story: "춘천의 대표 음식인 막국수로 창업하여 관광객들에게 인기를 얻고 있습니다.",
    tips: ["지역 특산품 활용", "관광객 대상 마케팅", "품질 관리 철저"]
  }
]

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState<TabType>('policies')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const tabs = [
    { id: 'policies', label: '정책 정보', icon: CheckCircle },
    { id: 'business', label: '업종 분석', icon: TrendingUp },
    { id: 'locations', label: '상권 정보', icon: MapPin },
    { id: 'success', label: '성공 사례', icon: Users }
  ]

  const filteredPolicies = policies.filter(policy => 
    policy.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || policy.category === selectedCategory)
  )

  const renderPolicies = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="정책 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">전체 카테고리</option>
          <option value="자금지원">자금지원</option>
          <option value="공간지원">공간지원</option>
          <option value="교육지원">교육지원</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredPolicies.map((policy) => (
          <div key={policy.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.name}</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {policy.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{policy.amount}</div>
                <div className="text-sm text-gray-500">{policy.applicationPeriod}</div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{policy.description}</p>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">신청 조건:</h4>
              <ul className="list-disc list-inside space-y-1">
                {policy.conditions.map((condition, index) => (
                  <li key={index} className="text-sm text-gray-600">{condition}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                <span className="text-sm font-medium">자세히 보기</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderBusinessAreas = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {businessAreas.map((area, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{area.type}</h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{area.percentage}%</div>
              <div className="text-xs text-gray-500">시장 점유율</div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{area.description}</p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">평균 창업비용</span>
              <span className="font-medium text-gray-900">{area.averageStartupCost}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">성공률</span>
              <span className="font-medium text-green-600">{area.successRate}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${area.percentage * 5}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderLocations = () => (
    <div className="grid gap-6">
      {locations.map((location, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>{location.name}</span>
              </h3>
              <p className="text-gray-600 mt-2">{location.description}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">{location.rentCost}</div>
              <div className="text-sm text-gray-500">평균 임대료</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">유동인구</h4>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  location.footTraffic === '높음' ? 'bg-green-500' : 
                  location.footTraffic === '보통' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-gray-600">{location.footTraffic}</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">추천 업종</h4>
              <div className="flex flex-wrap gap-2">
                {location.recommendedBusiness.map((business, idx) => (
                  <span key={idx} className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                    {business}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderSuccessStories = () => (
    <div className="grid gap-6">
      {successStories.map((story, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span>창업자: {story.owner}</span>
                <span>업종: {story.business}</span>
                <span>위치: {story.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">{story.revenue}</div>
              <div className="text-sm text-gray-500">월 매출</div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{story.story}</p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">초기 투자금</span>
              <span className="font-medium text-gray-900">{story.investment}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">성공 팁</h4>
            <ul className="list-disc list-inside space-y-1">
              {story.tips.map((tip, idx) => (
                <li key={idx} className="text-sm text-gray-600">{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'policies':
        return renderPolicies()
      case 'business':
        return renderBusinessAreas()
      case 'locations':
        return renderLocations()
      case 'success':
        return renderSuccessStories()
      default:
        return renderPolicies()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">창업 정보 허브</h1>
          <p className="text-gray-600">춘천시 창업에 필요한 모든 정보를 한 곳에서 확인하세요</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="bg-gray-50">
          {renderContent()}
        </div>
      </div>
    </div>
  )
} 
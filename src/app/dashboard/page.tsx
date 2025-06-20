'use client'

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Calendar, CheckCircle, AlertTriangle, Star, Bookmark } from 'lucide-react'
import Header from '@/components/Header'

const successData = [
  { name: '1월', 성공률: 65, 신규창업: 12 },
  { name: '2월', 성공률: 68, 신규창업: 15 },
  { name: '3월', 성공률: 72, 신규창업: 18 },
  { name: '4월', 성공률: 75, 신규창업: 22 },
  { name: '5월', 성공률: 78, 신규창업: 25 },
  { name: '6월', 성공률: 81, 신규창업: 28 }
]

const businessTypeData = [
  { name: '한식음식점', value: 35, color: '#3B82F6' },
  { name: '커피/음료점', value: 25, color: '#10B981' },
  { name: '치킨/패스트푸드', value: 20, color: '#F59E0B' },
  { name: '편의점/소매업', value: 20, color: '#8B5CF6' }
]

const personalProgress = [
  { title: '사업계획서 작성', completed: true, date: '2024-01-15' },
  { title: '창업 지원금 신청', completed: true, date: '2024-01-20' },
  { title: '사업자등록', completed: false, date: '2024-02-01' },
  { title: '임대차 계약', completed: false, date: '2024-02-10' },
  { title: '인테리어 공사', completed: false, date: '2024-02-20' }
]

const recommendedPolicies = [
  {
    title: '춘천시 청년 창업 지원금',
    amount: '최대 1,000만원',
    deadline: '2024-03-31',
    match: 95
  },
  {
    title: '청년 창업 공간 지원',
    amount: '임대료 50% 지원',
    deadline: '2024-02-28',
    match: 88
  },
  {
    title: '창업 교육 프로그램',
    amount: '무료 교육',
    deadline: '2024-02-15',
    match: 92
  }
]

const bookmarkedContent = [
  {
    type: '정책',
    title: '춘천시 청년 창업 지원금',
    description: '만 18-39세 청년 대상 창업 자금 지원',
    bookmarkedAt: '2024-01-10'
  },
  {
    type: '상권',
    title: '명동거리 상권 분석',
    description: '유동인구 높음, 월 임대료 200만원',
    bookmarkedAt: '2024-01-12'
  },
  {
    type: '성공사례',
    title: '카페 산너머 성공 스토리',
    description: '청년 창업가의 카페 창업 성공 사례',
    bookmarkedAt: '2024-01-14'
  }
]

export default function DashboardPage() {
  const stats = [
    {
      title: '예상 성공률',
      value: '78%',
      change: '+5%',
      isPositive: true,
      icon: Target,
      description: '업종 및 위치 분석 기반'
    },
    {
      title: '창업 준비도',
      value: '40%',
      change: '+10%',
      isPositive: true,
      icon: CheckCircle,
      description: '5단계 중 2단계 완료'
    },
    {
      title: '매칭 정책 수',
      value: '3개',
      change: '+1개',
      isPositive: true,
      icon: Users,
      description: '신청 가능한 지원 정책'
    },
    {
      title: '예상 초기 투자',
      value: '2,800만원',
      change: '±0%',
      isPositive: null,
      icon: DollarSign,
      description: '카페 창업 기준'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">창업 대시보드</h1>
          <p className="text-gray-600">개인화된 창업 진행 상황과 추천 정보를 확인하세요</p>
        </div>

        {/* 주요 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.isPositive === true ? 'text-green-600' : 
                  stat.isPositive === false ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.isPositive === true && <TrendingUp className="w-4 h-4" />}
                  {stat.isPositive === false && <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-gray-900 mb-1">{stat.title}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 왼쪽 컬럼 */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 춘천시 창업 성공률 트렌드 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">춘천시 창업 성공률 트렌드</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={successData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="성공률" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="신규창업" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 업종별 창업 현황 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">업종별 창업 현황</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={businessTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {businessTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {businessTypeData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 창업 진행 상황 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">나의 창업 진행 상황</h3>
              <div className="space-y-4">
                {personalProgress.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${
                        item.completed ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">예정일: {item.date}</div>
                    </div>
                    {!item.completed && (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">전체 진행률</span>
                  <span className="font-medium text-gray-900">40% (2/5 완료)</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="space-y-8">
            
            {/* 추천 정책 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">맞춤 추천 정책</h3>
              <div className="space-y-4">
                {recommendedPolicies.map((policy, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{policy.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs text-gray-600">{policy.match}%</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{policy.amount}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">마감: {policy.deadline}</span>
                      <button className="text-xs text-blue-600 hover:text-blue-800">신청하기</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 북마크한 정보 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">북마크한 정보</h3>
              <div className="space-y-4">
                {bookmarkedContent.map((item, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          {item.type}
                        </span>
                        <h4 className="font-medium text-gray-900 text-sm mt-1">{item.title}</h4>
                      </div>
                      <Bookmark className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                    <div className="text-xs text-gray-500">저장: {item.bookmarkedAt}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 다음 액션 아이템 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">다음 할 일</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <div>
                    <div className="font-medium">사업자등록 신청</div>
                    <div className="text-sm text-blue-100">예정일: 2024-02-01</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5" />
                  <div>
                    <div className="font-medium">창업 교육 프로그램 신청</div>
                    <div className="text-sm text-blue-100">마감일: 2024-02-15</div>
                  </div>
                </div>
              </div>
              <button className="mt-4 w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                액션 아이템 확인하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
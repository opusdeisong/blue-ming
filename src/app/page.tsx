'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MessageCircle, Info, Wrench, BarChart3, Target, Users, TrendingUp, Building2, Lightbulb, Utensils, Coffee, ShoppingCart, Drama, Mic, Star, ArrowRight, Sparkles, Zap, Shield, Clock } from 'lucide-react'
import Header from '@/components/Header'
import { businessAreas } from '@/lib/data'

const areaIcons: { [key: string]: React.ElementType } = {
  '요식업': Utensils,
  '카페': Coffee,
  '도소매': ShoppingCart,
  '문화/예술': Drama,
  '기타': Mic,
}

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: '김민준',
      business: '춘천 브런치 카페',
      content: 'Blue-ming의 AI 상담으로 사업계획을 완성했어요. 정말 든든한 창업 파트너예요!',
      rating: 5
    },
    {
      name: '이서연',
      business: '핸드메이드 공방',
      content: '정책 정보부터 마케팅까지, 한 곳에서 모든 걸 해결할 수 있어서 너무 좋아요.',
      rating: 5
    },
    {
      name: '박준호',
      business: 'IT 스타트업',
      content: '기술 전문가 AI와 상담하면서 개발 방향을 명확히 할 수 있었습니다.',
      rating: 5
    }
  ]

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(testimonialInterval)
  }, [testimonials.length])

  const features = [
    {
      icon: MessageCircle,
      title: 'AI 창업 상담',
      description: '재무, 정책, 마케팅, 기술 전문가 AI와 실시간 상담',
      href: '/chat',
      color: 'bg-blue-500',
      highlight: 'AI 기반'
    },
    {
      icon: Info,
      title: '창업 정보 허브',
      description: '춘천시 특화 정보와 업종별 가이드 제공',
      href: '/info',
      color: 'bg-emerald-500',
      highlight: '지역 특화'
    },
    {
      icon: Wrench,
      title: '문서 생성 도구',
      description: '사업계획서, 지원금 신청서 자동 생성',
      href: '/tools',
      color: 'bg-indigo-500',
      highlight: '자동 생성'
    },
    {
      icon: BarChart3,
      title: '성공 예측 분석',
      description: 'AI 기반 창업 성공률 분석 및 개선 제안',
      href: '/dashboard',
      color: 'bg-teal-500',
      highlight: '예측 분석'
    }
  ]

  const stats = [
    { label: '지원 정책 수', value: '12+', icon: Target, color: 'text-blue-600' },
    { label: '창업 성공률', value: '78%', icon: TrendingUp, color: 'text-emerald-600' },
    { label: '지원 업종', value: '20+', icon: Building2, color: 'text-indigo-600' },
    { label: '상담 만족도', value: '95%', icon: Users, color: 'text-teal-600' }
  ]

  const benefits = [
    {
      icon: Zap,
      title: '빠른 시작',
      description: '복잡한 절차 없이 바로 시작하는 창업 여정'
    },
    {
      icon: Shield,
      title: '안전한 정보',
      description: '검증된 정책과 전문가 지식 기반'
    },
    {
      icon: Clock,
      title: '24/7 지원',
      description: '언제든 필요할 때 AI 상담 이용 가능'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gray-50">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="transition-all duration-1000 opacity-100 translate-y-0">
            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex items-center bg-blue-50 border border-blue-100 rounded-full px-6 py-3">
                <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">AI 기반 창업 컨설팅 플랫폼</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              춘천시 청년 창업
              <br />
              <span className="text-4xl md:text-6xl text-blue-600">
                Blue-ming과 함께
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-600 leading-relaxed">
              AI 전문가와 함께하는 스마트한 창업 여정
              <br />
              <span className="text-gray-900 font-medium">성공적인 창업을 위한 모든 것이 여기에</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <MessageCircle className="w-6 h-6 mr-2" />
                AI 컨설팅 시작하기
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link href="/info" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 border-2 border-gray-300 rounded-full hover:border-blue-300 hover:text-blue-600 transition-all duration-300">
                <Info className="w-6 h-6 mr-2" />
                정보 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-emerald-50 border border-emerald-100 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
              <span className="text-emerald-700 font-medium">핵심 기능</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              창업 성공을 위한
              <br />
              <span className="text-blue-600">완벽한 솔루션</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI 기술과 전문 지식이 결합된 차세대 창업 지원 플랫폼
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href} className="group">
                <div className="relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                  {/* Highlight Badge */}
                  <div className="absolute top-4 right-4 bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-semibold border border-blue-100">
                    {feature.highlight}
                  </div>
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                숫자로 보는 Blue-ming
              </h2>
              <p className="text-gray-600 text-lg">실제 성과와 만족도로 입증된 신뢰성</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl mb-4 group-hover:bg-blue-50 transition-colors border border-gray-100">
                    <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              창업자들의 <span className="text-emerald-600">생생한 후기</span>
            </h2>
            <p className="text-xl text-gray-600">실제 사용자들이 경험한 Blue-ming의 가치</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-light text-gray-700 mb-8 leading-relaxed">
                  &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                </blockquote>
                
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-blue-600 font-medium">
                      {testimonials[currentTestimonial].business}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 group-hover:bg-emerald-600 transition-colors shadow-lg">
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Areas Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              춘천시 <span className="text-emerald-600">주요 창업 분야</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              춘천의 특색을 살린 유망 창업 분야를 탐색하고 새로운 기회를 발견하세요
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {businessAreas.map((area, index) => {
              const Icon = areaIcons[area.type] || Mic;
              return (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-emerald-500 group-hover:bg-blue-500 transition-colors">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {area.type}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      성공률 {area.successRate}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            이제, 당신의 아이디어를
            <br />
            <span className="text-emerald-300">현실로 만들 시간입니다</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-100">
            Blue-ming과 함께 성공적인 첫 걸음을 내딛어보세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard" className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <BarChart3 className="w-6 h-6 mr-2" />
              대시보드 시작하기
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="/tools" className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300">
              <Wrench className="w-6 h-6 mr-2" />
              사업계획서 생성
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-white">Blue-ming</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                춘천시 청년 창업을 위한 AI 기반 종합 플랫폼으로, 성공적인 창업 여정을 함께합니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">주요 기능</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/chat" className="hover:text-white transition-colors">AI 창업 상담</Link></li>
                <li><Link href="/info" className="hover:text-white transition-colors">정보 허브</Link></li>
                <li><Link href="/tools" className="hover:text-white transition-colors">문서 생성</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">성공 분석</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">지원 분야</h3>
              <ul className="space-y-2 text-gray-400">
                <li>재무 계획</li>
                <li>정책 활용</li>
                <li>마케팅 전략</li>
                <li>기술 개발</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                © 2024 Blue-ming. 춘천시 청년 창업 지원 플랫폼
              </div>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">이용약관</a>
                <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                <a href="#" className="hover:text-white transition-colors">문의하기</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

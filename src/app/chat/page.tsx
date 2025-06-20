'use client'

import { useState, useRef, useEffect } from 'react'
import { User, ChevronLeft, Sparkles, DollarSign, FileText, TrendingUp, Code } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

type AgentType = '재무' | '정책' | '마케팅' | '기술'
type Message = {
  id: string
  sender: 'user' | 'ai'
  text: string
  timestamp: Date
  agentType?: AgentType
}

const agentConfig = {
  '재무': { 
    icon: DollarSign, 
    color: 'bg-emerald-500', 
    lightColor: 'bg-emerald-50',
    name: '재무 전문가',
    description: '자금 조달, 투자 유치, 재무 계획 전문'
  },
  '정책': { 
    icon: FileText, 
    color: 'bg-blue-500', 
    lightColor: 'bg-blue-50',
    name: '정책 전문가',
    description: '춘천시 지원 정책, 정부 지원금 전문'
  },
  '마케팅': { 
    icon: TrendingUp, 
    color: 'bg-purple-500', 
    lightColor: 'bg-purple-50',
    name: '마케팅 전문가',
    description: '브랜딩, 디지털 마케팅, 고객 개발 전문'
  },
  '기술': { 
    icon: Code, 
    color: 'bg-orange-500', 
    lightColor: 'bg-orange-50',
    name: '기술 전문가',
    description: 'IT 개발, 기술 스택, MVP 구축 전문'
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault()
    const currentText = inputRef.current?.value || ''
    const trimmedInput = currentText.trim()
    if (!trimmedInput || isLoading || !selectedAgent) return

    const userMessage: Message = { 
      id: Date.now().toString(), 
      sender: 'user', 
      text: trimmedInput,
      timestamp: new Date()
    }
    
    setMessages((prev) => [...prev, userMessage])
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput, agentType: selectedAgent }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'API 요청에 실패했습니다.')
      }
      
      const data = await res.json()
      const aiMessage: Message = { 
        id: (Date.now() + 1).toString(),
        sender: 'ai', 
        text: data.content || data.response, 
        agentType: selectedAgent,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, aiMessage])

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      setError(errorMessage)
      const errorMessageObj: Message = { 
        id: (Date.now() + 1).toString(),
        sender: 'ai', 
        text: `죄송합니다. 오류가 발생했습니다: ${errorMessage}`, 
        agentType: selectedAgent,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessageObj])
    } finally {
      setIsLoading(false)
    }
  }

  const AgentSelection = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-brand-blue to-brand-green rounded-3xl mx-auto mb-8 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            어떤 전문가와 상담하시겠어요?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            춘천시 창업 생태계에 특화된 AI 전문가들이 여러분의 창업 여정을 함께 합니다.<br />
            각 분야의 전문 지식과 춘천 지역 특성을 바탕으로 맞춤형 조언을 제공합니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {(Object.keys(agentConfig) as AgentType[]).map((agent) => {
            const config = agentConfig[agent]
            return (
              <button
                key={agent}
                onClick={() => setSelectedAgent(agent)}
                className="group p-8 bg-white border-2 border-gray-200 rounded-3xl hover:border-brand-blue hover:shadow-xl transition-all duration-300 text-left transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 ${config.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <config.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-xl mb-2">
                      {config.name}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {config.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  const ChatInterface = () => {
    if (!selectedAgent) return null
    const agent = agentConfig[selectedAgent]

    return (
      <div className="flex flex-col h-full max-w-6xl mx-auto">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => { setSelectedAgent(null); setMessages([]); setError(null); }}
              className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className={`w-14 h-14 ${agent.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <agent.icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-xl">{agent.name}</h2>
              <p className="text-gray-500 text-base">춘천시 창업 전문 AI 컨설턴트</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-500 font-medium">상담 중</span>
          </div>
        </div>

        {/* Messages Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-16">
                <div className={`w-20 h-20 ${agent.color} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                  <agent.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-2xl mb-4">
                  {agent.name}와의 상담을 시작합니다
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                  춘천시 창업 생태계에 특화된 전문적인 조언을 받아보세요.<br /> 
                  궁금한 점을 자세히 설명해주시면 더 정확한 답변을 드릴 수 있습니다.
                </p>
              </div>
            )}
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end space-x-3 max-w-2xl ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {msg.sender === 'ai' && (
                    <div className={`w-12 h-12 ${agent.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>
                  )}
                  {msg.sender === 'user' && (
                    <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className={`px-6 py-4 rounded-2xl shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-brand-blue text-white' 
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    <p className="text-base whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    <p className={`text-sm mt-2 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-3">
                  <div className={`w-12 h-12 ${agent.color} rounded-full flex items-center justify-center shadow-md`}>
                    <agent.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(e)
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                전송
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex">
        {selectedAgent ? <ChatInterface /> : <AgentSelection />}
      </div>
    </div>
  )
} 
'use client';

import React, { useState, useRef } from 'react';
import { FileText, Download, Loader2, CheckCircle, AlertCircle, Building2, Target, DollarSign, MapPin, PenTool, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


interface BusinessInfo {
  businessName: string;
  businessType: string;
  targetMarket: string;
  budget: string;
  location: string;
  description: string;
}

export default function ToolsPage() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    businessType: '',
    targetMarket: '',
    budget: '',
    location: '춘천시',
    description: ''
  });

  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const businessPlanRef = useRef<HTMLDivElement>(null);

  const businessTypes = [
    '음식점/카페', 'IT/소프트웨어', '소매/유통', '서비스업', 
    '제조업', '관광/레저', '교육/문화', '기타'
  ];

  const budgetRanges = [
    '1천만원 미만', '1천만원~3천만원', '3천만원~5천만원', 
    '5천만원~1억원', '1억원 이상'
  ];

  const handleInputChange = (field: keyof BusinessInfo, value: string) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(false);
  };

  const handleGenerate = async (businessInfo: BusinessInfo) => {
    setIsGenerating(true)
    setError(null)
    setGeneratedPlan('')

    try {
      const response = await fetch('/api/generate-business-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessInfo }),
      })

      if (!response.ok) {
        throw new Error('사업계획서 생성에 실패했습니다.')
      }

      const data = await response.json()
      setGeneratedPlan(data.businessPlan)
    } catch (error: unknown) {
      console.error('Error generating business plan:', error)
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      setError(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  const exportToPDF = async () => {
    if (!generatedPlan) return;

    try {
      // 더 나은 PDF 생성을 위한 HTML 처리
      const pdfContent = generatePDFContent(generatedPlan, businessInfo);
      
      // 새 창에서 PDF 미리보기 생성
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('팝업이 차단되었습니다. 팝업을 허용하고 다시 시도해주세요.');
        return;
      }

      printWindow.document.write(pdfContent);
      printWindow.document.close();
      
      // 페이지 로드 완료 후 인쇄
      printWindow.onload = function() {
        printWindow.print();
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      };

    } catch (error: unknown) {
      console.error('PDF 생성 오류:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    }
  };

  const generatePDFContent = (content: string, businessInfo: BusinessInfo): string => {
    // 마크다운을 더 정교하게 HTML로 변환
    const htmlContent = content
      // 테이블 구분선 완전 제거 (가장 먼저 처리)
      .replace(/^\|[\s\-\|:]+\|$/gm, '')
      .replace(/\|[\s\-:]+\|[\s\-:]*\|/g, '')
      .replace(/^\s*\|?\s*[-:]+\s*\|?\s*$/gm, '')
      
      // 제목 스타일링 (더 정교한 패턴 매칭)
      .replace(/^# (.+)$/gm, '<h1 class="main-title">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="section-title">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="sub-title">$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4 class="minor-title">$1</h4>')
      
      // 강조 텍스트
      .replace(/\*\*(.+?)\*\*/g, '<strong class="bold-text">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic-text">$1</em>')
      
      // 리스트 처리 (순서 없는 리스트)
      .replace(/^[-*] (.+)$/gm, '<li class="bullet-item">$1</li>')
      
      // 표 처리 개선 (구분선이 이미 제거된 후 처리)
      .replace(/\|(.+)\|/g, (match, content) => {
        const cells = content.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell);
        // 빈 셀이나 구분선 문자만 있는 경우 제외
        if (cells.length === 0 || cells.every((cell: string) => /^[\s\-:]*$/.test(cell))) {
          return '';
        }
        const cellTags = cells.map((cell: string) => `<td class="table-cell">${cell}</td>`).join('');
        return `<tr class="table-row">${cellTags}</tr>`;
      })
      
      // 빈 줄 정리
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      
      // 단락 분리
      .split('\n\n')
      .map(paragraph => {
        paragraph = paragraph.trim();
        if (!paragraph) return '';
        
        if (paragraph.includes('<li class="bullet-item">')) {
          return `<ul class="bullet-list">${paragraph}</ul>`;
        }
        if (paragraph.includes('<tr class="table-row">')) {
          return `<table class="content-table">${paragraph}</table>`;
        }
        if (paragraph.trim() && !paragraph.includes('<h') && !paragraph.includes('<ul') && !paragraph.includes('<table')) {
          return `<p class="content-paragraph">${paragraph}</p>`;
        }
        return paragraph;
      })
      .filter(paragraph => paragraph.trim()) // 빈 단락 제거
      .join('\n');

    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessInfo.businessName} 사업계획서</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 12px;
            line-height: 1.7;
            color: #2d3748;
            background: white;
            padding: 20mm;
            max-width: 210mm;
            margin: 0 auto;
        }
        
        .document-header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 25px;
            border-bottom: 3px solid #2563eb;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 30px 25px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .document-title {
            font-size: 26px;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 12px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .document-subtitle {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .document-meta {
            font-size: 11px;
            color: #94a3b8;
            font-weight: 400;
        }
        
        .main-title {
            font-size: 20px;
            font-weight: 700;
            color: #1e40af;
            margin: 35px 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #3b82f6;
            page-break-after: avoid;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e3a8a;
            margin: 28px 0 15px 0;
            padding-left: 12px;
            border-left: 4px solid #60a5fa;
            background: linear-gradient(90deg, #eff6ff 0%, transparent 100%);
            padding: 12px 0 12px 16px;
            border-radius: 0 8px 8px 0;
            page-break-after: avoid;
        }
        
        .sub-title {
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin: 20px 0 12px 0;
            padding-left: 8px;
            border-left: 3px solid #93c5fd;
            page-break-after: avoid;
        }
        
        .minor-title {
            font-size: 13px;
            font-weight: 500;
            color: #4b5563;
            margin: 15px 0 8px 0;
            page-break-after: avoid;
        }
        
        .content-paragraph {
            margin: 12px 0;
            text-align: justify;
            text-justify: inter-word;
            line-height: 1.8;
            word-break: keep-all;
            overflow-wrap: break-word;
        }
        
        .bold-text {
            font-weight: 600;
            color: #1e40af;
        }
        
        .italic-text {
            font-style: italic;
            color: #4b5563;
        }
        
        .bullet-list {
            margin: 15px 0;
            padding-left: 0;
            list-style: none;
        }
        
        .bullet-item {
            position: relative;
            margin: 8px 0;
            padding-left: 25px;
            line-height: 1.7;
        }
        
        .bullet-item:before {
            content: '•';
            color: #3b82f6;
            font-weight: bold;
            position: absolute;
            left: 8px;
            font-size: 14px;
        }
        
        .content-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 11px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .table-row:first-child .table-cell {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            font-weight: 600;
            text-align: center;
            padding: 12px 8px;
        }
        
        .table-cell {
            border: 1px solid #e2e8f0;
            padding: 10px 8px;
            text-align: left;
            background: #ffffff;
            transition: background-color 0.2s;
        }
        
        .table-row:nth-child(even) .table-cell {
            background: #f8fafc;
        }
        
        .table-separator {
            display: none;
        }
        
        /* 페이지 나누기 관련 */
        .main-title, .section-title, .sub-title {
            page-break-after: avoid;
        }
        
        .content-paragraph, .bullet-list, .content-table {
            page-break-inside: avoid;
        }
        
        /* 인쇄용 스타일 */
        @media print {
            body {
                padding: 15mm;
                font-size: 11px;
            }
            
            .document-header {
                margin-bottom: 30px;
                padding: 20px;
            }
            
            .document-title {
                font-size: 22px;
            }
            
            .main-title {
                font-size: 18px;
                color: #000 !important;
            }
            
            .section-title {
                font-size: 15px;
                color: #000 !important;
            }
            
            .bold-text {
                color: #000 !important;
            }
            
            .table-row:first-child .table-cell {
                background: #f0f0f0 !important;
                color: #000 !important;
            }
        }
        
        /* 반응형 스타일 */
        @media screen and (max-width: 768px) {
            body {
                padding: 10mm;
                font-size: 11px;
            }
            
            .document-title {
                font-size: 20px;
            }
            
            .main-title {
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="document-header">
        <div class="document-title">${businessInfo.businessName} 사업계획서</div>
        <div class="document-subtitle">Blue-ming AI 창업 컨설팅 플랫폼</div>
        <div class="document-meta">생성일: ${new Date().toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        })}</div>
    </div>
    
    <div class="document-content">
        ${htmlContent}
    </div>
    
    <script>
        // 페이지 로드 완료 후 스타일 조정
        window.addEventListener('DOMContentLoaded', function() {
            // 테이블 첫 번째 행을 헤더로 처리
            const tables = document.querySelectorAll('.content-table');
            tables.forEach(table => {
                const firstRow = table.querySelector('.table-row');
                if (firstRow) {
                    firstRow.classList.add('table-header');
                }
            });
        });
    </script>
</body>
</html>`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-green rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 사업계획서 생성기
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            춘천시 창업 생태계에 특화된 전문 사업계획서를 
            <span className="text-brand-blue font-semibold"> AI가 자동으로 생성</span>해드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">사업 정보 입력</h2>
            </div>

            <div className="space-y-6">
              {/* 사업명 */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>사업명</span>
                </label>
                <input
                  type="text"
                  value={businessInfo.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="예: 춘천 스마트 카페"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* 사업 분야 */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>사업 분야</span>
                </label>
                <select
                  value={businessInfo.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200"
                >
                  <option value="">분야를 선택해주세요</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* 타겟 시장 */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4" />
                  <span>타겟 시장</span>
                </label>
                <input
                  type="text"
                  value={businessInfo.targetMarket}
                  onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                  placeholder="예: 춘천 대학생, 관광객, 지역 주민"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* 예상 예산 */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span>예상 예산</span>
                </label>
                <select
                  value={businessInfo.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200"
                >
                  <option value="">예산 범위를 선택해주세요</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* 위치 */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>사업 위치</span>
                </label>
                <input
                  type="text"
                  value={businessInfo.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="예: 춘천시 중앙로"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* 사업 설명 */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  사업 설명
                </label>
                <textarea
                  value={businessInfo.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="사업 아이템과 특징을 자세히 설명해주세요..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Success Alert */}
              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    사업계획서가 성공적으로 생성되었습니다!
                  </AlertDescription>
                </Alert>
              )}

              {/* Generate Button */}
              <button
                onClick={() => handleGenerate(businessInfo)}
                disabled={isGenerating}
                className="w-full bg-brand-blue text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>AI가 사업계획서를 생성하고 있습니다...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>AI 사업계획서 생성</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Section with Enhanced Markdown Rendering */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">생성된 사업계획서</h2>
              </div>
              {generatedPlan && (
                <button
                  onClick={exportToPDF}
                  className="flex items-center space-x-2 bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF 다운로드</span>
                </button>
              )}
            </div>

            <div ref={businessPlanRef} className="prose prose-sm max-w-none">
              {generatedPlan ? (
                <div className="bg-white border border-gray-200 rounded-xl max-h-96 overflow-y-auto">
                  <div className="p-6">
                                         <div className="prose prose-sm max-w-none 
                         prose-headings:text-gray-900 
                         prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-6 prose-h1:text-brand-blue prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-2
                         prose-h2:text-xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:text-gray-800 prose-h2:mt-8
                         prose-h3:text-lg prose-h3:font-medium prose-h3:mb-3 prose-h3:text-gray-700 prose-h3:mt-6
                         prose-p:text-gray-700 prose-p:mb-4 prose-p:leading-relaxed
                         prose-strong:text-gray-900 prose-strong:font-semibold
                         prose-ul:text-gray-700 prose-li:mb-2 prose-li:marker:text-brand-blue
                         prose-ol:text-gray-700
                         prose-table:table-auto prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-gray-300
                         prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-gray-300
                         prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-gray-300
                         prose-blockquote:border-l-4 prose-blockquote:border-brand-blue prose-blockquote:bg-blue-50 prose-blockquote:pl-4 prose-blockquote:py-2
                         prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
                       <ReactMarkdown remarkPlugins={[remarkGfm]}>
                         {generatedPlan}
                       </ReactMarkdown>
                     </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-12 rounded-xl text-center">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">
                    사업계획서 미리보기
                  </h3>
                  <p className="text-gray-400">
                    사업 정보를 입력하고 생성 버튼을 클릭하면<br />
                    전문적인 사업계획서가 이곳에 표시됩니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Blue-ming 사업계획서 생성기의 특징
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-brand-blue rounded-xl mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">춘천 특화</h4>
              <p className="text-sm text-gray-600">
                춘천시 지역 특성과 시장 환경을 반영한 맞춤형 사업계획서
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-brand-green rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI 기반</h4>
              <p className="text-sm text-gray-600">
                GPT-4 기반 AI가 전문적이고 실무적인 사업계획서를 자동 생성
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-brand-yellow rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">PDF 출력</h4>
              <p className="text-sm text-gray-600">
                전문적인 형식의 PDF로 즉시 다운로드하여 투자 제안에 활용
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
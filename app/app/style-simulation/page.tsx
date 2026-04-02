'use client'

import { useState } from 'react'
import { hairStyles, femaleModels } from '../../data/mock'
import { HairStylePreset } from '../../types'

type ModelSource = 'ai' | 'customer'
type HairCategory = 'cut' | 'perm' | 'color' | 'upstyle'
type ViewMode = 'split' | 'overlay'

const categoryLabels: Record<HairCategory, string> = {
  cut: '커트',
  perm: '펌',
  color: '염색',
  upstyle: '업스타일',
}

const colorSwatches = [
  { id: 'natural', label: '자연색', color: '#3D2B1F' },
  { id: 'brown', label: '브라운', color: '#7B4F2E' },
  { id: 'red', label: '레드', color: '#C0392B' },
  { id: 'ash', label: '애쉬', color: '#8E9BA8' },
  { id: 'highlight', label: '하이라이트', color: '#F0D080' },
]

export default function StyleSimulationPage() {
  const [modelSource, setModelSource] = useState<ModelSource>('ai')
  const [selectedModel, setSelectedModel] = useState<string>('f-1')
  const [activeCategory, setActiveCategory] = useState<HairCategory>('cut')
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [isDragOver, setIsDragOver] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const filteredStyles = hairStyles.filter((s) => s.category === activeCategory)

  function handleGenerate() {
    if (!selectedStyle) return
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 1800)
  }

  return (
    <div className="flex h-full min-h-screen">
      {/* Left Panel */}
      <div
        className="flex flex-col bg-white border-r border-[#E5E7EB] overflow-y-auto"
        style={{ width: 320, minWidth: 320 }}
      >
        <div className="px-5 py-5 space-y-6">

          {/* 모델 / 고객 사진 */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-3">
              모델 / 고객 사진
            </p>
            <div className="flex rounded-lg border border-[#E5E7EB] overflow-hidden mb-4">
              <button
                onClick={() => setModelSource('ai')}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  modelSource === 'ai'
                    ? 'bg-[#E11D48] text-white'
                    : 'bg-white text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
              >
                AI 모델 선택
              </button>
              <button
                onClick={() => setModelSource('customer')}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  modelSource === 'customer'
                    ? 'bg-[#E11D48] text-white'
                    : 'bg-white text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
              >
                고객 사진 업로드
              </button>
            </div>

            {modelSource === 'ai' ? (
              <div className="grid grid-cols-3 gap-2">
                {femaleModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      selectedModel === model.id
                        ? 'border-[#E11D48] ring-2 ring-[#E11D48]/20'
                        : 'border-[#E5E7EB] hover:border-[#E11D48]/50'
                    }`}
                  >
                    <div className="aspect-square bg-gradient-to-br from-[#FFF1F2] to-[#FDA4AF] flex items-center justify-center">
                      <span className="text-2xl">👩</span>
                    </div>
                    <div className="py-1 text-center text-xs text-[#6B7280]">{model.name}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragOver(false) }}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                  isDragOver
                    ? 'border-[#E11D48] bg-[#FFF1F2]'
                    : 'border-[#E5E7EB] hover:border-[#E11D48]/50 hover:bg-[#FAFAFA]'
                }`}
              >
                <div className="text-3xl mb-2">📷</div>
                <p className="text-sm font-medium text-[#374151] mb-1">사진을 드래그하거나</p>
                <p className="text-xs text-[#9CA3AF] mb-3">클릭하여 파일 선택</p>
                <label className="inline-block cursor-pointer px-4 py-1.5 rounded-full border border-[#E5E7EB] text-xs text-[#6B7280] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors">
                  파일 선택
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            )}
          </section>

          {/* 헤어 스타일 선택 */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-3">
              헤어 스타일 선택
            </p>
            <div className="flex gap-1 mb-3">
              {(Object.keys(categoryLabels) as HairCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#E11D48] text-white'
                      : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#FFF1F2] hover:text-[#E11D48]'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {filteredStyles.length > 0 ? (
                filteredStyles.map((style: HairStylePreset) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`rounded-lg border-2 overflow-hidden text-left transition-all ${
                      selectedStyle === style.id
                        ? 'border-[#E11D48] ring-2 ring-[#E11D48]/20'
                        : 'border-[#E5E7EB] hover:border-[#E11D48]/50'
                    }`}
                  >
                    <div className="aspect-square bg-gradient-to-br from-[#FFF1F2] via-[#FECDD3] to-[#FDA4AF] flex items-center justify-center">
                      <span className="text-2xl">✂️</span>
                    </div>
                    <div className="px-2 py-1.5">
                      <span className="text-xs font-medium text-[#374151]">{style.name}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="col-span-2 py-6 text-center text-sm text-[#9CA3AF]">
                  준비 중인 스타일입니다
                </div>
              )}
            </div>
            <button className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-[#E5E7EB] text-xs text-[#6B7280] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors">
              <span>+</span>
              <span>레퍼런스 이미지 첨부</span>
            </button>
          </section>

          {/* 헤어 컬러 */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-3">
              헤어 컬러 <span className="text-[#9CA3AF] font-normal normal-case tracking-normal">(선택)</span>
            </p>
            <div className="flex gap-3 flex-wrap">
              {colorSwatches.map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setSelectedColor(selectedColor === swatch.id ? null : swatch.id)}
                  title={swatch.label}
                  className="flex flex-col items-center gap-1 group"
                >
                  <span
                    className={`w-8 h-8 rounded-full block transition-all ${
                      selectedColor === swatch.id
                        ? 'ring-2 ring-[#E11D48] ring-offset-2'
                        : 'ring-1 ring-[#E5E7EB] hover:ring-[#E11D48]/50'
                    }`}
                    style={{ backgroundColor: swatch.color }}
                  />
                  <span className="text-[10px] text-[#9CA3AF] group-hover:text-[#6B7280]">
                    {swatch.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Generate Button */}
        <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-5 py-4 mt-auto">
          <button
            onClick={handleGenerate}
            disabled={!selectedStyle || isGenerating}
            className={`w-full py-3 rounded-full text-sm font-semibold transition-colors ${
              selectedStyle && !isGenerating
                ? 'bg-[#E11D48] hover:bg-[#BE185D] text-white'
                : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            {isGenerating ? '생성 중...' : '생성하기'}
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-[#FAFAFA] p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-[#111827]">헤어 스타일 시뮬레이션</h1>
          <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg p-1">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'split'
                  ? 'bg-[#E11D48] text-white'
                  : 'text-[#6B7280] hover:text-[#374151]'
              }`}
            >
              분할 보기
            </button>
            <button
              onClick={() => setViewMode('overlay')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'overlay'
                  ? 'bg-[#E11D48] text-white'
                  : 'text-[#6B7280] hover:text-[#374151]'
              }`}
            >
              오버레이
            </button>
          </div>
        </div>

        <div className="flex-1 flex gap-4 min-h-0">
          {viewMode === 'split' ? (
            <>
              <div className="flex-1 flex flex-col bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E5E7EB]">
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">원본</span>
                </div>
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
                  {modelSource === 'ai' ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-40 h-56 rounded-xl bg-gradient-to-br from-[#FFF1F2] via-[#FECDD3] to-[#FDA4AF] flex items-center justify-center shadow-sm">
                        <span className="text-6xl">👩</span>
                      </div>
                      <span className="text-xs text-[#9CA3AF]">
                        {femaleModels.find(m => m.id === selectedModel)?.name ?? 'AI 모델'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                        <span className="text-3xl">📷</span>
                      </div>
                      <p className="text-sm text-[#9CA3AF]">고객 사진을 업로드해주세요</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-12 bg-[#E5E7EB]" />
                  <div className="w-6 h-6 rounded-full border-2 border-[#E5E7EB] bg-white flex items-center justify-center shadow-sm">
                    <span className="text-[10px] text-[#9CA3AF]">↔</span>
                  </div>
                  <div className="w-px h-12 bg-[#E5E7EB]" />
                </div>
              </div>

              <div className="flex-1 flex flex-col bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E5E7EB]">
                  <span className="text-xs font-semibold text-[#E11D48] uppercase tracking-wider">시뮬레이션</span>
                </div>
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#FFF1F2] to-[#F9FAFB]">
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-[#E11D48]/20 border-t-[#E11D48] rounded-full animate-spin" />
                      <p className="text-sm text-[#E11D48] font-medium">AI가 스타일을 적용 중...</p>
                    </div>
                  ) : isGenerated ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-40 h-56 rounded-xl bg-gradient-to-br from-[#FECDD3] via-[#FDA4AF] to-[#E11D48]/30 flex items-center justify-center shadow-sm">
                        <span className="text-6xl">✨</span>
                      </div>
                      <span className="text-xs text-[#E11D48] font-medium">
                        {hairStyles.find(s => s.id === selectedStyle)?.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-center px-6">
                      <div className="w-16 h-16 rounded-full bg-[#FFF1F2] flex items-center justify-center">
                        <span className="text-3xl">✂️</span>
                      </div>
                      <p className="text-sm text-[#9CA3AF]">
                        스타일을 선택하고 생성하기를 눌러주세요
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E5E7EB]">
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">오버레이 비교</span>
              </div>
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#FFF1F2] to-[#F9FAFB]">
                {isGenerated ? (
                  <div className="relative w-40 h-56">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FFF1F2] via-[#FECDD3] to-[#FDA4AF] flex items-center justify-center shadow-sm">
                      <span className="text-6xl">👩</span>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FECDD3] via-[#FDA4AF] to-[#E11D48]/30 opacity-60 flex items-center justify-center">
                      <span className="text-6xl">✨</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#9CA3AF]">생성 후 오버레이 비교가 가능합니다</p>
                )}
              </div>
            </div>
          )}
        </div>

        {isGenerated && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <button className="px-5 py-2.5 rounded-full bg-white border border-[#E5E7EB] text-sm font-medium text-[#374151] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors shadow-sm">
              다운로드
            </button>
            <button className="px-5 py-2.5 rounded-full bg-white border border-[#E5E7EB] text-sm font-medium text-[#374151] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors shadow-sm">
              갤러리에 저장
            </button>
            <button className="px-5 py-2.5 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white text-sm font-medium transition-colors shadow-sm">
              공유
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

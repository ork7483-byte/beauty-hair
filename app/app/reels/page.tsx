'use client'

import { useState } from 'react'
import ImageUploader from '@/app/components/ImageUploader'

type GenState = 'idle' | 'generating' | 'complete'
type LayoutOption = '이미지만' | '이미지+텍스트 상단' | '이미지+텍스트 하단'

const LAYOUT_OPTIONS: LayoutOption[] = ['이미지만', '이미지+텍스트 상단', '이미지+텍스트 하단']

const BG_COLORS = [
  { id: 'white', label: '흰색', bg: 'bg-white', border: 'border-[#E5E7EB]' },
  { id: 'black', label: '검정', bg: 'bg-[#111827]', border: 'border-[#111827]' },
  { id: 'beige', label: '베이지', bg: 'bg-[#F5F0EB]', border: 'border-[#E5E0DA]' },
  { id: 'pink', label: '연핑크', bg: 'bg-[#FFF0F3]', border: 'border-[#FECDD3]' },
  { id: 'purple', label: '연보라', bg: 'bg-[#F5F3FF]', border: 'border-[#DDD6FE]' },
]

const SAMPLE_GRADIENTS = [
  'from-pink-200 to-fuchsia-300',
  'from-sky-200 to-blue-300',
  'from-amber-200 to-orange-300',
  'from-emerald-200 to-teal-300',
]

const SECTION_HEADER = 'text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2'

export default function ReelsPage() {
  const [view, setView] = useState<'landing' | 'editor'>('landing')
  const [layout, setLayout] = useState<LayoutOption>('이미지만')
  const [salonName, setSalonName] = useState('')
  const [treatmentName, setTreatmentName] = useState('')
  const [selectedBg, setSelectedBg] = useState('white')
  const [genState, setGenState] = useState<GenState>('idle')

  const showText = layout !== '이미지만'

  function handleGenerate() {
    setGenState('generating')
    setTimeout(() => setGenState('complete'), 1500)
  }

  function handleReset() {
    setGenState('idle')
  }

  // Landing view
  if (view === 'landing') {
    return (
      <div className="max-w-[440px] mx-auto min-h-[calc(100dvh-theme(spacing.16))] flex flex-col justify-between px-5 pt-5">
        <div>
          <h1 className="text-heading-3">릴스 / 숏폼</h1>
          <div className="mt-8 flex flex-col gap-12">
            {/* Section 1 */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"릴스와 숏폼에 최적화된\n9:16 세로형 이미지를 만들어보세요"}</p>
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {SAMPLE_GRADIENTS.map((g, i) => (
                    <div key={i} className={`shrink-0 w-[192px] h-[128px] rounded-lg shadow-md bg-gradient-to-br ${g} border border-[rgba(15,15,15,0.12)]`} />
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-[#F3F3F3]" />

            {/* Section 2 */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"세로형 레이아웃과 텍스트를\n자유롭게 구성할 수 있어요"}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-4xl">🎬</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 pb-5 pt-4 bg-white">
          <div className="flex gap-3">
            <button onClick={() => setView('editor')} className="flex-1 h-12 rounded-xl bg-[#4F46E5] text-white font-semibold text-label-1">
              새로 만들기
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Editor view
  return (
    <div className="flex h-full">
      {/* Left Panel */}
      <div className="w-[320px] min-w-[320px] border-r border-[#E5E7EB] bg-white flex flex-col overflow-y-auto">
        <div className="p-5 space-y-5">
          <button onClick={() => setView('landing')} className="flex items-center gap-1 text-sm text-[#878787] hover:text-[#333] mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            뒤로가기
          </button>

          <section>
            <ImageUploader label="헤어 사진 업로드" />
          </section>

          {/* Layout Selection */}
          <section>
            <p className={SECTION_HEADER}>레이아웃</p>
            <div className="space-y-2">
              {LAYOUT_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    layout === opt
                      ? 'border-[#E11D48] bg-[#FFF1F2]'
                      : 'border-[#E5E7EB] hover:border-[#E11D48]'
                  }`}
                >
                  <input
                    type="radio"
                    name="layout"
                    value={opt}
                    checked={layout === opt}
                    onChange={() => setLayout(opt)}
                    className="accent-[#E11D48]"
                  />
                  <span className={`text-sm ${layout === opt ? 'text-[#E11D48] font-medium' : 'text-[#374151]'}`}>
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Text Inputs (conditional) */}
          {showText && (
            <section>
              <p className={SECTION_HEADER}>텍스트 입력</p>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-[#6B7280] mb-1 block">살롱명</label>
                  <input
                    type="text"
                    value={salonName}
                    onChange={(e) => setSalonName(e.target.value)}
                    placeholder="예: 드림헤어 강남점"
                    className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#E11D48] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#6B7280] mb-1 block">시술명</label>
                  <input
                    type="text"
                    value={treatmentName}
                    onChange={(e) => setTreatmentName(e.target.value)}
                    placeholder="예: 레이어드 커트 + C컬 펌"
                    className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#E11D48] transition-colors"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Background Color */}
          <section>
            <p className={SECTION_HEADER}>배경 색상</p>
            <div className="flex gap-2 flex-wrap">
              {BG_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedBg(c.id)}
                  title={c.label}
                  className={`flex flex-col items-center gap-1`}
                >
                  <div
                    className={`w-10 h-10 rounded-full ${c.bg} border-2 ${c.border} transition-all ${
                      selectedBg === c.id ? 'ring-2 ring-[#E11D48] ring-offset-1' : ''
                    }`}
                  />
                  <span className={`text-[10px] ${selectedBg === c.id ? 'text-[#E11D48] font-medium' : 'text-[#9CA3AF]'}`}>
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="p-4 border-t border-[#E5E7EB] mt-auto">
          <button
            onClick={handleGenerate}
            disabled={genState === 'generating'}
            className="w-full py-3 rounded-full bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {genState === 'generating' ? '변환 중...' : '릴스 이미지 변환하기'}
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAFAFA] p-8 gap-4">
        <div className="w-full max-w-[200px]">
          <div className="aspect-[9/16] w-full bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm relative">
            {genState === 'generating' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFF1F2]">
                <div className="w-8 h-8 border-4 border-[#E11D48]/20 border-t-[#E11D48] rounded-full animate-spin mb-2" />
                <p className="text-xs text-[#E11D48] font-medium">변환 중...</p>
              </div>
            )}
            {genState === 'complete' && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFF1F2] via-[#FECDD3] to-[#FDA4AF] flex items-center justify-center">
                <div className="w-full h-full relative flex items-center justify-center">
                  <span className="text-5xl">💇</span>
                  {layout === '이미지+텍스트 상단' && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent px-3 py-3">
                      {salonName && <p className="text-white text-xs font-bold">{salonName}</p>}
                      {treatmentName && <p className="text-white/80 text-[10px]">{treatmentName}</p>}
                    </div>
                  )}
                  {layout === '이미지+텍스트 하단' && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-3">
                      {salonName && <p className="text-white text-xs font-bold">{salonName}</p>}
                      {treatmentName && <p className="text-white/80 text-[10px]">{treatmentName}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}
            {genState === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-2">
                  <span className="text-2xl">🎬</span>
                </div>
                <p className="text-xs text-[#9CA3AF] text-center px-3">이미지를 업로드하고<br />변환하기를 눌러주세요</p>
              </div>
            )}
          </div>
          <p className="text-xs text-[#9CA3AF] text-center mt-2">릴스 · 1080 × 1920</p>
        </div>

        {genState === 'complete' && (
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors">
              다운로드
            </button>
            <button onClick={handleReset} className="px-5 py-2.5 rounded-full border border-[#E5E7EB] text-sm font-medium text-[#374151] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors">
              다시 변환
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

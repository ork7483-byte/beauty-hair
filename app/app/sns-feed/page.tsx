'use client'

import { useState } from 'react'
import ImageUploader from '@/app/components/ImageUploader'

type GenState = 'idle' | 'generating' | 'complete'

const FILTER_PRESETS = [
  { id: 'original', label: '원본', from: 'from-gray-100', to: 'to-gray-200' },
  { id: 'bright', label: '밝게', from: 'from-yellow-100', to: 'to-amber-200' },
  { id: 'warm', label: '따뜻하게', from: 'from-orange-100', to: 'to-rose-200' },
  { id: 'cool', label: '시원하게', from: 'from-sky-100', to: 'to-blue-200' },
  { id: 'vintage', label: '빈티지', from: 'from-amber-200', to: 'to-yellow-400' },
  { id: 'vivid', label: '선명하게', from: 'from-pink-200', to: 'to-fuchsia-300' },
]

const SAMPLE_GRADIENTS = [
  'from-yellow-100 to-amber-200',
  'from-sky-100 to-blue-200',
  'from-pink-200 to-fuchsia-300',
  'from-orange-100 to-rose-200',
]

const SECTION_HEADER = 'text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2'

export default function SnsFeedPage() {
  const [view, setView] = useState<'landing' | 'editor'>('landing')
  const [selectedFilter, setSelectedFilter] = useState('original')
  const [brightness, setBrightness] = useState(50)
  const [contrast, setContrast] = useState(50)
  const [saturation, setSaturation] = useState(50)
  const [genState, setGenState] = useState<GenState>('idle')

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
          <h1 className="text-heading-3">인스타 피드</h1>
          <div className="mt-8 flex flex-col gap-12">
            {/* Section 1 */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"인스타그램 피드에 최적화된\n1:1 정사각형 사진을 만들어보세요"}</p>
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
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"다양한 필터와 보정 기능으로\n피드에 딱 맞는 사진을 만들어요"}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-4xl">📸</span>
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

          {/* Image Upload */}
          <section>
            <ImageUploader label="헤어 사진 업로드" />
          </section>

          {/* Filter Selection */}
          <section>
            <p className={SECTION_HEADER}>필터 선택</p>
            <div className="grid grid-cols-3 gap-2">
              {FILTER_PRESETS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div
                    className={`w-full aspect-square rounded-lg bg-gradient-to-br ${f.from} ${f.to} transition-all ${
                      selectedFilter === f.id
                        ? 'ring-2 ring-[#E11D48] ring-offset-1'
                        : 'ring-1 ring-[#E5E7EB] group-hover:ring-[#E11D48]'
                    }`}
                  />
                  <span className={`text-xs ${selectedFilter === f.id ? 'text-[#E11D48] font-medium' : 'text-[#6B7280]'}`}>
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Correction Options */}
          <section>
            <p className={SECTION_HEADER}>보정 옵션</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-[#6B7280]">밝기</label>
                  <span className="text-xs text-[#6B7280]">{brightness}</span>
                </div>
                <input
                  type="range" min={0} max={100} value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-[#E11D48]"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-[#6B7280]">대비</label>
                  <span className="text-xs text-[#6B7280]">{contrast}</span>
                </div>
                <input
                  type="range" min={0} max={100} value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full accent-[#E11D48]"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-[#6B7280]">채도</label>
                  <span className="text-xs text-[#6B7280]">{saturation}</span>
                </div>
                <input
                  type="range" min={0} max={100} value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full accent-[#E11D48]"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Generate Button */}
        <div className="p-4 border-t border-[#E5E7EB] mt-auto">
          <button
            onClick={handleGenerate}
            disabled={genState === 'generating'}
            className="w-full py-3 rounded-full bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {genState === 'generating' ? '변환 중...' : '피드 이미지 변환하기'}
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAFAFA] p-8 gap-4">
        <div className="w-full max-w-xs">
          <div className="aspect-square w-full bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm relative">
            {genState === 'generating' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFF1F2]">
                <div className="w-10 h-10 border-4 border-[#E11D48]/20 border-t-[#E11D48] rounded-full animate-spin mb-3" />
                <p className="text-sm text-[#E11D48] font-medium">변환 중...</p>
              </div>
            )}
            {genState === 'complete' && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFF1F2] via-[#FECDD3] to-[#FDA4AF] flex items-center justify-center">
                <span className="text-6xl">💇</span>
              </div>
            )}
            {genState === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
                <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3">
                  <span className="text-3xl">🖼️</span>
                </div>
                <p className="text-sm text-[#9CA3AF] text-center px-4">이미지를 업로드하고<br />변환하기를 눌러주세요</p>
              </div>
            )}
          </div>
          <p className="text-xs text-[#9CA3AF] text-center mt-2">인스타그램 피드 · 1080 × 1080</p>
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

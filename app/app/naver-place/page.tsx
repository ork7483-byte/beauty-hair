'use client'

import { useState } from 'react'
import ImageUploader from '@/app/components/ImageUploader'

type GenState = 'idle' | 'generating' | 'complete'
type BgCategory = '전체' | '단색' | '우드' | '콘크리트'

const PLATFORMS = [
  { id: 'naver', label: '네이버 플레이스', sub: '1200 × 750', emoji: '🟢' },
  { id: 'kakao', label: '카카오맵', sub: '1200 × 750', emoji: '💛' },
  { id: 'tmap', label: '티맵', sub: '1200 × 750', emoji: '🔵' },
]

const BG_CATEGORIES: BgCategory[] = ['전체', '단색', '우드', '콘크리트']

const BG_PRESETS = [
  { id: 'b1', label: '화이트', category: '단색', from: 'from-gray-50', to: 'to-gray-100' },
  { id: 'b2', label: '베이지', category: '단색', from: 'from-amber-50', to: 'to-yellow-100' },
  { id: 'b3', label: '라이트 핑크', category: '단색', from: 'from-rose-50', to: 'to-pink-100' },
  { id: 'b4', label: '내추럴 우드', category: '우드', from: 'from-amber-200', to: 'to-orange-300' },
  { id: 'b5', label: '다크 우드', category: '우드', from: 'from-amber-700', to: 'to-yellow-800' },
  { id: 'b6', label: '라이트 우드', category: '우드', from: 'from-yellow-100', to: 'to-amber-200' },
  { id: 'b7', label: '그레이 콘크리트', category: '콘크리트', from: 'from-gray-300', to: 'to-gray-400' },
  { id: 'b8', label: '화이트 콘크리트', category: '콘크리트', from: 'from-slate-100', to: 'to-gray-200' },
  { id: 'b9', label: '다크 콘크리트', category: '콘크리트', from: 'from-gray-500', to: 'to-gray-700' },
]

const SAMPLE_GRADIENTS = [
  'from-amber-50 to-yellow-100',
  'from-gray-50 to-gray-100',
  'from-amber-200 to-orange-300',
  'from-gray-300 to-gray-400',
]

const SECTION_HEADER = 'text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2'

export default function NaverPlacePage() {
  const [view, setView] = useState<'landing' | 'editor'>('landing')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['naver'])
  const [activeBgCategory, setActiveBgCategory] = useState<BgCategory>('전체')
  const [selectedBg, setSelectedBg] = useState<string | null>(null)
  const [genState, setGenState] = useState<GenState>('idle')

  const filteredBg = activeBgCategory === '전체' ? BG_PRESETS : BG_PRESETS.filter((b) => b.category === activeBgCategory)

  function togglePlatform(id: string) {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

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
          <h1 className="text-heading-3">네이버 플레이스</h1>

          {/* Platform icons */}
          <div className="mt-4 flex gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#03C75A]/10 text-[#03C75A] text-xs font-medium">
              🟢 네이버
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFE812]/20 text-[#8B7500] text-xs font-medium">
              💛 카카오
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0064FF]/10 text-[#0064FF] text-xs font-medium">
              🔵 티맵
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-12">
            {/* Section 1 */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"네이버 플레이스, 카카오맵, 티맵 등\n지도앱별로 딱 맞는 사이즈로 만들어요"}</p>
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
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"최대 10장까지 한 번에\n다양한 배경으로 사진을 만들어요"}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-4xl">🗺️</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 pb-5 pt-4 bg-white">
          <div className="flex gap-3">
            <button onClick={() => setView('editor')} className="flex-1 h-12 rounded-xl bg-[#4F46E5] text-white font-semibold text-label-1">
              만들기
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
            <ImageUploader label="헤어 사진 업로드 (최대 10장)" />
          </section>

          {/* Platform Selection */}
          <section>
            <p className={SECTION_HEADER}>플랫폼 선택</p>
            <div className="space-y-2">
              {PLATFORMS.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPlatforms.includes(p.id)
                      ? 'border-[#E11D48] bg-[#FFF1F2]'
                      : 'border-[#E5E7EB] hover:border-[#E11D48]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(p.id)}
                    onChange={() => togglePlatform(p.id)}
                    className="accent-[#E11D48]"
                  />
                  <span className="text-lg">{p.emoji}</span>
                  <div>
                    <p className={`text-sm font-medium ${selectedPlatforms.includes(p.id) ? 'text-[#E11D48]' : 'text-[#111827]'}`}>
                      {p.label}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">{p.sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Background Setting */}
          <section>
            <p className={SECTION_HEADER}>배경 설정</p>
            <div className="flex gap-1 mb-3 flex-wrap">
              {BG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveBgCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    activeBgCategory === cat
                      ? 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48]'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#E11D48]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {filteredBg.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBg(bg.id)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div
                    className={`w-full aspect-[16/10] rounded-lg bg-gradient-to-br ${bg.from} ${bg.to} transition-all ${
                      selectedBg === bg.id
                        ? 'ring-2 ring-[#E11D48] ring-offset-1'
                        : 'ring-1 ring-[#E5E7EB] group-hover:ring-[#E11D48]'
                    }`}
                  />
                  <span className={`text-[10px] text-center leading-tight ${selectedBg === bg.id ? 'text-[#E11D48] font-medium' : 'text-[#6B7280]'}`}>
                    {bg.label}
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
            {genState === 'generating' ? '생성 중...' : '사진 생성하기'}
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAFAFA] p-8 gap-4">
        <div className="w-full max-w-md">
          <div className="aspect-[8/5] w-full bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm relative">
            {genState === 'generating' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFF1F2]">
                <div className="w-10 h-10 border-4 border-[#E11D48]/20 border-t-[#E11D48] rounded-full animate-spin mb-3" />
                <p className="text-sm text-[#E11D48] font-medium">생성 중...</p>
              </div>
            )}
            {genState === 'complete' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFF1F2] via-[#FECDD3] to-[#FDA4AF] flex items-center justify-center">
                  <span className="text-6xl">💇</span>
                </div>
                <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                  {PLATFORMS.filter((p) => selectedPlatforms.includes(p.id)).map((p) => (
                    <span key={p.id} className="text-[10px] bg-white/90 px-2 py-0.5 rounded font-medium text-[#374151]">
                      {p.emoji} {p.label}
                    </span>
                  ))}
                </div>
              </>
            )}
            {genState === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
                <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3">
                  <span className="text-3xl">🖼️</span>
                </div>
                <p className="text-sm text-[#9CA3AF] text-center px-4">플랫폼과 배경을 선택하고<br />사진 생성하기를 눌러주세요</p>
              </div>
            )}
          </div>
          <p className="text-xs text-[#9CA3AF] text-center mt-2">네이버 플레이스 · 1200 × 750</p>
        </div>

        {genState === 'complete' && (
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors">
              다운로드
            </button>
            <button onClick={handleReset} className="px-5 py-2.5 rounded-full border border-[#E5E7EB] text-sm font-medium text-[#374151] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors">
              다시 생성
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUploader from '@/app/components/ImageUploader'

type GenState = 'idle' | 'generating' | 'complete'

const COLOR_OPTIONS = [
  { id: 'natural-black', label: '내추럴블랙', color: '#1A1A1A' },
  { id: 'dark-brown', label: '다크브라운', color: '#3D2B1F' },
  { id: 'chocolate-brown', label: '초콜릿브라운', color: '#5C3317' },
  { id: 'ash-gray', label: '애쉬그레이', color: '#8E9BA8' },
  { id: 'red-brown', label: '레드브라운', color: '#8B3A3A' },
  { id: 'pink-brown', label: '핑크브라운', color: '#C87BA0' },
  { id: 'milk-brown', label: '밀크브라운', color: '#C9A98A' },
  { id: 'highlight-gold', label: '하이라이트골드', color: '#D4A843' },
  { id: 'balayage', label: '발레아쥬', color: '#C4A882' },
  { id: 'custom', label: '커스텀', color: null },
]

const SAMPLE_GRADIENTS = [
  'from-gray-800 to-gray-900',
  'from-amber-700 to-yellow-800',
  'from-rose-300 to-pink-400',
  'from-slate-300 to-gray-400',
]

export default function ColorChangePage() {
  const [view, setView] = useState<'landing' | 'editor'>('landing')
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [customColor, setCustomColor] = useState('#E11D48')
  const [genState, setGenState] = useState<GenState>('idle')
  const [countdown, setCountdown] = useState(10)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleGenerate = () => {
    setGenState('generating')
    setCountdown(10)
  }

  useEffect(() => {
    if (genState === 'generating') {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setGenState('complete')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [genState])

  const handleReset = () => {
    setGenState('idle')
    setCountdown(10)
  }

  const activeColor =
    selectedColor === 'custom'
      ? customColor
      : COLOR_OPTIONS.find((c) => c.id === selectedColor)?.color ?? null

  // Landing view
  if (view === 'landing') {
    return (
      <div className="max-w-[440px] mx-auto min-h-[calc(100dvh-theme(spacing.16))] flex flex-col justify-between px-5 pt-5">
        <div>
          <h1 className="text-heading-3">헤어 컬러 변환</h1>
          <div className="mt-8 flex flex-col gap-12">
            {/* Section 1 */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"시술 전 다양한 컬러를 미리 확인해보세요.\nAI가 자연스럽게 컬러를 변환해드려요!"}</p>
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
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"내추럴부터 트렌디한 컬러까지\n다양한 컬러 팔레트를 제공해요"}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-4xl">🎨</span>
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
      {/* ---- Left Panel ---- */}
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

          {/* Color Selection */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-3">컬러 선택</p>
            <div className="grid grid-cols-5 gap-3">
              {COLOR_OPTIONS.map((opt) => {
                const isSelected = selectedColor === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedColor(opt.id)}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        isSelected
                          ? 'border-[#E11D48] ring-2 ring-[#E11D48] ring-offset-1'
                          : 'border-[#E5E7EB] group-hover:border-[#E11D48]'
                      }`}
                      style={opt.color ? { backgroundColor: opt.color } : {
                        background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)'
                      }}
                    >
                      {!opt.color && <span className="text-xs">🎨</span>}
                    </div>
                    <span className={`text-[10px] leading-tight text-center ${isSelected ? 'text-[#E11D48] font-medium' : 'text-[#6B7280]'}`}>
                      {opt.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Custom color picker */}
            {selectedColor === 'custom' && (
              <div className="mt-3 flex items-center gap-3 p-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <div>
                  <p className="text-xs font-medium text-[#111827]">커스텀 컬러</p>
                  <p className="text-xs text-[#9CA3AF]">{customColor.toUpperCase()}</p>
                </div>
              </div>
            )}

            {/* Selected color preview */}
            {activeColor && (
              <div className="mt-3 flex items-center gap-2 p-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]">
                <div
                  className="w-6 h-6 rounded-full border border-[#E5E7EB]"
                  style={{ backgroundColor: activeColor }}
                />
                <span className="text-xs text-[#6B7280]">
                  선택된 컬러: <span className="font-medium text-[#111827]">
                    {COLOR_OPTIONS.find((c) => c.id === selectedColor)?.label}
                  </span>
                </span>
              </div>
            )}
          </section>
        </div>

        {/* Generate button */}
        <div className="p-4 border-t border-[#E5E7EB] mt-auto">
          <button
            onClick={handleGenerate}
            disabled={genState === 'generating' || !selectedColor}
            className="w-full py-3 rounded-full bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base transition-colors"
          >
            컬러 변환하기
          </button>
        </div>
      </div>

      {/* ---- Right Panel ---- */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-8">
        {genState === 'idle' && <ColorIdleState />}
        {genState === 'generating' && <ColorGeneratingState countdown={countdown} />}
        {genState === 'complete' && <ColorCompleteState color={activeColor} onReset={handleReset} />}
      </div>
    </div>
  )
}

function ColorIdleState() {
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-xs">
      <div className="w-20 h-20 rounded-full bg-[#FFF1F2] flex items-center justify-center text-4xl">
        🎨
      </div>
      <p className="text-[#6B7280] text-sm leading-relaxed">
        사진을 업로드하고 컬러를 선택한 후<br />
        <span className="font-medium text-[#111827]">컬러 변환하기</span>를 눌러주세요
      </p>
    </div>
  )
}

function ColorGeneratingState({ countdown }: { countdown: number }) {
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const progress = ((10 - countdown) / 10) * circumference

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={radius} fill="none" stroke="#E11D48" strokeWidth="8"
            strokeLinecap="round" strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-[#E11D48]">{countdown}</span>
        </div>
      </div>
      <p className="text-[#6B7280] text-sm">AI가 컬러를 변환하고 있어요...</p>
    </div>
  )
}

function ColorCompleteState({ color, onReset }: { color: string | null; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl">
      {/* Before / After split */}
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[#6B7280] text-center uppercase tracking-wider">Before</p>
          <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm">
            <span className="text-4xl">💇‍♀️</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[#E11D48] text-center uppercase tracking-wider">After</p>
          <div
            className="aspect-[3/4] rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: color ? `linear-gradient(135deg, ${color}44, ${color}88)` : 'linear-gradient(135deg, #FDA4AF, #FB7185)' }}
          >
            <span className="text-4xl">💇‍♀️</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        <button className="px-5 py-2.5 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors">
          사진 다운로드
        </button>
        <button className="px-5 py-2.5 rounded-full border border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] text-sm font-semibold transition-colors">
          갤러리에 저장
        </button>
      </div>
      <button onClick={onReset} className="text-xs text-[#9CA3AF] hover:text-[#6B7280] underline transition-colors">
        다시 생성하기
      </button>
    </div>
  )
}

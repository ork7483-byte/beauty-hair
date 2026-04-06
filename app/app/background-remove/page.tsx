'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUploader from '@/app/components/ImageUploader'

type BgOption = 'transparent' | 'white' | 'custom'
type GenState = 'idle' | 'generating' | 'complete'

const SAMPLE_GRADIENTS = [
  'from-gray-100 to-white',
  'from-pink-100 to-rose-200',
  'from-sky-100 to-blue-200',
  'from-emerald-100 to-teal-200',
]

export default function BackgroundRemovePage() {
  const [view, setView] = useState<'landing' | 'editor'>('landing')
  const [bgOption, setBgOption] = useState<BgOption>('transparent')
  const [customColor, setCustomColor] = useState('#FFFFFF')
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

  const BG_OPTIONS: { id: BgOption; label: string; desc: string }[] = [
    { id: 'transparent', label: '투명', desc: 'PNG 파일로 저장됩니다' },
    { id: 'white', label: '흰색', desc: '흰색 배경으로 대체됩니다' },
    { id: 'custom', label: '커스텀 컬러', desc: '원하는 색상을 선택하세요' },
  ]

  // Landing view
  if (view === 'landing') {
    return (
      <div className="max-w-[440px] mx-auto min-h-[calc(100dvh-theme(spacing.16))] flex flex-col justify-between px-5 pt-5">
        <div>
          <h1 className="text-heading-3">배경 제거</h1>
          <div className="mt-8 flex flex-col gap-12">
            {/* Section 1 */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"사진 배경을 깔끔하게 제거해드려요.\n최대 10장까지 한 번에 처리 가능!"}</p>
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
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"투명 배경, 흰색 배경, 커스텀 컬러까지\n원하는 배경으로 변경할 수 있어요"}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-4xl">✂️</span>
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
            <ImageUploader label="사진 업로드 (최대 10장)" />
          </section>

          {/* Background Option */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">배경 옵션</p>
            <div className="space-y-2">
              {BG_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    bgOption === opt.id
                      ? 'border-[#E11D48] bg-[#FFF1F2]'
                      : 'border-[#E5E7EB] hover:border-[#E11D48]'
                  }`}
                >
                  <input
                    type="radio"
                    name="bgOption"
                    value={opt.id}
                    checked={bgOption === opt.id}
                    onChange={() => setBgOption(opt.id)}
                    className="accent-[#E11D48]"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    {/* Visual preview */}
                    <div className="w-8 h-8 rounded border border-[#E5E7EB] flex-shrink-0 overflow-hidden">
                      {opt.id === 'transparent' && (
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage:
                              'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                            backgroundSize: '8px 8px',
                            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
                          }}
                        />
                      )}
                      {opt.id === 'white' && <div className="w-full h-full bg-white" />}
                      {opt.id === 'custom' && (
                        <div className="w-full h-full" style={{ backgroundColor: customColor }} />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${bgOption === opt.id ? 'text-[#E11D48]' : 'text-[#111827]'}`}>
                        {opt.label}
                      </p>
                      <p className="text-xs text-[#9CA3AF]">{opt.desc}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Custom color picker */}
            {bgOption === 'custom' && (
              <div className="mt-3 flex items-center gap-3 p-3 rounded-lg border border-[#E11D48] bg-[#FFF1F2]">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <div>
                  <p className="text-xs font-medium text-[#E11D48]">커스텀 배경색</p>
                  <p className="text-xs text-[#9CA3AF]">{customColor.toUpperCase()}</p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Generate button */}
        <div className="p-4 border-t border-[#E5E7EB] mt-auto">
          <button
            onClick={handleGenerate}
            disabled={genState === 'generating'}
            className="w-full py-3 rounded-full bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base transition-colors"
          >
            배경 제거하기
          </button>
        </div>
      </div>

      {/* ---- Right Panel ---- */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-8">
        {genState === 'idle' && <BgRemoveIdleState />}
        {genState === 'generating' && <BgRemoveGeneratingState countdown={countdown} />}
        {genState === 'complete' && (
          <BgRemoveCompleteState bgOption={bgOption} customColor={customColor} onReset={handleReset} />
        )}
      </div>
    </div>
  )
}

function BgRemoveIdleState() {
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-xs">
      <div className="w-20 h-20 rounded-full bg-[#FFF1F2] flex items-center justify-center text-4xl">
        ✂️
      </div>
      <p className="text-[#6B7280] text-sm leading-relaxed">
        사진을 업로드하고 배경 옵션을 선택한 후<br />
        <span className="font-medium text-[#111827]">배경 제거하기</span>를 눌러주세요
      </p>
    </div>
  )
}

function BgRemoveGeneratingState({ countdown }: { countdown: number }) {
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
      <p className="text-[#6B7280] text-sm">AI가 배경을 제거하고 있어요...</p>
    </div>
  )
}

function BgRemoveCompleteState({
  bgOption,
  customColor,
  onReset,
}: {
  bgOption: BgOption
  customColor: string
  onReset: () => void
}) {
  const checkeredStyle =
    bgOption === 'transparent'
      ? {
          backgroundImage:
            'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
          backgroundColor: '#ffffff',
        }
      : bgOption === 'white'
      ? { backgroundColor: '#ffffff' }
      : { backgroundColor: customColor }

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md">
      <div
        className="w-full aspect-square rounded-xl flex items-center justify-center shadow-sm border border-[#E5E7EB]"
        style={checkeredStyle}
      >
        <span className="text-6xl">💇‍♀️</span>
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

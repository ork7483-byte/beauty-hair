'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUploader from '@/app/components/ImageUploader'

type LightingPreset = 'natural' | 'studio' | 'warm' | 'cool'
type GenState = 'idle' | 'generating' | 'complete'

const LIGHTING_PRESETS: {
  id: LightingPreset
  label: string
  desc: string
  gradient: string
  icon: string
}[] = [
  {
    id: 'natural',
    label: '자연광',
    desc: '부드럽고 자연스러운 햇빛 느낌',
    gradient: 'from-yellow-100 to-amber-200',
    icon: '☀️',
  },
  {
    id: 'studio',
    label: '스튜디오',
    desc: '전문 스튜디오 조명 효과',
    gradient: 'from-slate-100 to-gray-200',
    icon: '💡',
  },
  {
    id: 'warm',
    label: '웜톤',
    desc: '따뜻하고 아늑한 오렌지 계열',
    gradient: 'from-orange-100 to-rose-200',
    icon: '🕯️',
  },
  {
    id: 'cool',
    label: '쿨톤',
    desc: '시원하고 청량한 블루 계열',
    gradient: 'from-sky-100 to-blue-200',
    icon: '🌙',
  },
]

const SAMPLE_GRADIENTS = [
  'from-yellow-100 to-amber-200',
  'from-slate-100 to-gray-200',
  'from-orange-100 to-rose-200',
  'from-sky-100 to-blue-200',
]

export default function LightingPage() {
  const [view, setView] = useState<'landing' | 'editor'>('landing')
  const [selectedPreset, setSelectedPreset] = useState<LightingPreset | null>(null)
  const [intensity, setIntensity] = useState(70)
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

  const activePreset = LIGHTING_PRESETS.find((p) => p.id === selectedPreset)

  // Landing view
  if (view === 'landing') {
    return (
      <div className="max-w-[440px] mx-auto min-h-[calc(100dvh-theme(spacing.16))] flex flex-col justify-between px-5 pt-5">
        <div>
          <h1 className="text-heading-3">조명 &amp; 그림자</h1>
          <div className="mt-8 flex flex-col gap-12">
            {/* Section 1 */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"조명 하나로 분위기가 달라져요.\n자연광부터 스튜디오 조명까지!"}</p>
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
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"4가지 조명 프리셋으로\n헤어 사진의 분위기를 바꿔보세요"}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100">
                  <span className="text-4xl">💡</span>
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

          {/* Lighting Presets */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-3">조명 프리셋</p>
            <div className="grid grid-cols-2 gap-3">
              {LIGHTING_PRESETS.map((preset) => {
                const isSelected = selectedPreset === preset.id
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`flex flex-col items-start p-3 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-[#E11D48] bg-[#FFF1F2]'
                        : 'border-[#E5E7EB] hover:border-[#E11D48] bg-white'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${preset.gradient} flex items-center justify-center text-xl mb-2`}
                    >
                      {preset.icon}
                    </div>
                    <p className={`text-sm font-semibold ${isSelected ? 'text-[#E11D48]' : 'text-[#111827]'}`}>
                      {preset.label}
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5 leading-tight">{preset.desc}</p>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Intensity Slider */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48]">강도</p>
              <span className="text-xs font-medium text-[#111827] bg-[#F3F4F6] px-2 py-0.5 rounded">{intensity}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #E11D48 0%, #E11D48 ${intensity}%, #E5E7EB ${intensity}%, #E5E7EB 100%)`,
              }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-[#9CA3AF]">약함</span>
              <span className="text-xs text-[#9CA3AF]">강함</span>
            </div>
          </section>
        </div>

        {/* Generate button */}
        <div className="p-4 border-t border-[#E5E7EB] mt-auto">
          <button
            onClick={handleGenerate}
            disabled={genState === 'generating' || !selectedPreset}
            className="w-full py-3 rounded-full bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base transition-colors"
          >
            조명 적용하기
          </button>
        </div>
      </div>

      {/* ---- Right Panel ---- */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-8">
        {genState === 'idle' && <LightingIdleState />}
        {genState === 'generating' && <LightingGeneratingState countdown={countdown} />}
        {genState === 'complete' && (
          <LightingCompleteState preset={activePreset ?? null} intensity={intensity} onReset={handleReset} />
        )}
      </div>
    </div>
  )
}

function LightingIdleState() {
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-xs">
      <div className="w-20 h-20 rounded-full bg-[#FFF1F2] flex items-center justify-center text-4xl">
        💡
      </div>
      <p className="text-[#6B7280] text-sm leading-relaxed">
        사진을 업로드하고 조명 프리셋을 선택한 후<br />
        <span className="font-medium text-[#111827]">조명 적용하기</span>를 눌러주세요
      </p>
    </div>
  )
}

function LightingGeneratingState({ countdown }: { countdown: number }) {
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
      <p className="text-[#6B7280] text-sm">AI가 조명을 적용하고 있어요...</p>
    </div>
  )
}

function LightingCompleteState({
  preset,
  intensity,
  onReset,
}: {
  preset: { label: string; gradient: string; icon: string } | null
  intensity: number
  onReset: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md">
      <div
        className={`w-full aspect-[3/4] rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden bg-gradient-to-br ${
          preset?.gradient ?? 'from-rose-100 to-pink-200'
        }`}
        style={{ filter: `brightness(${0.8 + (intensity / 100) * 0.6})` }}
      >
        <span className="text-6xl">💇‍♀️</span>
        {preset && (
          <div className="absolute bottom-3 right-3 bg-white/80 rounded-lg px-2 py-1 text-xs font-medium text-[#111827]">
            {preset.icon} {preset.label}
          </div>
        )}
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

'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUploader from '@/app/components/ImageUploader'

type Scale = '2x' | '4x'
type GenState = 'idle' | 'generating' | 'complete'

const SAMPLE_GRADIENTS = [
  'from-gray-200 to-gray-300',
  'from-slate-200 to-blue-300',
  'from-rose-100 to-pink-200',
  'from-emerald-100 to-teal-200',
]

export default function UpscalePage() {
  const [view, setView] = useState<'landing' | 'editor'>('landing')
  const [scale, setScale] = useState<Scale>('2x')
  const [denoise, setDenoise] = useState(50)
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

  // Landing view
  if (view === 'landing') {
    return (
      <div className="max-w-[440px] mx-auto min-h-[calc(100dvh-theme(spacing.16))] flex flex-col justify-between px-5 pt-5">
        <div>
          <h1 className="text-heading-3">해상도 높이기</h1>
          <div className="mt-8 flex flex-col gap-12">
            {/* Section 1 */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"저해상도 사진도 걱정 마세요.\nAI가 선명하게 해상도를 높여드려요!"}</p>
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
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"최대 4배까지 해상도를 높이고\n노이즈도 함께 제거해요"}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-4xl">🔍</span>
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
            <ImageUploader label="저해상도 사진 업로드" />
          </section>

          {/* Scale Selection */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">배율 선택</p>
            <div className="flex gap-3">
              {(['2x', '4x'] as Scale[]).map((s) => (
                <label
                  key={s}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    scale === s
                      ? 'border-[#E11D48] bg-[#FFF1F2]'
                      : 'border-[#E5E7EB] hover:border-[#E11D48]'
                  }`}
                >
                  <input
                    type="radio"
                    name="scale"
                    value={s}
                    checked={scale === s}
                    onChange={() => setScale(s)}
                    className="accent-[#E11D48] hidden"
                  />
                  <span className={`text-lg font-bold ${scale === s ? 'text-[#E11D48]' : 'text-[#6B7280]'}`}>
                    {s}
                  </span>
                  <span className={`text-xs ${scale === s ? 'text-[#E11D48]' : 'text-[#9CA3AF]'}`}>
                    {s === '2x' ? '2배 확대' : '4배 확대'}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Denoise Slider */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48]">디노이즈 강도</p>
              <span className="text-xs font-medium text-[#111827] bg-[#F3F4F6] px-2 py-0.5 rounded">{denoise}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={denoise}
              onChange={(e) => setDenoise(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #E11D48 0%, #E11D48 ${denoise}%, #E5E7EB ${denoise}%, #E5E7EB 100%)`,
              }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-[#9CA3AF]">약함</span>
              <span className="text-xs text-[#9CA3AF]">강함</span>
            </div>
          </section>

          {/* Info box */}
          <section>
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3">
              <p className="text-xs text-[#1E40AF] leading-relaxed">
                <span className="font-semibold">배율 {scale}:</span>{' '}
                {scale === '2x'
                  ? '원본 대비 2배 해상도로 선명하게 향상됩니다.'
                  : '원본 대비 4배 해상도로 고품질 이미지가 생성됩니다.'}
              </p>
            </div>
          </section>
        </div>

        {/* Generate button */}
        <div className="p-4 border-t border-[#E5E7EB] mt-auto">
          <button
            onClick={handleGenerate}
            disabled={genState === 'generating'}
            className="w-full py-3 rounded-full bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base transition-colors"
          >
            해상도 높이기
          </button>
        </div>
      </div>

      {/* ---- Right Panel ---- */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-8">
        {genState === 'idle' && <UpscaleIdleState />}
        {genState === 'generating' && <UpscaleGeneratingState countdown={countdown} />}
        {genState === 'complete' && <UpscaleCompleteState scale={scale} onReset={handleReset} />}
      </div>
    </div>
  )
}

function UpscaleIdleState() {
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-xs">
      <div className="w-20 h-20 rounded-full bg-[#FFF1F2] flex items-center justify-center text-4xl">
        🔍
      </div>
      <p className="text-[#6B7280] text-sm leading-relaxed">
        저해상도 사진을 업로드하고<br />
        <span className="font-medium text-[#111827]">해상도 높이기</span>를 눌러주세요
      </p>
    </div>
  )
}

function UpscaleGeneratingState({ countdown }: { countdown: number }) {
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
      <p className="text-[#6B7280] text-sm">AI가 해상도를 높이고 있어요...</p>
    </div>
  )
}

function UpscaleCompleteState({ scale, onReset }: { scale: Scale; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl">
      {/* Before / After split with magnify icon */}
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[#6B7280] text-center uppercase tracking-wider">Before</p>
          <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm relative overflow-hidden">
            <span className="text-4xl opacity-60">💇‍♀️</span>
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
            <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-lg">
              🔍
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[#E11D48] text-center uppercase tracking-wider">After ({scale})</p>
          <div className="aspect-square rounded-xl bg-gradient-to-br from-rose-100 via-pink-200 to-fuchsia-200 flex items-center justify-center shadow-sm relative">
            <span className="text-4xl">💇‍♀️</span>
            <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-lg">
              🔎
            </div>
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

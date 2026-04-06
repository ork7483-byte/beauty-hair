'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUploader from '@/app/components/ImageUploader'

type VideoSize = 'square' | 'landscape'
type MotionEffect = 'camera' | 'bubble'
type GenState = 'idle' | 'generating' | 'complete'

const VIDEO_SIZES: { id: VideoSize; label: string; sub: string }[] = [
  { id: 'square', label: '정사각형', sub: '720 × 720' },
  { id: 'landscape', label: '가로형', sub: '1280 × 720' },
]

const GRADIENT_COLORS = [
  'from-sky-200 to-blue-400',
  'from-purple-200 to-fuchsia-400',
]

const SAMPLE_GRADIENTS = [
  'from-sky-200 to-blue-400',
  'from-purple-200 to-fuchsia-400',
  'from-emerald-200 to-teal-400',
  'from-amber-200 to-orange-400',
]

export default function AnimatedPage() {
  const [view, setView] = useState<'landing' | 'editor'>('landing')
  const [selectedSize, setSelectedSize] = useState<VideoSize>('square')
  const [motionEffect, setMotionEffect] = useState<MotionEffect>('camera')
  const [genState, setGenState] = useState<GenState>('idle')
  const [countdown, setCountdown] = useState(15)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleGenerate = () => {
    setGenState('generating')
    setCountdown(15)
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
    setCountdown(15)
  }

  // Landing view
  if (view === 'landing') {
    return (
      <div className="max-w-[440px] mx-auto min-h-[calc(100dvh-theme(spacing.16))] flex flex-col justify-between px-5 pt-5">
        <div>
          <h1 className="text-heading-3">움직이는 사진</h1>
          <div className="mt-8 flex flex-col gap-12">
            {/* Section 1 */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"시술 사진 1장이면 충분해요.\n생생한 영상으로 스타일을 살려드릴게요!"}</p>
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {SAMPLE_GRADIENTS.map((g, i) => (
                    <div key={i} className={`shrink-0 w-[192px] h-[128px] rounded-lg shadow-md bg-gradient-to-br ${g} border border-[rgba(15,15,15,0.12)]`} />
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-[#F3F3F3]" />

            {/* Section 2: bubble effect */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"두피 케어, 시술 과정처럼 따끈한 장면에는\n끓는 효과로 더욱 생동감 있게 표현해요."}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200">
                  <span className="text-4xl">🫧</span>
                </div>
              </div>
            </div>

            <hr className="border-[#F3F3F3]" />

            {/* Section 3: camera effect */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"헤어에 흐르는 윤기와 다양한 모습을\n카메라 무빙 효과로 강조해요!"}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-purple-100 to-fuchsia-200">
                  <span className="text-4xl">🎬</span>
                </div>
              </div>
            </div>

            {/* Warning box */}
            <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-3">
              <p className="text-xs text-[#92400E] leading-relaxed">
                <span className="font-semibold">유의사항:</span> 간혈적으로 예상과 다른 결과가 나올 수 있어요.
              </p>
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

          {/* Video Size */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">사이즈</p>
            <div className="space-y-2">
              {VIDEO_SIZES.map((s) => (
                <label
                  key={s.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSize === s.id
                      ? 'border-[#E11D48] bg-[#FFF1F2]'
                      : 'border-[#E5E7EB] hover:border-[#E11D48]'
                  }`}
                >
                  <input
                    type="radio"
                    name="videoSize"
                    value={s.id}
                    checked={selectedSize === s.id}
                    onChange={() => setSelectedSize(s.id)}
                    className="accent-[#E11D48]"
                  />
                  <div>
                    <p className={`text-sm font-medium ${selectedSize === s.id ? 'text-[#E11D48]' : 'text-[#111827]'}`}>
                      {s.label}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">{s.sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Motion Effect */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">모션 효과</p>
            <div className="space-y-3">
              {/* Camera Moving */}
              <button
                onClick={() => setMotionEffect('camera')}
                className={`w-full flex gap-3 p-3 rounded-xl border-2 text-left transition-colors ${
                  motionEffect === 'camera'
                    ? 'border-[#E11D48] bg-[#FFF1F2]'
                    : 'border-[#E5E7EB] hover:border-[#E11D48]'
                }`}
              >
                <div className={`w-16 h-16 rounded-lg flex-shrink-0 bg-gradient-to-br ${GRADIENT_COLORS[0]} flex items-center justify-center text-2xl`}>
                  🎥
                </div>
                <div>
                  <p className={`text-sm font-semibold ${motionEffect === 'camera' ? 'text-[#E11D48]' : 'text-[#111827]'}`}>
                    카메라 무빙
                  </p>
                  <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">
                    자연스러운 카메라 이동 효과로 사진에 생동감을 더합니다.
                  </p>
                </div>
              </button>

              {/* Bubble Motion */}
              <button
                onClick={() => setMotionEffect('bubble')}
                className={`w-full flex gap-3 p-3 rounded-xl border-2 text-left transition-colors ${
                  motionEffect === 'bubble'
                    ? 'border-[#E11D48] bg-[#FFF1F2]'
                    : 'border-[#E5E7EB] hover:border-[#E11D48]'
                }`}
              >
                <div className={`w-16 h-16 rounded-lg flex-shrink-0 bg-gradient-to-br ${GRADIENT_COLORS[1]} flex items-center justify-center text-2xl`}>
                  🫧
                </div>
                <div>
                  <p className={`text-sm font-semibold ${motionEffect === 'bubble' ? 'text-[#E11D48]' : 'text-[#111827]'}`}>
                    보글보글 모션
                  </p>
                  <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">
                    두피 케어 이미지로만 제작 가능합니다.
                  </p>
                </div>
              </button>
            </div>
          </section>

          {/* Warning */}
          <section>
            <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-3">
              <p className="text-xs text-[#92400E] leading-relaxed">
                <span className="font-semibold">유의사항:</span> 간혈적으로 예상과 다른 결과가 나올 수 있어요.
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
            영상 생성하기
          </button>
        </div>
      </div>

      {/* ---- Right Panel ---- */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-8">
        {genState === 'idle' && <AnimatedIdleState />}
        {genState === 'generating' && <AnimatedGeneratingState countdown={countdown} />}
        {genState === 'complete' && <AnimatedCompleteState size={selectedSize} onReset={handleReset} />}
      </div>
    </div>
  )
}

function AnimatedIdleState() {
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-xs">
      <div className="w-20 h-20 rounded-full bg-[#FFF1F2] flex items-center justify-center text-4xl">
        🎬
      </div>
      <p className="text-[#6B7280] text-sm leading-relaxed">
        헤어 사진을 업로드하고<br />
        <span className="font-medium text-[#111827]">영상 생성하기</span>를 눌러주세요
      </p>
    </div>
  )
}

function AnimatedGeneratingState({ countdown }: { countdown: number }) {
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const progress = ((15 - countdown) / 15) * circumference

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
      <p className="text-[#6B7280] text-sm">AI가 영상을 생성하고 있어요...</p>
    </div>
  )
}

function AnimatedCompleteState({ size, onReset }: { size: VideoSize; onReset: () => void }) {
  const isLandscape = size === 'landscape'
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-lg">
      <div
        className={`w-full rounded-xl bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 flex items-center justify-center shadow-sm ${
          isLandscape ? 'aspect-video' : 'aspect-square'
        }`}
      >
        <span className="text-5xl">🎬</span>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        <button className="px-5 py-2.5 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors">
          비디오 다운로드
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

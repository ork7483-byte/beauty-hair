'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUploader from '@/app/components/ImageUploader'

type PosterSize = 'portrait' | 'square' | 'landscape'
type ThemeCategory = '전체' | '메뉴홍보' | '이벤트' | '브랜드'
type GenState = 'idle' | 'generating' | 'complete'

const POSTER_SIZES: { id: PosterSize; label: string; sub: string; w: number; h: number }[] = [
  { id: 'portrait', label: '세로형 (A4)', sub: '860 × 1216', w: 860, h: 1216 },
  { id: 'square', label: '정사각형 (1:1)', sub: '800 × 800', w: 800, h: 800 },
  { id: 'landscape', label: '가로형 (16:10)', sub: '1280 × 800', w: 1280, h: 800 },
]

const THEME_CATEGORIES: ThemeCategory[] = ['전체', '메뉴홍보', '이벤트', '브랜드']

const GRADIENT_COLORS = [
  'from-rose-200 to-pink-300',
  'from-purple-200 to-fuchsia-300',
  'from-amber-200 to-orange-300',
  'from-sky-200 to-blue-300',
  'from-emerald-200 to-teal-300',
  'from-red-200 to-rose-300',
  'from-indigo-200 to-violet-300',
  'from-yellow-200 to-amber-300',
]

const THEME_PRESETS = [
  { id: 't1', label: '미니멀 화이트', category: '브랜드' },
  { id: 't2', label: '블랙 럭셔리', category: '브랜드' },
  { id: 't3', label: '봄 이벤트', category: '이벤트' },
  { id: 't4', label: '여름 프로모', category: '이벤트' },
  { id: 't5', label: '메뉴 그리드', category: '메뉴홍보' },
  { id: 't6', label: '가격표 스타일', category: '메뉴홍보' },
  { id: 't7', label: '브랜드 심볼', category: '브랜드' },
  { id: 't8', label: '시즌 특가', category: '이벤트' },
]

export default function PosterPage() {
  const [view, setView] = useState<'landing' | 'editor'>('landing')
  const [selectedSize, setSelectedSize] = useState<PosterSize>('portrait')
  const [activeCategory, setActiveCategory] = useState<ThemeCategory>('전체')
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [salonName, setSalonName] = useState('')
  const [treatmentName, setTreatmentName] = useState('')
  const [price, setPrice] = useState('')
  const [genState, setGenState] = useState<GenState>('idle')
  const [countdown, setCountdown] = useState(10)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const filteredThemes =
    activeCategory === '전체'
      ? THEME_PRESETS
      : THEME_PRESETS.filter((t) => t.category === activeCategory)

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

  const sizeConfig = POSTER_SIZES.find((s) => s.id === selectedSize)!

  // Landing view
  if (view === 'landing') {
    return (
      <div className="max-w-[440px] mx-auto min-h-[calc(100dvh-theme(spacing.16))] flex flex-col justify-between px-5 pt-5">
        <div>
          <h1 className="text-heading-3">포스터</h1>
          <div className="mt-8 flex flex-col gap-12">
            {/* Section 1: Description + Sample Gallery */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"계절 시술, 신메뉴가 출시되었나요?\n다양한 컨셉의 포스터를 만들어보세요"}</p>
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {GRADIENT_COLORS.slice(0, 4).map((g, i) => (
                    <div key={i} className={`shrink-0 w-[128px] h-[180px] rounded-lg shadow-md bg-gradient-to-br ${g} border border-[rgba(15,15,15,0.12)]`} />
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-[#F3F3F3]" />

            {/* Section 2: Feature description */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"다양한 스타일의 텍스트를\n원하는 곳에 추가할 수 있어요"}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-4xl">✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 pb-5 pt-4 bg-white">
          <div className="flex gap-3">
            <button className="flex-1 h-12 rounded-xl bg-[#CFDEff] text-[#4F46E5] font-semibold text-label-1">
              생성 내역
            </button>
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

          {/* Size Selection */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">사이즈 선택</p>
            <div className="space-y-2">
              {POSTER_SIZES.map((s) => (
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
                    name="size"
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

          {/* Theme Selection */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">테마 선택</p>
            {/* Category tabs */}
            <div className="flex gap-1 mb-3 flex-wrap">
              {THEME_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    activeCategory === cat
                      ? 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48]'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#E11D48]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Theme grid */}
            <div className="grid grid-cols-2 gap-2">
              {filteredThemes.map((theme, idx) => {
                const gradient = GRADIENT_COLORS[idx % GRADIENT_COLORS.length]
                const isSelected = selectedTheme === theme.id
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`flex flex-col items-center gap-1.5 group`}
                  >
                    <div
                      className={`w-full aspect-[3/4] rounded-lg bg-gradient-to-br ${gradient} transition-all ${
                        isSelected
                          ? 'ring-2 ring-[#E11D48] ring-offset-1'
                          : 'ring-1 ring-[#E5E7EB] group-hover:ring-[#E11D48]'
                      }`}
                    />
                    <span className={`text-xs ${isSelected ? 'text-[#E11D48] font-medium' : 'text-[#6B7280]'}`}>
                      {theme.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Text Inputs */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">텍스트 입력</p>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-[#6B7280] mb-1 block">살롱 이름</label>
                <input
                  type="text"
                  value={salonName}
                  onChange={(e) => setSalonName(e.target.value)}
                  placeholder="예: 드림헤어"
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#E11D48] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#6B7280] mb-1 block">시술 이름</label>
                <input
                  type="text"
                  value={treatmentName}
                  onChange={(e) => setTreatmentName(e.target.value)}
                  placeholder="예: 볼륨매직펌"
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#E11D48] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#6B7280] mb-1 block">가격</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="예: 80,000원"
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#E11D48] transition-colors"
                />
              </div>
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
            포스터 생성하기
          </button>
        </div>
      </div>

      {/* ---- Right Panel ---- */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-8">
        {genState === 'idle' && <PosterIdleState size={sizeConfig} />}
        {genState === 'generating' && <PosterGeneratingState countdown={countdown} />}
        {genState === 'complete' && <PosterCompleteState size={sizeConfig} onReset={handleReset} />}
      </div>
    </div>
  )
}

function PosterIdleState({ size }: { size: { label: string; w: number; h: number } }) {
  const ratio = size.w / size.h
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-xs">
      <div
        className="rounded-xl border-2 border-dashed border-[#E5E7EB] bg-white flex items-center justify-center"
        style={{ width: 200, height: Math.round(200 / ratio) }}
      >
        <div className="flex flex-col items-center gap-2 text-[#9CA3AF]">
          <span className="text-3xl">🖼️</span>
          <span className="text-xs">{size.label}</span>
        </div>
      </div>
      <p className="text-[#6B7280] text-sm leading-relaxed">
        사진과 테마를 선택하고<br />
        <span className="font-medium text-[#111827]">포스터 생성하기</span>를 눌러주세요
      </p>
    </div>
  )
}

function PosterGeneratingState({ countdown }: { countdown: number }) {
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
      <p className="text-[#6B7280] text-sm">AI가 포스터를 생성하고 있어요...</p>
    </div>
  )
}

function PosterCompleteState({ size, onReset }: { size: { w: number; h: number }; onReset: () => void }) {
  const ratio = size.w / size.h
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md">
      <div
        className="rounded-xl bg-gradient-to-br from-rose-100 via-pink-200 to-fuchsia-200 flex items-center justify-center shadow-sm w-full"
        style={{ aspectRatio: ratio }}
      >
        <span className="text-5xl">🖼️</span>
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

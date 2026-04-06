'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUploader from '@/app/components/ImageUploader'

type FontStyle = '고딕' | '명조' | '소프트'
type TextPosition = '상단' | '중앙' | '하단'
type GenState = 'idle' | 'generating' | 'complete'

const FONT_STYLES: FontStyle[] = ['고딕', '명조', '소프트']

const TEXT_COLORS = [
  { id: 'white', label: '흰색', color: '#FFFFFF' },
  { id: 'black', label: '검정', color: '#111827' },
  { id: 'primary', label: '레드', color: '#E11D48' },
  { id: 'gold', label: '골드', color: '#D4A843' },
  { id: 'gray', label: '그레이', color: '#6B7280' },
  { id: 'pink', label: '핑크', color: '#F9A8D4' },
]

const TEXT_POSITIONS: TextPosition[] = ['상단', '중앙', '하단']

const FONT_MAP: Record<FontStyle, string> = {
  '고딕': 'sans-serif',
  '명조': 'serif',
  '소프트': 'cursive',
}

const SAMPLE_GRADIENTS = [
  'from-rose-200 to-pink-300',
  'from-purple-200 to-fuchsia-300',
  'from-amber-200 to-orange-300',
  'from-sky-200 to-blue-300',
]

export default function TextOverlayPage() {
  const [view, setView] = useState<'landing' | 'editor'>('landing')
  const [text, setText] = useState('')
  const [fontStyle, setFontStyle] = useState<FontStyle>('고딕')
  const [textColor, setTextColor] = useState('white')
  const [position, setPosition] = useState<TextPosition>('중앙')
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

  const activeColor = TEXT_COLORS.find((c) => c.id === textColor)?.color ?? '#FFFFFF'

  // Landing view
  if (view === 'landing') {
    return (
      <div className="max-w-[440px] mx-auto min-h-[calc(100dvh-theme(spacing.16))] flex flex-col justify-between px-5 pt-5">
        <div>
          <h1 className="text-heading-3">텍스트 추가</h1>
          <div className="mt-8 flex flex-col gap-12">
            {/* Section 1 */}
            <div>
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"사진 위에 텍스트를 추가해보세요.\n다양한 폰트와 색상을 지원해요!"}</p>
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
              <p className="mb-4 text-heading-4 whitespace-pre-line">{"고딕, 명조, 소프트 등\n다양한 폰트 스타일을 선택할 수 있어요"}</p>
              <div className="rounded-xl border border-[#E7E7E7] bg-[#F3F3F3] overflow-hidden">
                <div className="aspect-[350/197] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-4xl">✏️</span>
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

          {/* Text Input */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">텍스트 입력</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="추가할 텍스트를 입력하세요&#10;예: 드림헤어 봄맞이 특가 이벤트"
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#E11D48] transition-colors resize-none"
            />
          </section>

          {/* Font Style */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">폰트 선택</p>
            <div className="flex rounded-lg overflow-hidden border border-[#E5E7EB]">
              {FONT_STYLES.map((f) => (
                <button
                  key={f}
                  onClick={() => setFontStyle(f)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                    fontStyle === f
                      ? 'bg-[#E11D48] text-white'
                      : 'bg-white text-[#6B7280] hover:bg-[#F9FAFB]'
                  }`}
                  style={{ fontFamily: FONT_MAP[f] }}
                >
                  {f}
                </button>
              ))}
            </div>
          </section>

          {/* Text Color */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-3">텍스트 색상</p>
            <div className="flex gap-3 flex-wrap">
              {TEXT_COLORS.map((c) => {
                const isSelected = textColor === c.id
                return (
                  <button
                    key={c.id}
                    onClick={() => setTextColor(c.id)}
                    title={c.label}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'border-[#E11D48] ring-2 ring-[#E11D48] ring-offset-1'
                        : 'border-[#E5E7EB] hover:border-[#E11D48]'
                    }`}
                    style={{
                      backgroundColor: c.color,
                      boxShadow: c.color === '#FFFFFF' ? 'inset 0 0 0 1px #E5E7EB' : undefined,
                    }}
                  />
                )
              })}
            </div>
          </section>

          {/* Text Position */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">위치</p>
            <div className="flex gap-2">
              {TEXT_POSITIONS.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-colors ${
                    position === pos
                      ? 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48]'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#E11D48]'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Generate button */}
        <div className="p-4 border-t border-[#E5E7EB] mt-auto">
          <button
            onClick={handleGenerate}
            disabled={genState === 'generating' || !text.trim()}
            className="w-full py-3 rounded-full bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base transition-colors"
          >
            텍스트 추가하기
          </button>
        </div>
      </div>

      {/* ---- Right Panel ---- */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-8">
        {genState === 'idle' && <TextOverlayIdleState />}
        {genState === 'generating' && <TextOverlayGeneratingState countdown={countdown} />}
        {genState === 'complete' && (
          <TextOverlayCompleteState
            text={text}
            fontStyle={fontStyle}
            color={activeColor}
            position={position}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  )
}

function TextOverlayIdleState() {
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-xs">
      <div className="w-20 h-20 rounded-full bg-[#FFF1F2] flex items-center justify-center text-4xl">
        ✍️
      </div>
      <p className="text-[#6B7280] text-sm leading-relaxed">
        사진을 업로드하고 텍스트를 입력한 후<br />
        <span className="font-medium text-[#111827]">텍스트 추가하기</span>를 눌러주세요
      </p>
    </div>
  )
}

function TextOverlayGeneratingState({ countdown }: { countdown: number }) {
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
      <p className="text-[#6B7280] text-sm">AI가 텍스트를 추가하고 있어요...</p>
    </div>
  )
}

function TextOverlayCompleteState({
  text,
  fontStyle,
  color,
  position,
  onReset,
}: {
  text: string
  fontStyle: FontStyle
  color: string
  position: TextPosition
  onReset: () => void
}) {
  const posClass =
    position === '상단'
      ? 'items-start pt-6'
      : position === '하단'
      ? 'items-end pb-6'
      : 'items-center'

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md">
      <div
        className={`w-full aspect-[3/4] rounded-xl bg-gradient-to-br from-rose-100 via-pink-200 to-fuchsia-200 flex flex-col justify-center shadow-sm relative overflow-hidden`}
      >
        <div className={`absolute inset-0 flex flex-col ${posClass} justify-start px-5`}
          style={{ justifyContent: position === '상단' ? 'flex-start' : position === '하단' ? 'flex-end' : 'center' }}
        >
          <p
            className="text-center px-2 font-bold text-lg leading-snug"
            style={{
              color,
              fontFamily: FONT_MAP[fontStyle],
              textShadow: color === '#FFFFFF' ? '0 1px 3px rgba(0,0,0,0.5)' : '0 1px 3px rgba(255,255,255,0.5)',
            }}
          >
            {text || '텍스트 미리보기'}
          </p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-6xl opacity-40">💇‍♀️</span>
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

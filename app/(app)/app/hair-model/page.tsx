'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUploader from '@/app/components/ImageUploader'
import { femaleModels, maleModels } from '@/app/data/mock'
import type { ModelPreset } from '@/app/types'

type Gender = 'female' | 'male'
type Pose = '정면' | '3/4' | '측면'
type Background = '살롱 내부' | '스튜디오' | '야외' | '단색'
type GenState = 'idle' | 'generating' | 'complete'

const POSES: Pose[] = ['정면', '3/4', '측면']
const BACKGROUNDS: Background[] = ['살롱 내부', '스튜디오', '야외', '단색']

const GRADIENT_COLORS = [
  'from-rose-200 to-pink-300',
  'from-purple-200 to-fuchsia-300',
  'from-amber-200 to-orange-300',
  'from-sky-200 to-blue-300',
  'from-emerald-200 to-teal-300',
  'from-red-200 to-rose-300',
  'from-indigo-200 to-violet-300',
  'from-yellow-200 to-amber-300',
  'from-cyan-200 to-sky-300',
  'from-lime-200 to-green-300',
]

export default function HairModelPage() {
  const [gender, setGender] = useState<Gender>('female')
  const [selectedModel, setSelectedModel] = useState<ModelPreset | null>(null)
  const [pose, setPose] = useState<Pose>('정면')
  const [background, setBackground] = useState<Background>('살롱 내부')
  const [genState, setGenState] = useState<GenState>('idle')
  const [countdown, setCountdown] = useState(10)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const models = gender === 'female' ? femaleModels : maleModels

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

  return (
    <div className="flex h-full">
      {/* ---- Left Panel ---- */}
      <div className="w-[320px] min-w-[320px] border-r border-[#E5E7EB] bg-white flex flex-col overflow-y-auto">
        <div className="p-5 space-y-5">
          {/* Section: 시술 사진 업로드 */}
          <section>
            <ImageUploader label="시술 사진 (뒷모습 / 옆모습)" />
          </section>

          {/* Section: 성별 탭 */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">모델 성별</p>
            <div className="flex rounded-lg overflow-hidden border border-[#E5E7EB]">
              {(['female', 'male'] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => { setGender(g); setSelectedModel(null) }}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    gender === g
                      ? 'bg-[#E11D48] text-white'
                      : 'bg-white text-[#6B7280] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {g === 'female' ? '여성' : '남성'}
                </button>
              ))}
            </div>
          </section>

          {/* Section: 모델 선택 */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">모델 선택</p>
            <div className={`grid gap-3 ${gender === 'female' ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {models.map((model, idx) => {
                const isSelected = selectedModel?.id === model.id
                const gradient = GRADIENT_COLORS[idx % GRADIENT_COLORS.length]
                return (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`flex flex-col items-center gap-1.5 group`}
                  >
                    <div
                      className={`w-full aspect-square rounded-full bg-gradient-to-br ${gradient} transition-all ${
                        isSelected
                          ? 'ring-2 ring-[#E11D48] ring-offset-2'
                          : 'ring-1 ring-[#E5E7EB] group-hover:ring-[#E11D48]'
                      }`}
                    />
                    <span className={`text-xs ${isSelected ? 'text-[#E11D48] font-medium' : 'text-[#6B7280]'}`}>
                      {model.name}
                    </span>
                  </button>
                )
              })}
            </div>
            <button className="mt-3 w-full py-2 rounded-lg border border-dashed border-[#E5E7EB] text-xs text-[#6B7280] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors">
              + 내 이미지 첨부
            </button>
          </section>

          {/* Section: 포즈 / 각도 */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">포즈 / 각도</p>
            <div className="flex gap-2 flex-wrap">
              {POSES.map((p) => (
                <button
                  key={p}
                  onClick={() => setPose(p)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    pose === p
                      ? 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48]'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#E11D48]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </section>

          {/* Section: 배경 */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">배경</p>
            <div className="flex gap-2 flex-wrap">
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setBackground(bg)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    background === bg
                      ? 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48]'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#E11D48]'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
            <button className="mt-2 w-full py-2 rounded-lg border border-dashed border-[#E5E7EB] text-xs text-[#6B7280] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors">
              + 내 이미지 첨부
            </button>
          </section>
        </div>

        {/* Generate button — sticky bottom */}
        <div className="p-4 border-t border-[#E5E7EB] mt-auto">
          <button
            onClick={handleGenerate}
            disabled={genState === 'generating'}
            className="w-full py-3 rounded-full bg-[#E11D48] hover:bg-[#BE185D] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base transition-colors"
          >
            생성하기
          </button>
        </div>
      </div>

      {/* ---- Right Panel ---- */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-8">
        {genState === 'idle' && <IdleState />}
        {genState === 'generating' && <GeneratingState countdown={countdown} />}
        {genState === 'complete' && <CompleteState onReset={handleReset} />}
      </div>
    </div>
  )
}

/* ----- Sub-components ----- */

function IdleState() {
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-xs">
      <div className="w-20 h-20 rounded-full bg-[#FFF1F2] flex items-center justify-center text-4xl">
        💇
      </div>
      <p className="text-[#6B7280] text-sm leading-relaxed">
        시술 사진을 업로드하고<br />
        <span className="font-medium text-[#111827]">생성하기</span>를 눌러주세요
      </p>
    </div>
  )
}

function GeneratingState({ countdown }: { countdown: number }) {
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const progress = ((10 - countdown) / 10) * circumference

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#E11D48"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-[#E11D48]">{countdown}</span>
        </div>
      </div>
      <p className="text-[#6B7280] text-sm">AI가 이미지를 생성하고 있어요...</p>
    </div>
  )
}

function CompleteState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md">
      {/* Result placeholder */}
      <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-br from-rose-100 via-pink-200 to-fuchsia-200 flex items-center justify-center shadow-sm">
        <span className="text-5xl">💇‍♀️</span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <button className="px-5 py-2.5 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white text-sm font-semibold transition-colors">
          다운로드
        </button>
        <button className="px-5 py-2.5 rounded-full border border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] text-sm font-semibold transition-colors">
          갤러리에 저장
        </button>
        <button className="px-5 py-2.5 rounded-full border border-[#E5E7EB] text-[#6B7280] hover:border-[#E11D48] hover:text-[#E11D48] text-sm font-medium transition-colors">
          SNS 변환
        </button>
      </div>

      <button
        onClick={onReset}
        className="text-xs text-[#9CA3AF] hover:text-[#6B7280] underline transition-colors"
      >
        다시 생성하기
      </button>
    </div>
  )
}

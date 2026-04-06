'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUploader from '@/app/components/ImageUploader'
import { femaleModels, maleModels } from '@/app/data/mock'
import type { ModelPreset } from '@/app/types'

type Gender = 'female' | 'male'
type Pose = '정면' | '3/4' | '측면'
type BgPreset = '살롱 내부' | '스튜디오' | '야외' | '단색'
type GenState = 'idle' | 'generating' | 'complete'
type ViewState = 'landing' | 'wizard' | 'editor'

const POSES: Pose[] = ['정면', '3/4', '측면']
const BG_PRESETS: BgPreset[] = ['살롱 내부', '스튜디오', '야외', '단색']

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

const SNS_PLATFORMS = [
  { id: 'insta-square', label: '인스타그램 정사각형', size: '1080×1080' },
  { id: 'insta-portrait', label: '인스타그램 세로형', size: '1080×1350' },
  { id: 'naver-place', label: '네이버 플레이스', size: '1200×750' },
]

const BG_FILTER_TABS = ['전체', '살롱', '야외', '단색', '스튜디오']

const BG_PRESET_LIST = [
  { id: 'salon-1', label: '살롱 인테리어', category: '살롱', gradient: 'from-amber-100 to-orange-200' },
  { id: 'salon-2', label: '모던 살롱', category: '살롱', gradient: 'from-zinc-100 to-slate-200' },
  { id: 'outdoor-1', label: '야외 공원', category: '야외', gradient: 'from-green-100 to-emerald-200' },
  { id: 'outdoor-2', label: '도심 거리', category: '야외', gradient: 'from-sky-100 to-blue-200' },
  { id: 'solid-white', label: '흰색 단색', category: '단색', gradient: 'from-gray-50 to-gray-100' },
  { id: 'solid-black', label: '검정 단색', category: '단색', gradient: 'from-gray-700 to-gray-900' },
  { id: 'studio-1', label: '스튜디오 조명', category: '스튜디오', gradient: 'from-purple-100 to-violet-200' },
  { id: 'studio-2', label: '화이트 스튜디오', category: '스튜디오', gradient: 'from-slate-50 to-gray-100' },
  { id: 'salon-3', label: '빈티지 살롱', category: '살롱', gradient: 'from-rose-100 to-pink-200' },
]

const SAMPLE_PHOTOS = [
  { id: 's1', gradient: 'from-rose-200 to-pink-300' },
  { id: 's2', gradient: 'from-purple-200 to-fuchsia-300' },
  { id: 's3', gradient: 'from-amber-200 to-orange-300' },
  { id: 's4', gradient: 'from-sky-200 to-blue-300' },
  { id: 's5', gradient: 'from-emerald-200 to-teal-300' },
  { id: 's6', gradient: 'from-red-200 to-rose-300' },
]

/* ───────────────────── Progress Bar ───────────────────── */
function WizardProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1 px-5 py-3 border-b border-[#E7E7E7] bg-white">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center flex-1">
          <div className={`flex-1 h-1.5 rounded-full transition-colors ${s <= step ? 'bg-[#4F46E5]' : 'bg-[#E7E7E7]'}`} />
        </div>
      ))}
      <span className="ml-2 text-xs text-[#878787] shrink-0">{step} / 4</span>
    </div>
  )
}

/* ───────────────────── Step 1: 사진 선택 ───────────────────── */
function Step1PhotoSelect({
  selectedPhotos,
  onTogglePhoto,
  onNext,
}: {
  selectedPhotos: string[]
  onTogglePhoto: (id: string) => void
  onNext: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h2 className="text-heading-3 text-[#0F0F0F]">
          사진 선택하기{' '}
          <span className="text-[#878787] text-body-1-medium">{selectedPhotos.length} / 10</span>
        </h2>
        <button className="text-sm text-[#4F46E5] underline">사진 업로드 가이드</button>
      </div>

      {/* Photo grid */}
      <div className="px-5 flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 gap-2">
          {/* Upload button */}
          <button className="aspect-square rounded-xl border-2 border-dashed border-[#E7E7E7] flex flex-col items-center justify-center gap-1 hover:border-[#4F46E5] hover:bg-[#F0F0FF] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="text-[10px] text-[#878787]">추가</span>
          </button>

          {/* Sample photos */}
          {SAMPLE_PHOTOS.map((photo) => {
            const isSelected = selectedPhotos.includes(photo.id)
            return (
              <button
                key={photo.id}
                onClick={() => onTogglePhoto(photo.id)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  isSelected ? 'border-[#4F46E5]' : 'border-transparent'
                }`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${photo.gradient}`} />
                <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#4F46E5] text-white text-[9px] font-bold">샘플</span>
                {isSelected && (
                  <div className="absolute inset-0 bg-[#4F46E5]/20 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[#4F46E5] flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-5 py-4 border-t border-[#E7E7E7] flex items-center gap-3">
        <button className="p-2.5 rounded-xl border border-[#E7E7E7] hover:bg-[#F3F3F3] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-4.34" />
          </svg>
        </button>
        <button
          onClick={onNext}
          disabled={selectedPhotos.length === 0}
          className="flex-1 py-3 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
        >
          선택 ({selectedPhotos.length}장)
        </button>
      </div>
    </div>
  )
}

/* ───────────────────── Step 2: 플랫폼 선택 ───────────────────── */
function Step2Platform({
  selectedPhotos,
  selectedPlatforms,
  onTogglePlatform,
  customWidth,
  customHeight,
  onCustomWidth,
  onCustomHeight,
  onNext,
  onBack,
}: {
  selectedPhotos: string[]
  selectedPlatforms: string[]
  onTogglePlatform: (id: string) => void
  customWidth: string
  customHeight: string
  onCustomWidth: (v: string) => void
  onCustomHeight: (v: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const [tab, setTab] = useState<'sns' | 'custom'>('sns')
  const canProceed = tab === 'sns' ? selectedPlatforms.length > 0 : (customWidth !== '' && customHeight !== '')

  return (
    <div className="flex flex-col h-full max-w-[440px] mx-auto w-full">
      <div className="px-5 pt-5 pb-4">
        <button onClick={onBack} className="mb-4 text-sm text-[#878787] flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          이전
        </button>
        <h1 className="text-heading-3 text-[#0F0F0F]">어떤 플랫폼에<br />필요한가요?</h1>
      </div>

      {/* Segment tab */}
      <div className="px-5">
        <div className="flex rounded-xl overflow-hidden border border-[#E7E7E7] bg-[#F3F3F3]">
          {(['sns', 'custom'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors rounded-xl ${
                tab === t ? 'bg-white text-[#0F0F0F] shadow-sm' : 'text-[#878787]'
              }`}
            >
              {t === 'sns' ? 'SNS' : '사이즈 직접 입력'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4 flex-1 overflow-y-auto">
        {tab === 'sns' ? (
          <div className="flex flex-col gap-2">
            {SNS_PLATFORMS.map((p) => {
              const isSelected = selectedPlatforms.includes(p.id)
              return (
                <button
                  key={p.id}
                  onClick={() => onTogglePlatform(p.id)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl border transition-colors ${
                    isSelected ? 'border-[#4F46E5] bg-[#F0F0FF]' : 'border-[#E7E7E7] bg-white'
                  }`}
                >
                  <div className="text-left">
                    <p className={`text-sm font-medium ${isSelected ? 'text-[#4F46E5]' : 'text-[#0F0F0F]'}`}>{p.label}</p>
                    <p className="text-xs text-[#878787] mt-0.5">{p.size}</p>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-[#E7E7E7]'
                  }`}>
                    {isSelected && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#878787]">최대 1500px까지 입력할 수 있어요</p>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-[#878787] mb-1 block">가로 (px)</label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => onCustomWidth(e.target.value)}
                  max={1500}
                  placeholder="1080"
                  className="w-full px-3 py-3 rounded-xl border border-[#E7E7E7] text-sm focus:outline-none focus:border-[#4F46E5]"
                />
              </div>
              <span className="text-[#878787] mt-5">×</span>
              <div className="flex-1">
                <label className="text-xs text-[#878787] mb-1 block">세로 (px)</label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => onCustomHeight(e.target.value)}
                  max={1500}
                  placeholder="1080"
                  className="w-full px-3 py-3 rounded-xl border border-[#E7E7E7] text-sm focus:outline-none focus:border-[#4F46E5]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom sticky */}
      <div className="px-5 py-4 border-t border-[#E7E7E7] flex items-center gap-3 bg-white">
        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#E7E7E7]">
          <div className={`w-full h-full bg-gradient-to-br ${GRADIENT_COLORS[0]}`} />
        </div>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 py-3 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
        >
          다음
        </button>
      </div>
    </div>
  )
}

/* ───────────────────── Step 3: 배경 설정 ───────────────────── */
function Step3Background({
  selectedPhotos,
  bgPrompt,
  onBgPrompt,
  selectedBgPreset,
  onSelectBgPreset,
  onNext,
  onBack,
}: {
  selectedPhotos: string[]
  bgPrompt: string
  onBgPrompt: (v: string) => void
  selectedBgPreset: string
  onSelectBgPreset: (id: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const [bgFilter, setBgFilter] = useState('전체')
  const [activeMethod, setActiveMethod] = useState<'text' | 'preset' | null>(null)

  const filteredPresets = bgFilter === '전체'
    ? BG_PRESET_LIST
    : BG_PRESET_LIST.filter((p) => p.category === bgFilter)

  const canProceed = bgPrompt.trim() !== '' || selectedBgPreset !== ''

  return (
    <div className="flex flex-col h-full max-w-[440px] mx-auto w-full">
      <div className="px-5 pt-5 pb-4">
        <button onClick={onBack} className="mb-4 text-sm text-[#878787] flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          이전
        </button>
        <h1 className="text-heading-3 text-[#0F0F0F]">배경을 설정해 주세요.</h1>
        <p className="mt-1.5 text-sm text-[#4F46E5] font-medium">2가지 방법 중, 하나만 선택 가능해요</p>
      </div>

      <div className="px-5 flex-1 overflow-y-auto flex flex-col gap-5">
        {/* Method 1: Text prompt */}
        <div
          className={`rounded-2xl border p-4 flex flex-col gap-3 transition-colors ${
            activeMethod === 'text' ? 'border-[#4F46E5]' : 'border-[#E7E7E7]'
          }`}
          onClick={() => { setActiveMethod('text'); onSelectBgPreset('') }}
        >
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              activeMethod === 'text' ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-[#E7E7E7]'
            }`}>
              {activeMethod === 'text' && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span className="text-sm font-medium text-[#0F0F0F]">텍스트로 배경 설명하기</span>
          </div>
          <textarea
            rows={3}
            value={bgPrompt}
            onChange={(e) => { onBgPrompt(e.target.value); setActiveMethod('text'); onSelectBgPreset('') }}
            onClick={(e) => e.stopPropagation()}
            placeholder="예) 깔끔한 살롱 배경으로 바꿔줘"
            className="w-full px-3 py-2.5 rounded-xl border border-[#E7E7E7] text-sm resize-none focus:outline-none focus:border-[#4F46E5] text-[#0F0F0F] placeholder:text-[#C7C7C7]"
          />
        </div>

        {/* Method 2: Preset */}
        <div
          className={`rounded-2xl border p-4 flex flex-col gap-3 transition-colors ${
            activeMethod === 'preset' ? 'border-[#4F46E5]' : 'border-[#E7E7E7]'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              activeMethod === 'preset' ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-[#E7E7E7]'
            }`}>
              {activeMethod === 'preset' && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span className="text-sm font-medium text-[#0F0F0F]">배경 프리셋 선택</span>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
            {BG_FILTER_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setBgFilter(t)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  bgFilter === t ? 'border-[#4F46E5] text-[#4F46E5] bg-[#F0F0FF]' : 'border-[#E7E7E7] text-[#878787]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Preset grid */}
          <div className="grid grid-cols-3 gap-2">
            {filteredPresets.map((preset) => {
              const isSelected = selectedBgPreset === preset.id
              return (
                <button
                  key={preset.id}
                  onClick={() => { onSelectBgPreset(preset.id); onBgPrompt(''); setActiveMethod('preset') }}
                  className={`flex flex-col rounded-xl overflow-hidden border-2 transition-all ${
                    isSelected ? 'border-[#4F46E5]' : 'border-transparent'
                  }`}
                >
                  <div className={`aspect-square bg-gradient-to-br ${preset.gradient}`} />
                  <p className="text-[10px] text-center py-1 text-[#333] leading-tight px-1 truncate">{preset.label}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom sticky */}
      <div className="px-5 py-4 border-t border-[#E7E7E7] flex items-center gap-3 bg-white">
        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#E7E7E7]">
          <div className={`w-full h-full bg-gradient-to-br ${GRADIENT_COLORS[0]}`} />
        </div>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 py-3 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
        >
          다음
        </button>
      </div>
    </div>
  )
}

/* ───────────────────── Step 4: 확인 ───────────────────── */
function Step4Confirm({
  selectedPhotos,
  selectedPlatforms,
  selectedBgPreset,
  bgPrompt,
  onGoToStep,
  onComplete,
  onBack,
}: {
  selectedPhotos: string[]
  selectedPlatforms: string[]
  selectedBgPreset: string
  bgPrompt: string
  onGoToStep: (step: number) => void
  onComplete: () => void
  onBack: () => void
}) {
  const platformLabel = selectedPlatforms.length > 0
    ? SNS_PLATFORMS.find((p) => p.id === selectedPlatforms[0])?.label ?? '선택된 플랫폼'
    : '직접 입력 사이즈'

  const bgLabel = selectedBgPreset
    ? BG_PRESET_LIST.find((p) => p.id === selectedBgPreset)?.label ?? '선택된 배경'
    : bgPrompt || '텍스트 프롬프트'

  const bgGradient = selectedBgPreset
    ? BG_PRESET_LIST.find((p) => p.id === selectedBgPreset)?.gradient ?? GRADIENT_COLORS[2]
    : GRADIENT_COLORS[2]

  const generatedCount = selectedPhotos.length * selectedPlatforms.length || selectedPhotos.length

  return (
    <div className="flex flex-col h-full max-w-[440px] mx-auto w-full">
      <div className="px-5 pt-5 pb-4">
        <button onClick={onBack} className="mb-4 text-sm text-[#878787] flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          이전
        </button>
        <h2 className="text-heading-3 text-[#0F0F0F] whitespace-pre-line">
          아래 선택한 사진에{'\n'}
          <span className="text-[#4F46E5]">{platformLabel}</span>,{'\n'}
          <span className="text-[#4F46E5]">{bgLabel}</span>을 적용할게요
        </h2>
      </div>

      <div className="px-5 flex-1 overflow-y-auto flex flex-col gap-4">
        {/* Summary card */}
        <div className="rounded-3xl bg-[#F3F3F3] overflow-hidden divide-y divide-white">
          {/* Row 1: Photos */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${GRADIENT_COLORS[0]} shrink-0`} />
              <div>
                <p className="text-sm font-medium text-[#0F0F0F]">선택한 사진 {selectedPhotos.length}장</p>
              </div>
            </div>
            <button
              onClick={() => onGoToStep(1)}
              className="text-sm text-[#4F46E5] font-medium"
            >
              수정
            </button>
          </div>

          {/* Row 2: Platform */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E0E7FF] flex items-center justify-center shrink-0">
                <span className="text-lg">📱</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F0F0F]">{platformLabel}</p>
              </div>
            </div>
            <button
              onClick={() => onGoToStep(2)}
              className="text-sm text-[#4F46E5] font-medium"
            >
              수정
            </button>
          </div>

          {/* Row 3: Background */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bgGradient} shrink-0`} />
              <div>
                <p className="text-sm font-medium text-[#0F0F0F]">{bgLabel}</p>
              </div>
            </div>
            <button
              onClick={() => onGoToStep(3)}
              className="text-sm text-[#4F46E5] font-medium"
            >
              수정
            </button>
          </div>
        </div>

        {/* Generation preview */}
        <div className="px-4 py-3 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2">
          <span className="text-lg">✨</span>
          <p className="text-sm font-medium text-[#16A34A]">생성될 사진 +{generatedCount}장</p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 py-4 border-t border-[#E7E7E7] bg-white">
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white text-base font-semibold transition-colors"
        >
          이대로 만들기
        </button>
      </div>
    </div>
  )
}

/* ───────────────────── Wizard Shell ───────────────────── */
function WizardView({ onComplete }: { onComplete: () => void }) {
  const [wizardStep, setWizardStep] = useState(1)
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [bgPrompt, setBgPrompt] = useState('')
  const [selectedBgPreset, setSelectedBgPreset] = useState('')

  const togglePhoto = (id: string) => {
    setSelectedPhotos((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 10 ? [...prev, id] : prev
    )
  }

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <WizardProgress step={wizardStep} />
      <div className="flex-1 overflow-hidden flex flex-col">
        {wizardStep === 1 && (
          <Step1PhotoSelect
            selectedPhotos={selectedPhotos}
            onTogglePhoto={togglePhoto}
            onNext={() => setWizardStep(2)}
          />
        )}
        {wizardStep === 2 && (
          <Step2Platform
            selectedPhotos={selectedPhotos}
            selectedPlatforms={selectedPlatforms}
            onTogglePlatform={togglePlatform}
            customWidth={customWidth}
            customHeight={customHeight}
            onCustomWidth={setCustomWidth}
            onCustomHeight={setCustomHeight}
            onNext={() => setWizardStep(3)}
            onBack={() => setWizardStep(1)}
          />
        )}
        {wizardStep === 3 && (
          <Step3Background
            selectedPhotos={selectedPhotos}
            bgPrompt={bgPrompt}
            onBgPrompt={setBgPrompt}
            selectedBgPreset={selectedBgPreset}
            onSelectBgPreset={setSelectedBgPreset}
            onNext={() => setWizardStep(4)}
            onBack={() => setWizardStep(2)}
          />
        )}
        {wizardStep === 4 && (
          <Step4Confirm
            selectedPhotos={selectedPhotos}
            selectedPlatforms={selectedPlatforms}
            selectedBgPreset={selectedBgPreset}
            bgPrompt={bgPrompt}
            onGoToStep={setWizardStep}
            onComplete={onComplete}
            onBack={() => setWizardStep(3)}
          />
        )}
      </div>
    </div>
  )
}

/* ───────────────────── Landing View ───────────────────── */
function LandingView({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-[#FAFAFA] p-8 gap-6">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center text-5xl shadow-md">
        💇
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#0F0F0F]">AI 헤어 모델컷</h2>
        <p className="mt-2 text-sm text-[#6F6F6F] leading-relaxed">
          시술 사진으로 AI 모델컷을 만들어보세요.<br />
          10초 만에 SNS용 사진 완성!
        </p>
      </div>
      <button
        onClick={onStart}
        className="px-8 py-3.5 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-base font-semibold transition-colors shadow-md"
      >
        새로 만들기
      </button>
    </div>
  )
}

/* ───────────────────── Editor View (original) ───────────────────── */
function EditorView({ onReset }: { onReset: () => void }) {
  const [gender, setGender] = useState<Gender>('female')
  const [selectedModel, setSelectedModel] = useState<ModelPreset | null>(null)
  const [pose, setPose] = useState<Pose>('정면')
  const [background, setBackground] = useState<BgPreset>('살롱 내부')
  const [genState, setGenState] = useState<GenState>('generating')
  const [countdown, setCountdown] = useState(10)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const models = gender === 'female' ? femaleModels : maleModels

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

  return (
    <div className="flex h-full">
      {/* Left Panel */}
      <div className="w-[320px] min-w-[320px] border-r border-[#E5E7EB] bg-white flex flex-col overflow-y-auto">
        <div className="p-5 space-y-5">
          <section>
            <ImageUploader label="시술 사진 (뒷모습 / 옆모습)" />
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-2">모델 성별</p>
            <div className="flex rounded-lg overflow-hidden border border-[#E5E7EB]">
              {(['female', 'male'] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => { setGender(g); setSelectedModel(null) }}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    gender === g ? 'bg-[#4F46E5] text-white' : 'bg-white text-[#6B7280] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {g === 'female' ? '여성' : '남성'}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-2">모델 선택</p>
            <div className={`grid gap-3 ${gender === 'female' ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {models.map((model, idx) => {
                const isSelected = selectedModel?.id === model.id
                const gradient = GRADIENT_COLORS[idx % GRADIENT_COLORS.length]
                return (
                  <button key={model.id} onClick={() => setSelectedModel(model)} className="flex flex-col items-center gap-1.5 group">
                    <div className={`w-full aspect-square rounded-full bg-gradient-to-br ${gradient} transition-all ${
                      isSelected ? 'ring-2 ring-[#4F46E5] ring-offset-2' : 'ring-1 ring-[#E5E7EB] group-hover:ring-[#4F46E5]'
                    }`} />
                    <span className={`text-xs ${isSelected ? 'text-[#4F46E5] font-medium' : 'text-[#6B7280]'}`}>{model.name}</span>
                  </button>
                )
              })}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-2">포즈 / 각도</p>
            <div className="flex gap-2 flex-wrap">
              {POSES.map((p) => (
                <button
                  key={p}
                  onClick={() => setPose(p)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    pose === p ? 'border-[#4F46E5] bg-[#F0F0FF] text-[#4F46E5]' : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#4F46E5]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-2">배경</p>
            <div className="flex gap-2 flex-wrap">
              {BG_PRESETS.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setBackground(bg)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    background === bg ? 'border-[#4F46E5] bg-[#F0F0FF] text-[#4F46E5]' : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#4F46E5]'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="p-4 border-t border-[#E5E7EB] mt-auto">
          <button
            onClick={onReset}
            className="w-full py-3 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-base transition-colors"
          >
            다시 만들기
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-8">
        {genState === 'generating' && <GeneratingState countdown={countdown} />}
        {genState === 'complete' && <CompleteState onReset={onReset} />}
      </div>
    </div>
  )
}

/* ───────────────────── Main Page ───────────────────── */
export default function HairModelPage() {
  const [view, setView] = useState<ViewState>('landing')

  return (
    <div className="flex h-full flex-col">
      {view === 'landing' && (
        <LandingView onStart={() => setView('wizard')} />
      )}
      {view === 'wizard' && (
        <WizardView onComplete={() => setView('editor')} />
      )}
      {view === 'editor' && (
        <EditorView onReset={() => setView('landing')} />
      )}
    </div>
  )
}

/* ───────────────────── Sub-components ───────────────────── */
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
            cx="50" cy="50" r={radius} fill="none" stroke="#4F46E5" strokeWidth="8"
            strokeLinecap="round" strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-[#4F46E5]">{countdown}</span>
        </div>
      </div>
      <p className="text-[#6B7280] text-sm">AI가 이미지를 생성하고 있어요...</p>
    </div>
  )
}

function CompleteState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md">
      <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-br from-rose-100 via-pink-200 to-fuchsia-200 flex items-center justify-center shadow-sm">
        <span className="text-5xl">💇‍♀️</span>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        <button className="px-5 py-2.5 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold transition-colors">
          다운로드
        </button>
        <button className="px-5 py-2.5 rounded-full border border-[#4F46E5] text-[#4F46E5] hover:bg-[#F0F0FF] text-sm font-semibold transition-colors">
          갤러리에 저장
        </button>
        <button className="px-5 py-2.5 rounded-full border border-[#E5E7EB] text-[#6B7280] hover:border-[#4F46E5] hover:text-[#4F46E5] text-sm font-medium transition-colors">
          SNS 변환
        </button>
      </div>
      <button onClick={onReset} className="text-xs text-[#9CA3AF] hover:text-[#6B7280] underline transition-colors">
        처음으로
      </button>
    </div>
  )
}

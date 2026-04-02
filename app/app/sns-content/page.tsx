'use client'

import { useState } from 'react'
import { snsFormats } from '../../data/mock'
import { SNSFormat } from '../../types'

const platformIcons: Record<string, string> = {
  Instagram: '📸',
  Naver: '🟢',
  KakaoTalk: '💛',
}

export default function SNSContentPage() {
  const [selectedFormat, setSelectedFormat] = useState<string>('sns-1')
  const [showText, setShowText] = useState(true)
  const [salonName, setSalonName] = useState('')
  const [treatmentName, setTreatmentName] = useState('')
  const [price, setPrice] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [isConverted, setIsConverted] = useState(false)
  const [isConverting, setIsConverting] = useState(false)

  const currentFormat: SNSFormat =
    snsFormats.find((f) => f.id === selectedFormat) ?? snsFormats[0]

  function getAspectStyle(format: SNSFormat) {
    const [w, h] = format.ratio.split(':').map(Number)
    return { aspectRatio: `${w} / ${h}` }
  }

  function handleConvert() {
    setIsConverting(true)
    setTimeout(() => {
      setIsConverting(false)
      setIsConverted(true)
    }, 1500)
  }

  function handleConvertAll() {
    setIsConverting(true)
    setTimeout(() => {
      setIsConverting(false)
      setIsConverted(true)
    }, 2000)
  }

  return (
    <div className="flex h-full min-h-screen">
      {/* Left Panel */}
      <div
        className="flex flex-col bg-white border-r border-[#E5E7EB] overflow-y-auto"
        style={{ width: 320, minWidth: 320 }}
      >
        <div className="px-5 py-5 space-y-6">

          {/* 이미지 선택 */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-3">
              이미지 선택
            </p>
            <button
              onClick={() => setHasImage(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 mb-3 rounded-lg border border-[#E5E7EB] bg-white text-sm font-medium text-[#374151] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors"
            >
              <span>📁</span>
              <span>갤러리에서 선택</span>
            </button>

            {!hasImage ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragOver(false); setHasImage(true) }}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                  isDragOver
                    ? 'border-[#E11D48] bg-[#FFF1F2]'
                    : 'border-[#E5E7EB] hover:border-[#E11D48]/50 hover:bg-[#FAFAFA]'
                }`}
              >
                <div className="text-3xl mb-2">🖼️</div>
                <p className="text-sm font-medium text-[#374151] mb-1">사진을 드래그하거나</p>
                <p className="text-xs text-[#9CA3AF] mb-3">클릭하여 파일 선택</p>
                <label className="inline-block cursor-pointer px-4 py-1.5 rounded-full border border-[#E5E7EB] text-xs text-[#6B7280] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors">
                  파일 선택
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={() => setHasImage(true)}
                  />
                </label>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-[#E5E7EB]">
                <div className="aspect-square bg-gradient-to-br from-[#FFF1F2] via-[#FECDD3] to-[#FDA4AF] flex items-center justify-center">
                  <span className="text-5xl">💇</span>
                </div>
                <button
                  onClick={() => { setHasImage(false); setIsConverted(false) }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white text-xs flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-3 py-2">
                  <span className="text-white text-xs">선택된 이미지</span>
                </div>
              </div>
            )}
          </section>

          {/* 플랫폼 선택 */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-3">
              플랫폼 선택
            </p>
            <div className="grid grid-cols-2 gap-2">
              {snsFormats.map((format: SNSFormat) => (
                <button
                  key={format.id}
                  onClick={() => { setSelectedFormat(format.id); setIsConverted(false) }}
                  className={`rounded-lg border-2 p-3 text-left transition-all ${
                    selectedFormat === format.id
                      ? 'border-[#E11D48] ring-2 ring-[#E11D48]/20 bg-[#FFF1F2]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#E11D48]/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{platformIcons[format.platform] ?? '📱'}</span>
                    <span className="text-xs font-semibold text-[#374151] leading-tight">
                      {format.name}
                    </span>
                  </div>
                  <span
                    className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded ${
                      selectedFormat === format.id
                        ? 'bg-[#E11D48] text-white'
                        : 'bg-[#F3F4F6] text-[#6B7280]'
                    }`}
                  >
                    {format.ratio}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* 텍스트 오버레이 */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48]">
                텍스트 오버레이 <span className="text-[#9CA3AF] font-normal normal-case tracking-normal">(선택)</span>
              </p>
              <button
                onClick={() => setShowText(!showText)}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  showText ? 'bg-[#E11D48]' : 'bg-[#E5E7EB]'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                    showText ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {showText && (
              <div className="space-y-2.5">
                <div>
                  <label className="block text-xs text-[#6B7280] mb-1">살롱명</label>
                  <input
                    type="text"
                    value={salonName}
                    onChange={(e) => setSalonName(e.target.value)}
                    placeholder="예: 헤어샷 살롱 강남점"
                    className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48]/20 placeholder:text-[#D1D5DB] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6B7280] mb-1">시술명</label>
                  <input
                    type="text"
                    value={treatmentName}
                    onChange={(e) => setTreatmentName(e.target.value)}
                    placeholder="예: 레이어드 커트 + C컬 펌"
                    className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48]/20 placeholder:text-[#D1D5DB] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6B7280] mb-1">가격</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="예: 89,000원"
                    className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48]/20 placeholder:text-[#D1D5DB] transition-colors"
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Convert Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-5 py-4 mt-auto space-y-2">
          <button
            onClick={handleConvert}
            disabled={!hasImage || isConverting}
            className={`w-full py-3 rounded-full text-sm font-semibold transition-colors ${
              hasImage && !isConverting
                ? 'bg-[#E11D48] hover:bg-[#BE185D] text-white'
                : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            {isConverting ? '변환 중...' : '변환하기'}
          </button>
          <button
            onClick={handleConvertAll}
            disabled={!hasImage || isConverting}
            className={`w-full py-2.5 rounded-full text-sm font-medium border transition-colors ${
              hasImage && !isConverting
                ? 'border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2]'
                : 'border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            전체 변환
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-[#FAFAFA] p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-[#111827]">SNS 콘텐츠 변환</h1>
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <span>{currentFormat.name}</span>
            <span className="px-2 py-0.5 bg-white border border-[#E5E7EB] rounded text-xs font-medium text-[#374151]">
              {currentFormat.ratio}
            </span>
            <span className="text-xs text-[#9CA3AF]">
              {currentFormat.width} × {currentFormat.height}
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <div
              className="w-full max-w-xs bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm relative"
              style={getAspectStyle(currentFormat)}
            >
              {isConverting ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFF1F2]">
                  <div className="w-10 h-10 border-4 border-[#E11D48]/20 border-t-[#E11D48] rounded-full animate-spin mb-3" />
                  <p className="text-sm text-[#E11D48] font-medium">변환 중...</p>
                </div>
              ) : isConverted ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFF1F2] via-[#FECDD3] to-[#FDA4AF] flex items-center justify-center">
                    <span className="text-6xl">💇</span>
                  </div>
                  {showText && (salonName || treatmentName || price) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-4">
                      {salonName && (
                        <p className="text-white text-xs font-bold mb-0.5">{salonName}</p>
                      )}
                      {treatmentName && (
                        <p className="text-white/90 text-xs mb-0.5">{treatmentName}</p>
                      )}
                      {price && (
                        <p className="text-[#FDA4AF] text-sm font-bold">{price}</p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
                  {hasImage ? (
                    <>
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FFF1F2] to-[#FECDD3] flex items-center justify-center mb-3 shadow-sm">
                        <span className="text-3xl">💇</span>
                      </div>
                      <p className="text-sm text-[#9CA3AF]">변환하기를 눌러주세요</p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3">
                        <span className="text-3xl">🖼️</span>
                      </div>
                      <p className="text-sm text-[#9CA3AF] text-center px-4">
                        이미지를 선택하면 미리보기가 표시됩니다
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-[#9CA3AF]">
              {currentFormat.platform} · {currentFormat.ratio} · {currentFormat.width}×{currentFormat.height}px
            </p>
          </div>
        </div>

        {isConverted && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-3">
              전체 포맷 미리보기
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {snsFormats.map((format: SNSFormat) => {
                const [w, h] = format.ratio.split(':').map(Number)
                const previewW = 64
                const previewH = Math.round((previewW * h) / w)
                return (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all ${
                      selectedFormat === format.id
                        ? 'border-[#E11D48] bg-[#FFF1F2]'
                        : 'border-[#E5E7EB] bg-white hover:border-[#E11D48]/50'
                    }`}
                  >
                    <div
                      className="bg-gradient-to-br from-[#FFF1F2] via-[#FECDD3] to-[#FDA4AF] rounded flex items-center justify-center"
                      style={{ width: previewW, height: previewH }}
                    >
                      <span className="text-xl">💇</span>
                    </div>
                    <span className="text-[10px] text-[#6B7280] whitespace-nowrap">{format.name}</span>
                    <span className="text-[10px] text-[#9CA3AF]">{format.ratio}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {isConverted && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white text-sm font-semibold transition-colors shadow-sm">
              다운로드
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#E5E7EB] text-sm font-medium text-[#374151] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors shadow-sm">
              전체 다운로드
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

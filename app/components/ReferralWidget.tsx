'use client'

import { useState } from 'react'

export default function ReferralWidget() {
  const [copied, setCopied] = useState(false)
  const totalInvites = 3
  const usedInvites = 0

  function handleCopy() {
    const link = `${window.location.origin}/invite?ref=DEMO_CODE`
    navigator.clipboard.writeText(link).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-[#FECDD3] bg-[#FFF1F2] px-4 py-4 space-y-3">
      {/* Header */}
      <div className="flex items-start gap-2">
        <span className="text-xl leading-none mt-0.5">🎁</span>
        <div>
          <p className="text-sm font-semibold text-[#111827] leading-snug">
            동료 원장님께 무료 체험 선물하기
          </p>
          <p className="text-xs text-[#6B7280] mt-0.5">
            지인이 구독하면 헤어 모델 10장 추가!
          </p>
        </div>
      </div>

      {/* Invite Count */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#6B7280]">남은 초대권</span>
        <span className="text-xs font-bold text-[#E11D48]">
          {totalInvites - usedInvites}/{totalInvites}
        </span>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-1.5">
        {Array.from({ length: totalInvites }).map((_, i) => (
          <span
            key={i}
            className={`flex-1 h-2 rounded-full ${
              i < usedInvites ? 'bg-[#E11D48]/30' : 'bg-[#E11D48]'
            }`}
          />
        ))}
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={`w-full py-2.5 rounded-full text-sm font-semibold transition-all ${
          copied
            ? 'bg-[#059669] text-white'
            : 'bg-[#E11D48] hover:bg-[#BE185D] text-white'
        }`}
      >
        {copied ? '✓ 복사됨!' : '초대 링크 복사'}
      </button>
    </div>
  )
}

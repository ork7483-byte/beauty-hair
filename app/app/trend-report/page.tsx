'use client'

import { useState } from 'react'

const FEATURE_CARDS = [
  {
    id: 'monthly',
    title: '이번 달 인기 스타일',
    desc: '전국 헤어샵 데이터 기반 TOP 10',
    from: 'from-rose-100',
    to: 'to-pink-200',
  },
  {
    id: 'regional',
    title: '지역별 트렌드',
    desc: '내 지역 고객이 원하는 스타일',
    from: 'from-purple-100',
    to: 'to-fuchsia-200',
  },
  {
    id: 'seasonal',
    title: '계절 추천 스타일',
    desc: '봄/여름/가을/겨울 맞춤 추천',
    from: 'from-sky-100',
    to: 'to-blue-200',
  },
]

export default function TrendReportPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4">
      <div className="max-w-[800px] mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#111827]">AI 트렌드 리포트</h1>
          <span className="bg-[#4F46E5] text-white text-xs px-2 py-0.5 rounded font-medium">BETA</span>
        </div>

        {/* Coming soon */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] py-16 px-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FFF1F2] to-[#FECDD3] flex items-center justify-center">
            <span className="text-5xl">📊</span>
          </div>
          <h2 className="text-xl font-bold text-[#111827] mb-2">서비스 준비 중입니다</h2>
          <p className="text-[#6B7280] text-sm leading-relaxed max-w-sm mx-auto">
            헤어 트렌드를 AI로 분석하는 기능을 준비하고 있어요.<br />
            출시 알림을 신청하면 가장 먼저 알려드릴게요.
          </p>
        </div>

        {/* Feature preview cards */}
        <div>
          <p className="text-sm font-semibold text-[#374151] mb-3">출시 예정 기능</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURE_CARDS.map((card) => (
              <div
                key={card.id}
                className={`rounded-2xl bg-gradient-to-br ${card.from} ${card.to} p-5 relative overflow-hidden`}
              >
                <div className="absolute top-3 right-3 text-[#9CA3AF]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <p className="font-semibold text-sm text-[#374151] mb-1">{card.title}</p>
                <p className="text-xs text-[#6B7280]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email notification */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
          <p className="text-sm font-semibold text-[#111827] mb-1">출시 알림 받기</p>
          <p className="text-xs text-[#9CA3AF] mb-4">출시되면 가장 먼저 이메일로 알려드릴게요</p>
          {submitted ? (
            <div className="flex items-center gap-2 py-3 px-4 bg-[#F0FDF4] rounded-xl border border-[#BBF7D0]">
              <span className="text-green-500">✓</span>
              <p className="text-sm text-green-700 font-medium">알림 신청이 완료됐어요!</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#E11D48] transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={!email.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                알림 신청
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

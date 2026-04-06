'use client'

import { useState } from 'react'

export default function AutoPostingPage() {
  const [month] = useState('2026년 4월')

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4">
      <div className="max-w-[640px] mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">SNS 정기 포스팅</h1>
          <p className="text-sm text-[#6B7280] mt-1">AI가 만든 홍보물을 SNS에 자동으로 발행해 드려요</p>
        </div>

        {/* Service intro card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#E11D48] to-[#BE185D] p-5 text-white">
          <p className="font-semibold text-base mb-2">매주 AI가 만든 홍보물을 자동으로 보내드려요</p>
          <ul className="space-y-1.5">
            {[
              '주 1회 자동으로 SNS 게시물 생성',
              '인스타그램 · 페이스북 동시 발행',
              '최신 헤어 트렌드 반영',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                <span className="text-white">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* SNS 연동 */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E5E7EB]">
            <p className="text-sm font-semibold text-[#111827]">SNS 연동</p>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F97316] via-[#EC4899] to-[#8B5CF6] flex items-center justify-center text-white text-sm font-bold">
                  IG
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111827]">인스타그램</p>
                  <p className="text-xs text-[#9CA3AF]">연동 전</p>
                </div>
              </div>
              <button className="px-4 py-1.5 rounded-full border border-[#E11D48] text-[#E11D48] text-xs font-medium hover:bg-[#FFF1F2] transition-colors">
                연동하기
              </button>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white text-sm font-bold">
                  f
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111827]">페이스북</p>
                  <p className="text-xs text-[#9CA3AF]">연동 전</p>
                </div>
              </div>
              <button className="px-4 py-1.5 rounded-full border border-[#E11D48] text-[#E11D48] text-xs font-medium hover:bg-[#FFF1F2] transition-colors">
                연동하기
              </button>
            </div>
          </div>
        </div>

        {/* 포스팅 내역 */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E5E7EB]">
            <p className="text-sm font-semibold text-[#111827]">포스팅 내역</p>
          </div>
          {/* Month navigator */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E7EB]">
            <button className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors text-sm">
              &lt;
            </button>
            <span className="text-sm font-medium text-[#111827]">{month}</span>
            <button className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors text-sm">
              &gt;
            </button>
          </div>
          {/* Empty state */}
          <div className="py-12 flex flex-col items-center gap-2">
            <span className="text-4xl">📭</span>
            <p className="text-sm text-[#9CA3AF]">만든 홍보물이 없어요</p>
            <p className="text-xs text-[#D1D5DB]">정기 포스팅을 시작하면 여기에 기록돼요</p>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-4 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold text-base transition-colors">
          정기 포스팅 시작하기
        </button>
      </div>
    </div>
  )
}

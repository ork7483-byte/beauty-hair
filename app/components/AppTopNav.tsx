'use client'

import Link from 'next/link'

/**
 * AppTopNav — 데스크톱 전용, 콘텐츠 영역 내부 상단에 위치
 * 원본: 로고 + 메뉴(요금제, 사진 업로드 가이드) 왼쪽, 유저명 + 크레딧 오른쪽
 * h-16 (64px = --header-height), border-b 없음
 */
export default function AppTopNav() {
  return (
    <nav className="hidden lg:flex items-center justify-between h-16 shrink-0">
      {/* Left — Logo + Nav links */}
      <div className="flex items-center gap-6">
        <Link href="/app" className="flex items-center gap-2 mr-4">
          <div className="w-7 h-7 rounded-lg bg-[#4F46E5] flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <span className="font-bold text-[14px] text-[#0F0F0F]">HairShot AI</span>
        </Link>
        <Link href="/pricing" className="px-2 py-1 text-body-3-medium rounded-lg text-[#333] hover:bg-[rgba(15,15,15,0.04)]">요금제</Link>
        <Link href="#" className="px-2 py-1 text-body-3-medium rounded-lg text-[#333] hover:bg-[rgba(15,15,15,0.04)]">사진 업로드 가이드</Link>
      </div>

      {/* Right — User info + Credits */}
      <div className="flex items-center gap-3">
        <Link href="#" className="flex items-center px-2 py-1 text-body-3-medium rounded-lg text-[#333] hover:bg-[rgba(15,15,15,0.04)]">원장님 님</Link>
        <Link href="#" className="pl-1 pr-[6px] h-7 flex items-center gap-1 text-label-3 rounded-lg border border-[#E7E7E7] bg-white hover:border-[#B7B7B7]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          <span>2장</span>
        </Link>
      </div>
    </nav>
  )
}

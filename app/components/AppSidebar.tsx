'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ── 사이드바 메뉴 구조 (원본: --nav-width: 252px, px-5, gap-8 between sections, p-2 gap-2 items) ── */
interface MenuItem {
  icon: string
  label: string
  href: string
  badge?: string
}

interface MenuSection {
  title?: string
  items: MenuItem[]
}

const menuSections: MenuSection[] = [
  {
    title: '추천 기능',
    items: [
      { icon: '💇', label: 'AI 모델컷 생성', href: '/app/hair-model' },
      { icon: '✨', label: '스타일 시뮬레이션', href: '/app/style-simulation' },
      { icon: '📸', label: 'SNS', href: '/app/sns-content' },
      { icon: '🖼️', label: '포스터', href: '/app/poster' },
      { icon: '🎞️', label: '움직이는 사진', href: '/app/animated' },
      { icon: '🖼️', label: '배경 제거', href: '/app/background-remove' },
    ],
  },
  {
    title: 'SNS 마케팅 사진',
    items: [
      { icon: '📸', label: '인스타 피드', href: '/app/sns-feed' },
      { icon: '🎬', label: '릴스 / 숏폼', href: '/app/reels' },
      { icon: '🟢', label: '네이버 플레이스', href: '/app/naver-place' },
    ],
  },
  {
    title: 'AI가 관리하는 내 매장',
    items: [
      { icon: '📅', label: 'SNS 정기 포스팅', href: '/app/auto-posting' },
      { icon: '📊', label: 'AI 트렌드 리포트', href: '/app/trend-report', badge: 'BETA' },
    ],
  },
  {
    title: '연동',
    items: [
      { icon: '🔗', label: '네이버 플레이스 연동', href: '/app/connect-naver' },
      { icon: '📱', label: '인스타그램 연동', href: '/app/connect-instagram' },
    ],
  },
  {
    title: '더 다양한 AI 기능',
    items: [
      { icon: '🎨', label: '헤어 컬러 변환', href: '/app/color-change', badge: 'NEW' },
      { icon: '🔍', label: '해상도 높이기', href: '/app/upscale' },
      { icon: '💡', label: '조명 & 그림자', href: '/app/lighting' },
      { icon: '✏️', label: '텍스트 추가', href: '/app/text-overlay' },
    ],
  },
]

/* 내가 만든 사진 썸네일 (원본: w-12 h-12, gap-1, first:pl-5 last:pr-5) */
const thumbGradients = [
  'from-rose-200 to-pink-300',
  'from-amber-200 to-orange-300',
  'from-purple-200 to-fuchsia-300',
  'from-sky-200 to-blue-300',
  'from-emerald-200 to-teal-300',
  'from-red-200 to-rose-300',
]

export default function AppSidebar() {
  const pathname = usePathname()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [popupPos, setPopupPos] = useState({ left: 0, bottom: 0 })

  // Calculate popup position when opened
  useEffect(() => {
    if (profileOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPopupPos({
        left: rect.right + 12,
        bottom: window.innerHeight - rect.bottom,
      })
    }
  }, [profileOpen])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        profileOpen &&
        btnRef.current && !btnRef.current.contains(target) &&
        popupRef.current && !popupRef.current.contains(target)
      ) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [profileOpen])

  return (
    <nav
      className="hidden lg:flex flex-col shrink-0 overflow-y-auto bg-[#F5F7FC] scrollbar-hide transition-all duration-300 sticky top-0 h-screen"
      style={{ width: '252px' }}
    >
      {/* 내가 만든 사진 — 원본: h-[110px] mb-8 pt-5, 썸네일 w-12 h-12 gap-1 */}
      <section>
        <div className="pt-5 flex flex-col gap-3 h-[110px] mb-8 overflow-hidden">
          <span className="text-body-3-medium text-[#6F6F6F] px-5">내가 만든 사진</span>
          <div className="flex gap-1 overflow-x-auto no-scrollbar cursor-grab select-none">
            {thumbGradients.map((g, i) => (
              <Link
                key={i}
                href="/app/gallery"
                className={`shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${g} border border-[#E7E7E7] object-cover ${i === 0 ? 'ml-5' : ''} ${i === thumbGradients.length - 1 ? 'mr-5' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* 추천 기능 — 원본: px-5, text-body-3-medium, items p-2 gap-2 */}
        <div className="px-5">
          <span className="text-body-3-medium text-[#6F6F6F]">추천 기능</span>
          <div className="pt-3 flex flex-col gap-2">
            {menuSections[0].items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-2 flex items-center gap-2 justify-between rounded-lg transition-colors ${
                    isActive ? 'bg-[rgba(15,15,15,0.08)]' : 'hover:bg-[rgba(15,15,15,0.04)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-4 h-4 flex items-center justify-center">{item.icon}</span>
                    <p className={`text-body-2-medium text-[#0F0F0F]`}>{item.label}</p>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1 py-[2px] rounded bg-[#CFDEff] text-[#105AFF]">{item.badge}</span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 나머지 섹션들 — 원본: gap-8 between sections, px-5 */}
      {menuSections.slice(1).map((section, si) => (
        <section key={si} className="px-5 mt-8">
          {section.title && (
            <span className="text-body-3-medium text-[#6F6F6F]">{section.title}</span>
          )}
          <div className="pt-3 flex flex-col gap-2">
            {section.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-2 flex items-center gap-2 justify-between rounded-lg transition-colors ${
                    isActive ? 'bg-[rgba(15,15,15,0.08)]' : 'hover:bg-[rgba(15,15,15,0.04)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-4 h-4 flex items-center justify-center">{item.icon}</span>
                    <p className={`text-body-2-medium text-[#0F0F0F]`}>{item.label}</p>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1 py-[2px] rounded bg-[#CFDEff] text-[#105AFF]">{item.badge}</span>
                  )}
                </Link>
              )
            })}
          </div>
        </section>
      ))}

      {/* Bottom — User Profile */}
      <div className="mt-auto px-5 py-4 relative" ref={profileRef}>
        {/* Profile Popup — rendered via portal to avoid overflow clipping */}
        {profileOpen && typeof document !== 'undefined' && createPortal(
          <div ref={popupRef} className="fixed w-[280px] bg-white rounded-2xl shadow-xl border border-[#E7E7E7] overflow-hidden z-[9999] animate-slideUp" style={{ left: popupPos.left, bottom: popupPos.bottom }}>
            {/* Header */}
            <div className="p-4 border-b border-[#F3F3F3]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <button className="flex items-center gap-1 font-semibold text-[14px] text-[#0F0F0F]">
                    원장님 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                  <p className="text-caption-1 text-[#878787]">user@email.com</p>
                </div>
                <button onClick={() => setProfileOpen(false)} className="w-6 h-6 flex items-center justify-center text-[#878787] hover:text-[#333]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              {/* Plan Card */}
              <div className="border border-[#E7E7E7] rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-body-3-medium text-[#6F6F6F]">사용중인 요금제 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2" className="inline"><polyline points="9 18 15 12 9 6"/></svg></span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded-md bg-[#FEF3C7] text-[#D97706] text-caption-2 font-bold">무료 D-30</span>
                  <span className="text-label-2 text-[#0F0F0F]">베이직</span>
                  <span className="text-body-3-regular text-[#6F6F6F] ml-auto">남은 콩 <strong className="text-[#0F0F0F]">105콩</strong></span>
                </div>
                <Link
                  href="/pricing"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center justify-center h-10 rounded-xl bg-[#4F46E5] text-white text-label-2 hover:bg-[#4338CA] transition-colors"
                >
                  프로 요금제로 업그레이드하기
                </Link>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link href="/pricing" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(15,15,15,0.04)] transition-colors">
                <span className="text-sm">💳</span>
                <span className="text-body-2-medium text-[#0F0F0F]">요금제</span>
              </Link>
              <Link href="/app/gallery" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(15,15,15,0.04)] transition-colors">
                <span className="text-sm">💰</span>
                <span className="text-body-2-medium text-[#0F0F0F]">콩 이용 내역</span>
              </Link>
              <Link href="/app/gallery" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(15,15,15,0.04)] transition-colors">
                <span className="text-sm">📋</span>
                <span className="text-body-2-medium text-[#0F0F0F]">결제 내역</span>
              </Link>
              <div className="my-1 border-t border-[#F3F3F3]" />
              <Link href="/app/guide" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(15,15,15,0.04)] transition-colors">
                <span className="text-sm">📖</span>
                <span className="text-body-2-medium text-[#0F0F0F]">사진 업로드 가이드</span>
              </Link>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(15,15,15,0.04)] transition-colors">
                <span className="text-sm">🎧</span>
                <span className="text-body-2-medium text-[#0F0F0F]">고객센터</span>
              </a>
            </div>
          </div>,
          document.body
        )}

        {/* Profile Button */}
        <button
          ref={btnRef}
          onClick={() => setProfileOpen(!profileOpen)}
          className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-[rgba(15,15,15,0.04)] cursor-pointer transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#4F46E5] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">원</span>
          </div>
          <span className="text-body-2-medium text-[#0F0F0F]">원장님 님</span>
        </button>
      </div>
    </nav>
  )
}

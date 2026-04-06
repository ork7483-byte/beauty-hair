'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ── 사이드바 메뉴 구조 (햄버거 메뉴에서 재사용) ── */
interface MenuItem {
  icon: string
  label: string
  href: string
  badge?: string
}

interface MenuSection {
  title: string
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

const thumbGradients = [
  'from-rose-200 to-pink-300',
  'from-amber-200 to-orange-300',
  'from-purple-200 to-fuchsia-300',
]

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* ── 모바일 헤더 (원본: sticky top-0, h-16, px-5) ── */}
      <header className="lg:hidden sticky top-0 h-16 bg-white flex items-center justify-between px-5 shrink-0 z-40">
        {/* Left — Logo */}
        <Link href="/app" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#4F46E5] flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <span className="font-bold text-[14px] text-[#0F0F0F]">HairShot AI</span>
        </Link>

        {/* Right — Credits + Hamburger */}
        <div className="flex items-center gap-3">
          <span className="pl-1 pr-[6px] h-7 flex items-center gap-1 text-label-3 rounded-lg border border-[#E7E7E7] bg-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            <span>2장</span>
          </span>
          {/* 햄버거 아이콘 (원본: ≡ 3줄) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="w-8 h-8 flex items-center justify-center"
            aria-label="메뉴 열기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── 햄버거 메뉴 오버레이 (원본 이미지3 구조) ── */}
      {menuOpen && (
        <>
          {/* 배경 딤 */}
          <div
            className="fixed inset-0 bg-black/40 z-50 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />

          {/* 메뉴 패널 — 원본: 하단에서 올라오는 full-height 시트 */}
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white overflow-y-auto animate-slideUp">
            {/* 상단 X 닫기 */}
            <div className="flex items-center justify-end px-5 pt-4 pb-2">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center"
                aria-label="메뉴 닫기"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* 유저 정보 (원본: 이름 > 화살표, 이메일) */}
            <div className="px-5 pb-4 border-b border-[#F3F3F3]">
              <div className="flex items-center gap-1">
                <p className="text-label-1 text-[#4F46E5]">원장님 님</p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
              <p className="mt-1 text-body-3-regular text-[#878787]">user@example.com</p>
            </div>

            {/* 요금제 + 크레딧 */}
            <div className="px-5 py-4 border-b border-[#F3F3F3]">
              <div className="flex items-center justify-between rounded-xl border border-[#E7E7E7] px-4 py-3">
                <span className="text-body-3-medium text-[#6F6F6F]">사용중인 요금제</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
              <div className="mt-3 grid grid-cols-2 text-center">
                <div>
                  <p className="text-body-3-medium text-[#878787]">무료</p>
                </div>
                <div>
                  <p className="text-body-3-medium text-[#878787]">남은 장 <span className="text-label-1 text-[#0F0F0F]">2장</span></p>
                </div>
              </div>
              <button className="mt-3 w-full py-3 rounded-xl bg-[#4F46E5] text-white text-label-1 text-center hover:bg-[#4338CA] transition-colors">
                프로 요금제 1개월 무료 체험하기
              </button>
            </div>

            {/* 내가 만든 사진 */}
            <div className="px-5 py-4 border-b border-[#F3F3F3]">
              <div className="flex items-center justify-between">
                <p className="text-heading-5">내가 만든 사진 · 8장</p>
                <div className="flex gap-1">
                  {thumbGradients.map((g, i) => (
                    <div key={i} className={`w-10 h-10 rounded-lg bg-gradient-to-br ${g} border border-[#E7E7E7]`} />
                  ))}
                </div>
              </div>
            </div>

            {/* 메뉴 섹션들 (원본 사이드바와 동일 구조) */}
            <div className="flex-1 pb-10">
              {menuSections.map((section, si) => (
                <div key={si} className="px-5 pt-5">
                  <p className="text-body-3-medium text-[#878787] mb-2">{section.title}</p>
                  <div className="flex flex-col">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`py-3 flex items-center gap-3 justify-between ${
                            isActive ? 'text-[#4F46E5]' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm w-4 h-4 flex items-center justify-center">{item.icon}</span>
                            <p className={`text-body-2-medium ${isActive ? 'text-[#4F46E5] font-semibold' : 'text-[#0F0F0F]'}`}>{item.label}</p>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1 py-[2px] rounded bg-[#CFDEff] text-[#4F46E5]">{item.badge}</span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

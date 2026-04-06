'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════════════════
   1. 슬라이드 배너 캐러셀 — 6개 슬라이드 (원본 구조 동일)
   ═══════════════════════════════════════════════════════════════════════ */
const bannerSlides = [
  {
    title: '카드 등록하면',
    titleAccent: '1개월 무료 체험',
    titleEnd: ' 시작!',
    desc: '프로 요금제 월 19,800원 → 0원',
    descStyle: 'inline-block px-3 py-1 rounded-full bg-white/80 border border-[#E7E7E7] text-sm font-medium text-[#333]',
    icons: ['💳', '📅'],
    bg: 'from-[#EEF2FF] to-[#E0E7FF]',
  },
  {
    title: '원장님! AI 헤어 모델컷이',
    titleAccent: '',
    titleEnd: '\n처음이신가요?',
    desc: 'HairShot AI 빠르게 시작하기',
    descStyle: 'text-sm text-[#6F6F6F]',
    icons: ['📱'],
    bg: 'from-[#F0FDF4] to-[#DCFCE7]',
  },
  {
    title: '대충 찍어도 OK!',
    titleAccent: '',
    titleEnd: '\nAI 헤어 모델컷 만들기',
    desc: '시술 사진, AI가 알아서 예쁘게',
    descStyle: 'text-sm text-[#6F6F6F]',
    icons: ['✨'],
    iconColors: ['from-cyan-300 to-cyan-500'],
    bg: 'from-[#ECFEFF] to-[#CFFAFE]',
  },
  {
    title: '모든 SNS에 헤어 사진',
    titleAccent: '',
    titleEnd: '\n한 번에 올리기',
    desc: '한 번에 모든 SNS 업로드 끝!',
    descStyle: 'text-sm text-[#6F6F6F]',
    icons: ['📸', '🟢', '💛'],
    bg: 'from-[#FFF7ED] to-[#FFEDD5]',
  },
  {
    title: '네이버 플레이스 쓰시는',
    titleAccent: '',
    titleEnd: '\n원장님 주목!',
    desc: '헤어 사진을 플레이스에 바로 올려요',
    descStyle: 'text-sm text-[#6F6F6F]',
    icons: ['🟢'],
    bg: 'from-[#F8FAFC] to-[#F1F5F9]',
  },
  {
    title: '매주 SNS에 올릴',
    titleAccent: '',
    titleEnd: '\n모델컷과 글 받아보기',
    desc: '귀찮은 SNS 홍보 대신 해드려요',
    descStyle: 'text-sm text-[#6F6F6F]',
    icons: ['📸', '📘'],
    iconColors: ['from-pink-400 to-purple-500', 'from-blue-400 to-blue-600'],
    bg: 'from-[#EEF2FF] to-[#E0E7FF]',
  },
]

function BannerCarousel() {
  const [current, setCurrent] = useState(0)
  const total = bannerSlides.length

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = bannerSlides[current]

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${slide.bg} p-5 min-h-[166px] transition-colors duration-500`}>
      <div className="flex items-center justify-between h-full">
        <div className="flex-1 pr-4">
          <h3 className="text-[18px] font-bold text-[#0F0F0F] leading-snug whitespace-pre-line">
            {slide.title}
            {slide.titleAccent && (
              <span className="text-[#4F46E5]"> {slide.titleAccent}</span>
            )}
            {slide.titleEnd}
          </h3>
          <p className={`mt-2 ${slide.descStyle}`}>
            {slide.desc}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {slide.icons.map((icon, i) => {
            const colors = slide.iconColors?.[i] || 'from-[#C7D2FE] to-[#A5B4FC]'
            return (
              <div
                key={i}
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors} flex items-center justify-center text-2xl shadow-md`}
              >
                {icon}
              </div>
            )
          })}
        </div>
      </div>

      {/* 원본: absolute top-[50%] translate-y-[-50%] p-1 bg-black-10 */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-[rgba(15,15,15,0.12)] z-10 rotate-180 flex items-center justify-center"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-[rgba(15,15,15,0.12)] z-10 flex items-center justify-center"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      {/* 원본: flex items-center gap-[2px] indicator dots */}
      <div className="absolute bottom-3 right-4 flex items-center gap-[2px]">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-[6px] h-[6px] rounded-full transition-colors ${
              i === current ? 'bg-[#0F0F0F]' : 'bg-[rgba(15,15,15,0.24)]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. 내가 만든 사진 — 가로 스크롤 썸네일
   원본: flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-2
   썸네일: w-20 h-20 rounded-xl border-[1px]
   ═══════════════════════════════════════════════════════════════════════ */
function MyPhotosSection() {
  const gradients = [
    'from-rose-200 to-pink-300',
    'from-amber-200 to-orange-300',
    'from-purple-200 to-fuchsia-300',
    'from-sky-200 to-blue-300',
    'from-emerald-200 to-teal-300',
    'from-red-200 to-rose-300',
    'from-indigo-200 to-violet-300',
    'from-yellow-200 to-amber-300',
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex gap-[6px] text-heading-4">
          내가 만든 사진 <span className="text-[#6F6F6F] text-body-2-medium">8장</span>
        </h3>
        <Link href="/app/gallery" className="flex items-center gap-1">
          <span className="text-body-3-medium text-[#878787] shrink-0">전체 보기</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </Link>
      </div>
      {/* 원본: flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-2 */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
          {gradients.map((g, i) => (
            <div
              key={i}
              className={`shrink-0 w-20 h-20 snap-start rounded-xl bg-gradient-to-br ${g} border border-[#E7E7E7] cursor-pointer hover:ring-2 hover:ring-[#4F46E5]/30 transition-all`}
            />
          ))}
        </div>
        {/* 원본: absolute left-0 h-20 w-5 bg-gradient-to-r from-white to-transparent */}
        <div className="absolute left-0 top-0 h-20 w-5 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. 내 SNS 사진 관리 — 네이버 플레이스 연동 카드
   원본: rounded-2xl border-[1px] border-gray-400, CTA: bg-primary-50 text-primary-500
   ═══════════════════════════════════════════════════════════════════════ */
function SNSManagementCard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 items-center justify-between">
        <h3 className="text-heading-4 truncate">내 SNS 사진 관리</h3>
        <Link href="/app/connect-naver" className="flex items-center gap-1">
          <span className="text-body-3-medium text-[#878787] shrink-0">전체 보기</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </Link>
      </div>
      <div className="flex flex-col rounded-2xl border border-[#E7E7E7] overflow-hidden">
        <Link href="/app/connect-naver">
          <div className="p-4 flex flex-col gap-4">
            {/* Platform icon + name */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#03C75A] flex items-center justify-center text-white text-lg font-bold shrink-0">N</div>
              <div className="min-w-0">
                <p className="text-label-1 text-[#333] truncate">내 네이버 플레이스</p>
                <p className="text-caption-1 text-[#878787]">연동 전</p>
              </div>
            </div>

            {/* Stats — 원본: grid grid-cols-3, divide, first:border-r last:border-l */}
            <div className="grid grid-cols-3 border-t border-b border-[#F3F3F3] divide-x divide-[#F3F3F3]">
              {[
                { label: '방문자 추이', icon: '📊' },
                { label: '리뷰 TOP3', icon: '⭐' },
                { label: '사진 등록 필요', icon: '📷' },
              ].map((s) => (
                <div key={s.label} className="w-full px-2 flex flex-col items-center justify-center gap-[0.625rem] py-4">
                  <div className="text-lg">{s.icon}</div>
                  <p className="text-center text-body-3-medium text-[#6F6F6F]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* 원본: py-4 px-5 text-center text-label-1 text-primary-500 bg-primary-50 */}
          <div className="py-4 px-5 text-center text-label-1 text-[#4F46E5] bg-[#F5F7FC]">
            네이버 플레이스 연동하고 사진 바로 올리기
          </div>
        </Link>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. 100% 무료로 시작해 보세요 — 2개 핵심 기능 카드
   원본: flex flex-col gap-3 tablet:flex-row (모바일 세로, 태블릿 가로)
   카드: rounded-2xl border-[1px] border-gray-400
   배지: py-1 px-2 text-caption-2 rounded-md text-primary-500 bg-primary-300
   ═══════════════════════════════════════════════════════════════════════ */
function FreeStartSection() {
  const features = [
    {
      title: 'AI 헤어 모델컷 생성',
      badge: '헤어 AI 사진 1위',
      gradient: 'from-indigo-100 to-purple-100',
      points: [
        'AI 모델로 초상권 걱정 없는 사진',
        '모든 SNS 플랫폼 사이즈 자동 생성',
        '시술 사진만 있으면 10초 만에',
      ],
      href: '/app/hair-model',
    },
    {
      title: '스타일 시뮬레이션',
      badge: '한 번에 최대 5스타일',
      gradient: 'from-emerald-100 to-teal-100',
      points: [
        '시술 전 결과를 고객에게 미리 보여주기',
        '최대 5가지 스타일 동시 비교',
        '바로 사용할 수 있는 상담용 이미지',
      ],
      href: '/app/style-simulation',
    },
  ]

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-heading-4">
        100% 무료로 시작해 보세요
      </h3>
      {/* 원본: flex flex-col gap-3 tablet:flex-row */}
      <div className="flex flex-col gap-3 lg:flex-row">
        {features.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="w-full flex flex-col rounded-2xl border border-[#E7E7E7] overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* 원본: aspect-[350/197] 이미지 영역 */}
            <div className={`aspect-[350/197] bg-gradient-to-br ${f.gradient} flex items-center justify-center`}>
              <div className="w-20 h-20 rounded-2xl bg-white/40 backdrop-blur flex items-center justify-center text-4xl">
                {f.title.includes('모델컷') ? '💇' : '✨'}
              </div>
            </div>
            {/* 원본: p-4 flex flex-col gap-2 */}
            <div className="p-4 flex flex-col gap-2">
              <span className="inline-flex items-center justify-center w-fit py-1 px-2 text-caption-2 rounded-md text-[#4F46E5] bg-[#CFDEff]">
                {f.badge}
              </span>
              <p className="text-left text-heading-5 text-[#333]">{f.title}</p>
              <ul className="w-full flex flex-col gap-1 text-body-3-regular text-[#6F6F6F] overflow-hidden">
                {f.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-left w-full min-w-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6F6F6F" strokeWidth="2.5" className="shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="block w-full truncate">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. 프로모션 배너 — 무료 체험 CTA
   원본: p-4 flex items-center gap-4 justify-between rounded-xl bg-primary-500 text-white
   ═══════════════════════════════════════════════════════════════════════ */
function PromoBanner() {
  return (
    <Link
      href="/pricing"
      className="p-4 flex items-center gap-4 justify-between rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] transition-colors text-white"
    >
      <div>
        <p className="text-label-1 text-left">프로 요금제 1개월 무료 체험 시작!</p>
        <p className="mt-1 text-left text-body-3-regular">
          월 <span className="line-through">19,800원</span> → <span className="text-label-2">0원</span>
        </p>
      </div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. SNS 마케팅 사진 만들기 — 세로 리스트 (모바일)
   원본: flex flex-col gap-3 tablet:hidden
   각 항목: h-[90px] flex items-center rounded-xl border-[1px] bg-white overflow-hidden
   이미지: w-[100px] h-full shrink-0 object-cover
   텍스트: px-4 py-5
   ═══════════════════════════════════════════════════════════════════════ */
function SNSMarketingSection() {
  const items = [
    {
      title: '인스타 피드',
      desc: '1:1 정사각형 피드 최적화 사진',
      gradient: 'from-pink-200 to-rose-300',
      icon: '📸',
      href: '/app/sns-content',
    },
    {
      title: '릴스 / 숏폼',
      desc: '9:16 세로형 숏폼 콘텐츠',
      gradient: 'from-purple-200 to-violet-300',
      icon: '🎬',
      href: '/app/reels',
    },
    {
      title: '네이버 플레이스',
      desc: '네이버, 카카오맵 등 지도앱 사진',
      gradient: 'from-green-200 to-emerald-300',
      icon: '🗺️',
      href: '/app/naver-place',
    },
  ]

  return (
    <div>
      <h3 className="mb-5 text-heading-4 lg:text-heading-3 lg:mb-6">
        SNS 마케팅 사진 만들기
      </h3>

      {/* 모바일: 세로 리스트 (원본 구조) */}
      <div className="flex flex-col gap-3 lg:hidden">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="h-[90px] flex items-center rounded-xl border border-[#E7E7E7] bg-white overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* 원본: w-[100px] h-full shrink-0 object-cover 이미지 대신 그라디언트 */}
            <div className={`w-[100px] h-full shrink-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl`}>
              {item.icon}
            </div>
            <div className="px-4 py-5">
              <p className="text-heading-5 text-left">{item.title}</p>
              <p className="mt-1 text-body-3-regular text-[#878787] text-left">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 데스크톱: 3열 그리드 (원본 tablet 이상) */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex flex-col rounded-xl border border-[#E7E7E7] overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`aspect-square bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
              <div className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur flex items-center justify-center text-3xl">
                {item.icon}
              </div>
            </div>
            <div className="p-3">
              <p className="text-heading-5 text-left">{item.title}</p>
              <p className="mt-1 text-body-3-regular text-[#878787] text-left">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 인스타그램 연동 안내 배너 — 원본 구조 */}
      <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E7E7E7]">
        <div>
          <p className="text-label-1 text-[#333] lg:text-body-1-medium">인스타그램 연동하시는 원장님 주목!</p>
          <p className="mt-1 text-body-3-regular text-[#878787]">생성된 사진을 인스타에 바로 올려요</p>
        </div>
        <button className="shrink-0 px-3 py-1.5 rounded-lg bg-white border border-[#E7E7E7] text-label-3 text-[#333] hover:bg-[#F3F3F3] transition-colors">
          연동
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. 더 다양한 AI 기능 모아보기 — 2x4 그리드
   원본: grid grid-cols-2 gap-3 desktop:grid-cols-4
   카드: flex flex-col rounded-xl border-[1px] border-gray-400 overflow-hidden
   이미지: h-[113px] w-full border-b-[1px] border-gray-400 object-cover
   텍스트: p-4 text-[1rem] font-semibold
   ═══════════════════════════════════════════════════════════════════════ */
function MoreFeaturesSection() {
  const features = [
    { title: 'SNS 콘텐츠', icon: '📸', gradient: 'from-pink-200 to-rose-300', href: '/app/sns-content' },
    { title: '포스터', icon: '🖼️', gradient: 'from-amber-200 to-orange-300', href: '/app/poster' },
    { title: '움직이는 사진', icon: '🎞️', gradient: 'from-purple-200 to-fuchsia-300', href: '/app/animated' },
    { title: '헤어 컬러 변환', icon: '🎨', gradient: 'from-emerald-200 to-teal-300', href: '/app/color-change', badge: 'NEW' },
    { title: '해상도 높이기', icon: '🔍', gradient: 'from-sky-200 to-blue-300', href: '/app/upscale' },
    { title: '조명 & 그림자', icon: '💡', gradient: 'from-yellow-200 to-amber-300', href: '/app/lighting' },
    { title: '텍스트 추가', icon: '✏️', gradient: 'from-red-200 to-rose-300', href: '/app/text-overlay' },
    { title: 'SNS 정기 포스팅', icon: '📅', gradient: 'from-indigo-200 to-violet-300', href: '/app/auto-posting', badge: '자동 업로드 설정' },
  ]

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <h3 className="text-[20px] font-semibold lg:text-[24px]">
        더 다양한 AI 기능 모아보기
      </h3>
      {/* 원본: grid grid-cols-2 gap-3 desktop:grid-cols-4 */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {features.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="relative flex flex-col rounded-xl border border-[#E7E7E7] overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* 원본: h-[113px] w-full border-b-[1px] border-gray-400 object-cover */}
            <div className={`h-[113px] w-full border-b border-[#E7E7E7] bg-gradient-to-br ${f.gradient} flex items-center justify-center`}>
              <span className="text-3xl">{f.icon}</span>
              {f.badge && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-caption-2 bg-[#4F46E5] text-white leading-none">
                  {f.badge}
                </span>
              )}
            </div>
            {/* 원본: p-4 text-[1rem] font-semibold */}
            <p className="p-4 text-[1rem] font-semibold">{f.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. Footer (앱 내부)
   원본: border-t-[1px] border-gray-300, h-[23rem], text-[0.875rem], text-black-50
   내부: pt-10 flex flex-col items-start gap-[0.625rem]
   ═══════════════════════════════════════════════════════════════════════ */
function AppFooter() {
  return (
    <div className="border-t border-[#F3F3F3] -mx-4 lg:-mx-5 xl:-mx-20 px-5 bg-white lg:px-0">
      <footer className="h-[23rem] w-full text-[0.875rem] text-[rgba(15,15,15,0.5)]">
        <div className="pt-10 flex flex-col items-start gap-[0.625rem]">
          <div className="flex flex-col gap-[0.625rem]">
            <p>(주)헤어샷에이아이</p>
            <p>대표자: 홍길동</p>
            <p>사업자등록번호: 000-00-00000</p>
            <p>본사: 서울특별시 강남구 테헤란로 123</p>
            <a href="#" className="underline self-start">사업자정보확인</a>
            <div className="flex divide-x gap-3">
              <a href="#" className="underline">개인정보처리방침</a>
              <a href="#" className="underline pl-3">이용약관</a>
            </div>
            <p>v1.0.0</p>
            <p>&copy; HairShot AI, all rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Dashboard Page — 원본 섹션 순서: px-5 tablet:px-0 간격
   ═══════════════════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 1. 슬라이드 배너 캐러셀 (6개) */}
      <BannerCarousel />

      {/* 2. 내가 만든 사진 */}
      <MyPhotosSection />

      {/* 3. 내 SNS 사진 관리 */}
      <SNSManagementCard />

      {/* 4. 100% 무료로 시작해 보세요 */}
      <FreeStartSection />

      {/* 5. 프로모션 배너 */}
      <PromoBanner />

      {/* 6. SNS 마케팅 사진 만들기 */}
      <SNSMarketingSection />

      {/* 7. 더 다양한 AI 기능 모아보기 */}
      <MoreFeaturesSection />

      {/* 8. 앱 내부 Footer */}
      <AppFooter />
    </div>
  )
}

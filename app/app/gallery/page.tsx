'use client'

import { useState } from 'react'
import Link from 'next/link'

const ARCHIVE_CATEGORIES = [
  { id: 'all', label: '전체 보기', icon: '📋', count: 12 },
  { id: 'modelcut', label: '모델컷', icon: '💇', count: 3 },
  { id: 'sns', label: 'SNS', icon: '📸', count: 2 },
  { id: 'poster', label: '포스터', icon: '🖼️', count: 2 },
  { id: 'animated', label: '움직이는', icon: '🎞️', count: 1 },
  { id: 'bg-remove', label: '배경제거', icon: '✂️', count: 1 },
  { id: 'color', label: '컬러변환', icon: '🎨', count: 1 },
  { id: 'lighting', label: '조명', icon: '💡', count: 1 },
  { id: 'text', label: '텍스트', icon: '✏️', count: 1 },
]

const ARCHIVE_ITEMS = [
  { id: 1, type: 'modelcut', title: '레이어드 커트', detail: 'AI 모델컷 / 여성 / 정면', gradient: 'from-rose-200 to-pink-300', cost: 10 },
  { id: 2, type: 'modelcut', title: 'C컬 펌', detail: 'AI 모델컷 / 여성 / 3/4', gradient: 'from-purple-200 to-fuchsia-300', cost: 10 },
  { id: 3, type: 'sns', title: '인스타 피드', detail: '인스타그램 세로형 / 크리스마스 특별', gradient: 'from-amber-200 to-orange-300', cost: 20 },
  { id: 4, type: 'poster', title: '포스터', detail: '세로형 / 신메뉴 알림', gradient: 'from-sky-200 to-blue-300', cost: 20 },
  { id: 5, type: 'animated', title: '움직이는 사진', detail: '정사각형 / 카메라 무빙', gradient: 'from-emerald-200 to-teal-300', cost: 30 },
  { id: 6, type: 'modelcut', title: '댄디컷', detail: 'AI 모델컷 / 남성 / 정면', gradient: 'from-red-200 to-rose-300', cost: 10 },
  { id: 7, type: 'poster', title: '포스터', detail: '가로형 / 겨울 도시 야경', gradient: 'from-indigo-200 to-violet-300', cost: 20 },
  { id: 8, type: 'sns', title: 'SNS 콘텐츠', detail: '인스타그램 정사각형 / 여름 해변', gradient: 'from-yellow-200 to-amber-300', cost: 20 },
  { id: 9, type: 'bg-remove', title: '배경 제거', detail: '배경 제거(투명) 완료', gradient: 'from-gray-200 to-gray-300', cost: 10 },
  { id: 10, type: 'color', title: '컬러 변환', detail: '애쉬 그레이 변환', gradient: 'from-slate-200 to-zinc-300', cost: 10 },
  { id: 11, type: 'lighting', title: '조명 & 그림자', detail: '자연광 적용', gradient: 'from-orange-200 to-yellow-300', cost: 10 },
  { id: 12, type: 'text', title: '텍스트 추가', detail: '고딕 / 흰색 / 상단', gradient: 'from-cyan-200 to-sky-300', cost: 10 },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [alertVisible, setAlertVisible] = useState(true)

  const filtered =
    activeCategory === 'all'
      ? ARCHIVE_ITEMS
      : ARCHIVE_ITEMS.filter((item) => item.type === activeCategory)

  const totalCount = ARCHIVE_ITEMS.length

  return (
    <div className="max-w-[440px] mx-auto pb-32">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <p className="text-label-1 text-[#878787]">총 {totalCount}장</p>
        <h1 className="text-heading-3 text-[#0F0F0F] mt-1">내가 만든 사진</h1>
      </div>

      {/* Category Filter — horizontal scroll */}
      <div className="px-5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 snap-x snap-mandatory pb-2" style={{ width: 'max-content' }}>
          {ARCHIVE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-start flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-[#4F46E5] text-[#4F46E5] bg-[#F0F0FF]'
                    : 'border-[#E7E7E7] text-[#878787] bg-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                {isActive && (
                  <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-[#4F46E5] text-white text-[10px] font-bold leading-none">
                    {cat.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Alert Banner */}
      {alertVisible && (
        <div className="mx-5 mt-4 flex items-center justify-between px-4 py-3 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE]">
          <p className="text-sm text-[#4F46E5] font-medium">1장 완료! 생성된 사진을 확인해 보세요.</p>
          <button
            onClick={() => setAlertVisible(false)}
            className="ml-3 text-[#4F46E5] hover:text-[#3730A3] transition-colors shrink-0"
            aria-label="닫기"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Result Cards */}
      <div className="px-5 mt-4 flex flex-col gap-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-4xl mb-3">📭</span>
            <p className="text-[#878787] text-sm">해당 카테고리에 사진이 없어요</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="flex flex-col rounded-2xl border border-[#E7E7E7] bg-white overflow-hidden">
              {/* Image placeholder */}
              <div className={`w-full aspect-[4/3] bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                <span className="text-4xl">💇</span>
              </div>

              {/* Card body */}
              <div className="p-4 flex flex-col gap-3">
                {/* Category row */}
                <div className="flex items-center justify-between">
                  <span className="text-label-1 text-[#333]">{item.title}</span>
                  <button className="text-[#878787] hover:text-[#333] transition-colors text-lg leading-none">
                    ···
                  </button>
                </div>

                {/* Detail text */}
                <p className="text-body-3-regular text-[#878787]">{item.detail}</p>

                {/* Download button */}
                <button className="w-full py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  <span>사진 다운로드</span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    🫘 {item.cost}콩
                  </span>
                </button>

                {/* Watermark remove CTA */}
                <button className="w-full py-2.5 rounded-xl border border-[#E7E7E7] text-sm text-[#333] font-medium hover:bg-[#F3F3F3] transition-colors">
                  워터마크 제거 1개월 무료 체험하기
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7E7E7] px-5 py-3 flex flex-col gap-2 z-20">
        <p className="text-caption-1 text-[#878787] text-center">최근 옵션: AI 모델컷 / 여성 / 정면 / 살롱 배경</p>
        <Link
          href="/app/hair-model"
          className="w-full max-w-[440px] mx-auto py-3.5 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold text-center transition-colors block"
        >
          다른 사진으로 또 만들기
        </Link>
      </div>
    </div>
  )
}

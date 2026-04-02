'use client'

import { useState } from 'react'
import { galleryItems, galleryCategories } from '@/app/data/mock'

const GRADIENT_POOL = [
  'from-rose-100 via-pink-200 to-fuchsia-200',
  'from-purple-100 via-violet-200 to-purple-300',
  'from-amber-100 via-orange-200 to-yellow-200',
  'from-sky-100 via-blue-200 to-cyan-200',
  'from-emerald-100 via-teal-200 to-green-200',
  'from-red-100 via-rose-200 to-pink-200',
  'from-indigo-100 via-blue-200 to-violet-200',
  'from-lime-100 via-green-200 to-emerald-200',
]

const TYPE_LABEL_COLORS: Record<string, string> = {
  커트: 'bg-sky-100 text-sky-700',
  펌: 'bg-purple-100 text-purple-700',
  염색: 'bg-amber-100 text-amber-700',
  여성: 'bg-pink-100 text-pink-700',
  남성: 'bg-blue-100 text-blue-700',
}

// Use first 8 gallery items as mock gallery
const MOCK_ITEMS = galleryItems.slice(0, 8)

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('전체')
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const filtered =
    activeFilter === '전체'
      ? MOCK_ITEMS
      : MOCK_ITEMS.filter((item) => item.category === activeFilter)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#111827]">내 갤러리</h1>
        <p className="text-sm text-[#6B7280] mt-1">생성한 이미지를 관리하세요</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              activeFilter === cat
                ? 'bg-[#E11D48] border-[#E11D48] text-white'
                : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#E11D48] hover:text-[#E11D48]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-4xl mb-3">📭</span>
          <p className="text-[#6B7280] text-sm">
            <span className="font-medium text-[#111827]">{activeFilter}</span> 카테고리에 이미지가 없어요
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((item, idx) => {
            const gradient = GRADIENT_POOL[idx % GRADIENT_POOL.length]
            const labelColor = TYPE_LABEL_COLORS[item.category] ?? 'bg-gray-100 text-gray-600'
            const isHovered = hoveredIdx === idx
            return (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden border border-[#E5E7EB] bg-white group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Image placeholder */}
                <div className={`w-full aspect-[3/4] bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                  <span className="text-3xl">💇</span>
                </div>

                {/* Bottom info */}
                <div className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${labelColor}`}>
                      {item.category}
                    </span>
                    <span className="text-xs font-medium text-[#111827] truncate">{item.label}</span>
                  </div>
                  {item.caption && (
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5 truncate">{item.caption}</p>
                  )}
                </div>

                {/* Hover overlay */}
                {isHovered && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2 p-3">
                    <button className="w-full py-1.5 rounded-lg bg-white text-[#111827] text-xs font-semibold hover:bg-[#F9FAFB] transition-colors">
                      다운로드
                    </button>
                    <button className="w-full py-1.5 rounded-lg bg-[#E11D48] text-white text-xs font-semibold hover:bg-[#BE185D] transition-colors">
                      SNS 변환
                    </button>
                    <button className="w-full py-1.5 rounded-lg bg-white/20 text-white text-xs font-medium hover:bg-white/30 transition-colors">
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

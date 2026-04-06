'use client'

import Link from 'next/link'

const PLATFORMS = [
  { name: '네이버 플레이스', size: '1200 × 750', icon: 'N', bg: 'bg-[#03C75A]', color: 'text-white' },
  { name: '카카오맵', size: '1200 × 750', icon: '🗺️', bg: 'bg-[#FEE500]', color: 'text-[#333]' },
  { name: '티맵', size: '1200 × 750', icon: 'T', bg: 'bg-[#1B6CFF]', color: 'text-white' },
]

const GUIDE_STEPS = [
  {
    platform: '네이버 플레이스',
    steps: [
      '네이버 플레이스 앱 또는 웹에서 "내 매장 관리"로 이동',
      '"사진 관리" 메뉴 선택',
      '다운로드한 사진을 업로드',
      '대표 사진으로 설정하면 완료!',
    ],
  },
  {
    platform: '카카오맵',
    steps: [
      '카카오맵 앱에서 "카카오 비즈니스" 접속',
      '"내 장소 관리"에서 매장 선택',
      '"사진 관리" 탭에서 사진 업로드',
    ],
  },
  {
    platform: '티맵',
    steps: [
      '티맵 비즈니스 파트너 사이트 접속',
      '"매장 정보 관리"에서 사진 업로드',
    ],
  },
]

const OPTIMIZED_FEATURES = [
  { icon: '📐', title: '플랫폼별 사이즈 자동 최적화', desc: '네이버/카카오/티맵 각각의 추천 사이즈에 맞춰 자동 리사이즈' },
  { icon: '🎨', title: '다양한 배경 프리셋', desc: '살롱 인테리어, 단색, 우드 등 전문 배경으로 품격 UP' },
  { icon: '📦', title: '최대 10장 일괄 생성', desc: '한 번에 여러 장 만들어서 시간 절약' },
  { icon: '⬇️', title: '1클릭 다운로드', desc: '만든 사진을 바로 다운로드해서 업로드하세요' },
]

export default function ConnectNaverPage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-[640px] mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">네이버 플레이스에 올리기</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            지도앱에 딱 맞는 사이즈로 만들어드려요.<br />
            다운로드해서 바로 업로드하세요!
          </p>
        </div>

        {/* Platform cards */}
        <div>
          <p className="text-xs font-semibold text-[#878787] uppercase tracking-wider mb-3">지원 플랫폼</p>
          <div className="grid grid-cols-3 gap-3">
            {PLATFORMS.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-[#E7E7E7]">
                <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center ${p.color} font-bold text-lg`}>
                  {p.icon}
                </div>
                <p className="text-sm font-semibold text-[#111827] text-center">{p.name}</p>
                <p className="text-xs text-[#878787]">{p.size}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What we optimize */}
        <div>
          <p className="text-xs font-semibold text-[#878787] uppercase tracking-wider mb-3">이렇게 최적화해드려요</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OPTIMIZED_FEATURES.map((f) => (
              <div key={f.title} className="flex gap-3 p-4 bg-white rounded-xl border border-[#E7E7E7]">
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{f.title}</p>
                  <p className="text-xs text-[#878787] mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/app/naver-place"
          className="flex items-center justify-center w-full h-14 rounded-xl bg-[#03C75A] hover:bg-[#02B050] text-white font-semibold text-base transition-colors"
        >
          지도앱용 사진 만들러 가기
        </Link>

        {/* Upload Guide */}
        <div>
          <h2 className="text-lg font-bold text-[#111827] mb-4">📖 업로드 가이드</h2>
          <div className="space-y-4">
            {GUIDE_STEPS.map((guide) => (
              <div key={guide.platform} className="bg-white rounded-2xl border border-[#E7E7E7] overflow-hidden">
                <div className="px-5 py-3 bg-[#F8FAFC] border-b border-[#E7E7E7]">
                  <p className="text-sm font-semibold text-[#111827]">{guide.platform}</p>
                </div>
                <div className="p-5">
                  <ol className="space-y-3">
                    {guide.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="w-6 h-6 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-[#374151]">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tip */}
        <div className="flex gap-3 p-4 bg-[#EEF2FF] rounded-xl border border-[#C7D2FE]">
          <span className="text-lg shrink-0">💡</span>
          <div>
            <p className="text-sm font-semibold text-[#4F46E5]">TIP</p>
            <p className="text-xs text-[#6B7280] mt-0.5">
              네이버 플레이스에 양질의 사진을 올리면 검색 노출이 최대 40% 증가해요.
              주기적으로 사진을 교체하면 더 좋아요!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

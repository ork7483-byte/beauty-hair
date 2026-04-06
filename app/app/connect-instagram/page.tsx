'use client'

import Link from 'next/link'

const FORMATS = [
  { name: '피드 (정사각형)', ratio: '1:1', size: '1080 × 1080', link: '/app/sns-feed' },
  { name: '피드 (세로형)', ratio: '4:5', size: '1080 × 1350', link: '/app/sns-content' },
  { name: '릴스 / 스토리', ratio: '9:16', size: '1080 × 1920', link: '/app/reels' },
  { name: '프로필 사진', ratio: '1:1', size: '320 × 320', link: '/app/sns-feed' },
]

const CONTENT_TYPES = [
  {
    icon: '💇',
    title: 'AI 모델컷 포스팅',
    desc: 'AI 모델로 초상권 걱정 없는 시술 사진을 만들어 올려보세요.',
    link: '/app/hair-model',
    cta: '모델컷 만들기',
  },
  {
    icon: '🖼️',
    title: '프로모션 포스터',
    desc: '신메뉴, 이벤트, 시즌 할인 포스터를 AI가 만들어드려요.',
    link: '/app/poster',
    cta: '포스터 만들기',
  },
  {
    icon: '📸',
    title: 'SNS 콘텐츠',
    desc: '인스타 피드에 최적화된 사이즈와 필터로 변환해드려요.',
    link: '/app/sns-content',
    cta: 'SNS 콘텐츠 만들기',
  },
  {
    icon: '🎞️',
    title: '움직이는 사진',
    desc: '정적인 사진에 카메라 무빙 효과를 더해 릴스용 영상으로.',
    link: '/app/animated',
    cta: '움직이는 사진 만들기',
  },
]

const GUIDE_STEPS = [
  'HairShot AI에서 원하는 콘텐츠를 생성하세요',
  '완성된 사진/영상을 다운로드하세요',
  '인스타그램 앱에서 + 버튼을 눌러 새 게시물 작성',
  '다운로드한 이미지를 선택하고 캡션을 입력',
  '공유를 누르면 업로드 완료!',
]

const POSTING_TIPS = [
  { tip: '최적의 게시 시간', desc: '평일 오전 11시~오후 1시, 저녁 7시~9시가 참여율이 높아요' },
  { tip: '해시태그 활용', desc: '#헤어살롱 #헤어스타일 #미용실추천 등 지역+시술 태그 필수' },
  { tip: '일관된 톤앤매너', desc: '같은 필터/배경을 사용하면 피드가 통일감 있어 보여요' },
  { tip: '릴스 활용', desc: '릴스는 피드 대비 도달률 3~5배! 움직이는 사진 기능을 활용하세요' },
]

export default function ConnectInstagramPage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-[640px] mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">인스타그램에 올리기</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            인스타그램에 딱 맞는 콘텐츠를 만들어드려요.<br />
            다운로드해서 바로 올리세요!
          </p>
        </div>

        {/* Supported formats */}
        <div>
          <p className="text-xs font-semibold text-[#878787] uppercase tracking-wider mb-3">지원 포맷</p>
          <div className="grid grid-cols-2 gap-3">
            {FORMATS.map((f) => (
              <Link
                key={f.name}
                href={f.link}
                className="flex flex-col gap-1 p-4 bg-white rounded-xl border border-[#E7E7E7] hover:border-[#EC4899] hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#111827]">{f.name}</p>
                  <span className="text-xs text-[#878787] bg-[#F3F3F3] px-2 py-0.5 rounded">{f.ratio}</span>
                </div>
                <p className="text-xs text-[#878787]">{f.size}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Content types */}
        <div>
          <p className="text-xs font-semibold text-[#878787] uppercase tracking-wider mb-3">이런 콘텐츠를 만들 수 있어요</p>
          <div className="space-y-3">
            {CONTENT_TYPES.map((ct) => (
              <div key={ct.title} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#E7E7E7]">
                <span className="text-3xl shrink-0">{ct.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827]">{ct.title}</p>
                  <p className="text-xs text-[#878787] mt-0.5">{ct.desc}</p>
                </div>
                <Link
                  href={ct.link}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  {ct.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Guide */}
        <div>
          <h2 className="text-lg font-bold text-[#111827] mb-4">📖 업로드 가이드</h2>
          <div className="bg-white rounded-2xl border border-[#E7E7E7] p-5">
            <ol className="space-y-4">
              {GUIDE_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#374151]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Posting Tips */}
        <div>
          <h2 className="text-lg font-bold text-[#111827] mb-4">🔥 인스타그램 포스팅 꿀팁</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POSTING_TIPS.map((t) => (
              <div key={t.tip} className="p-4 bg-gradient-to-br from-[#FFF0F6] to-[#F5F3FF] rounded-xl border border-[#F3E8FF]">
                <p className="text-sm font-semibold text-[#111827]">{t.tip}</p>
                <p className="text-xs text-[#6B7280] mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/app/sns-content"
          className="flex items-center justify-center w-full h-14 rounded-xl bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6] hover:opacity-90 text-white font-semibold text-base transition-opacity"
        >
          인스타그램용 콘텐츠 만들러 가기
        </Link>

        {/* Bottom tip */}
        <div className="flex gap-3 p-4 bg-[#FFF7ED] rounded-xl border border-[#FDBA74]">
          <span className="text-lg shrink-0">💡</span>
          <div>
            <p className="text-sm font-semibold text-[#D97706]">TIP</p>
            <p className="text-xs text-[#6B7280] mt-0.5">
              인스타그램에 꾸준히 양질의 콘텐츠를 올리는 미용실은
              예약 문의가 평균 30% 이상 증가해요!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import { galleryItems, galleryCategories, pricingPlans, testimonials, hairFeatures } from './data/mock';

// ─── CountUp hook ──────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return value;
}

// ─── Section 1: Hero ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#1C1917] flex items-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#E11D48]/10 via-transparent to-transparent" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#E11D48]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#F59E0B]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left: copy */}
        <div className="flex flex-col gap-8">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-[#E11D48]/10 border border-[#E11D48]/20">
            <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
            <span className="text-[#E11D48] text-sm font-medium">AI 헤어 모델 생성 서비스</span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              헤어 모델 촬영,<br />
              이제 AI로{' '}
              <span className="text-[#E11D48]">10초면 끝.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-md">
              시술 사진 한 장이면 초상권 걱정 없는 AI 모델컷이 완성됩니다
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            {[
              { num: '850+', label: '미용실' },
              { num: '30,000+', label: '생성 이미지' },
              { num: '97%', label: '만족도' },
            ].map(s => (
              <div key={s.label}>
                <div
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.num}
                </div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              무료로 3장 만들어보기
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium text-base transition-all duration-200"
            >
              작동 방식 보기
            </a>
          </div>
          <p className="text-white/40 text-xs">신용카드 불필요 · 3장 무료 · 10초 이내 생성</p>
        </div>

        {/* Right: before/after visual */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            {/* Before side */}
            <div className="absolute inset-0 grid grid-cols-2">
              <div className="bg-gradient-to-br from-[#3D3530] to-[#2D2520] flex flex-col items-center justify-center gap-3 border-r border-white/10">
                {/* Blurred/mosaic effect */}
                <div className="w-24 h-32 rounded-xl bg-[#4A3F38] relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-5">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="border border-[#3D3530]/50"
                        style={{
                          background: `hsl(${20 + (i % 5) * 8}, 25%, ${30 + (i % 4) * 7}%)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-white/40 text-xs font-medium px-3 py-1 rounded-full bg-white/5">BEFORE</span>
                <span className="text-white/30 text-[10px] text-center px-2">고객 시술 사진<br />(모자이크)</span>
              </div>
              {/* After side */}
              <div className="bg-gradient-to-br from-[#1a0a12] to-[#2d1020] flex flex-col items-center justify-center gap-3">
                <div className="w-24 h-32 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#E11D48]/20 to-[#9F1239]/30" />
                  {/* Stylized face outline */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-16 h-20 rounded-full bg-gradient-to-b from-[#FBBF24]/30 to-[#F59E0B]/20 border border-[#F59E0B]/20" />
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-18 h-8 bg-gradient-to-b from-[#9F1239]/60 to-transparent rounded-t-full" style={{ width: '72px' }} />
                    </div>
                  </div>
                </div>
                <span className="text-[#E11D48] text-xs font-medium px-3 py-1 rounded-full bg-[#E11D48]/10 border border-[#E11D48]/20">AFTER</span>
                <span className="text-white/50 text-[10px] text-center px-2">AI 모델컷<br />(초상권 안전)</span>
              </div>
            </div>

            {/* Center divider + lightning bolt */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-[#E11D48] flex items-center justify-center shadow-lg shadow-[#E11D48]/40 z-10">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2L4.09 12.22c-.37.41-.09 1.03.44 1.03h5.97l-1.09 7.75c-.05.35.34.57.6.33L19.91 11.78c.37-.41.09-1.03-.44-1.03h-5.97L14.59 3c.05-.35-.34-.57-.59-.33-.01.01-.01.02-.02.02z" />
                </svg>
              </div>
            </div>

            {/* Timer badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <svg className="w-4 h-4 text-[#E11D48]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-xs font-medium">생성 시간: 약 10초</span>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-4 -right-4 bg-[#F59E0B] text-[#1C1917] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg rotate-6">
            무료 체험 가능
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs">스크롤</span>
        <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

// ─── Section 2: Before-After ───────────────────────────────────────────────────
const beforeAfterCards = [
  {
    beforeLabel: '모자이크 처리된\n고객 시술 사진',
    afterLabel: 'AI 모델\n깔끔한 시술 사진',
    caption: '모자이크 없이, 초상권 걱정 없이',
    beforeBg: 'from-[#374151] to-[#1F2937]',
    afterBg: 'from-[#4C1D95] to-[#2D1B69]',
    beforeIcon: '🙈',
    afterIcon: '✨',
  },
  {
    beforeLabel: '뒷모습만 찍은\n시술 사진',
    afterLabel: '정면 AI\n모델컷',
    caption: '뒷모습 사진만 있으면 충분합니다',
    beforeBg: 'from-[#292524] to-[#1C1917]',
    afterBg: 'from-[#7F1D1D] to-[#9F1239]',
    beforeIcon: '↩️',
    afterIcon: '🖼️',
  },
  {
    beforeLabel: '모델 섭외 비용\n100만원 + 반나절',
    afterLabel: '월 2.9만원\n10초 완성',
    caption: '모델 섭외 없이, 10초면 완성',
    beforeBg: 'from-[#78350F] to-[#451A03]',
    afterBg: 'from-[#14532D] to-[#052E16]',
    beforeIcon: '💸',
    afterIcon: '💎',
  },
];

function BeforeAfterSection() {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-[#E11D48] tracking-widest uppercase mb-3">
            비포 &amp; 애프터
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            이런 상황, 모두 해결됩니다
          </h2>
          <p className="text-[#6B7280] text-lg">
            실제 미용실 원장님들이 겪는 문제를 AI가 해결합니다
          </p>
        </div>

        {/* Scrollable cards */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
          {beforeAfterCards.map((card, i) => (
            <div
              key={i}
              className="snap-center flex-shrink-0 w-80 md:w-96 bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Card content */}
              <div className="grid grid-cols-2 h-56">
                {/* Before */}
                <div className={`bg-gradient-to-br ${card.beforeBg} flex flex-col items-center justify-center gap-3 p-4 border-r border-white/10`}>
                  <div className="text-4xl">{card.beforeIcon}</div>
                  <div className="text-white/60 text-[11px] text-center leading-snug whitespace-pre-line">
                    {card.beforeLabel}
                  </div>
                  <span className="text-[10px] text-white/40 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    BEFORE
                  </span>
                </div>
                {/* After */}
                <div className={`bg-gradient-to-br ${card.afterBg} flex flex-col items-center justify-center gap-3 p-4 relative`}>
                  <div className="text-4xl">{card.afterIcon}</div>
                  <div className="text-white/80 text-[11px] text-center leading-snug whitespace-pre-line font-medium">
                    {card.afterLabel}
                  </div>
                  <span className="text-[10px] text-[#E11D48] px-2 py-0.5 rounded-full bg-[#E11D48]/10 border border-[#E11D48]/30">
                    AFTER
                  </span>
                </div>
              </div>
              {/* Arrow divider */}
              <div className="relative flex justify-center -mt-7 mb-4 z-10">
                <div className="w-8 h-8 rounded-full bg-[#E11D48] flex items-center justify-center shadow-md shadow-[#E11D48]/30">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              {/* Caption */}
              <div className="px-5 pb-5 text-center">
                <p className="text-[#111827] text-sm font-semibold">{card.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Gallery ────────────────────────────────────────────────────────
const gradientPalettes = [
  'from-[#831843] to-[#9F1239]',
  'from-[#1E3A5F] to-[#1D4ED8]',
  'from-[#14532D] to-[#16A34A]',
  'from-[#451A03] to-[#B45309]',
  'from-[#312E81] to-[#6D28D9]',
  'from-[#1C1917] to-[#44403C]',
  'from-[#7F1D1D] to-[#DC2626]',
  'from-[#0C4A6E] to-[#0284C7]',
  'from-[#4C1D95] to-[#7C3AED]',
  'from-[#022C22] to-[#059669]',
  'from-[#3B0764] to-[#A855F7]',
  'from-[#1E1B4B] to-[#4F46E5]',
];

function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const filtered =
    activeCategory === '전체'
      ? galleryItems
      : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-[#E11D48] tracking-widest uppercase mb-3">
            결과 갤러리
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            실제 AI 생성 결과물
          </h2>
          <p className="text-[#6B7280] text-lg">
            전국 미용실에서 실제로 사용 중인 AI 모델컷
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {galleryCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/25'
                  : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#FFF1F2] hover:text-[#E11D48]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              {/* Gradient placeholder */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradientPalettes[i % gradientPalettes.length]}`}
              />
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-xs font-medium">{item.label}</p>
                <p className="text-white/60 text-[10px]">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            나도 만들어보기
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: How It Works ───────────────────────────────────────────────────
const steps = [
  {
    step: '01',
    icon: '📸',
    title: '시술 사진 업로드',
    desc: '고객 시술 후 찍은 사진을 그대로 올려주세요. 뒷모습도 OK',
    time: '약 2초',
    color: 'from-[#FFF1F2] to-[#FFE4E6]',
    borderColor: 'border-[#FECDD3]',
  },
  {
    step: '02',
    icon: '🎨',
    title: '스타일 & 모델 선택',
    desc: '원하는 AI 모델과 배경, 분위기를 선택하세요',
    time: '약 3초',
    color: 'from-[#FFFBEB] to-[#FEF3C7]',
    borderColor: 'border-[#FDE68A]',
  },
  {
    step: '03',
    icon: '✨',
    title: 'AI 생성 완료!',
    desc: '초상권 걱정 없는 AI 모델컷이 완성되었습니다',
    time: '약 2초',
    color: 'from-[#ECFDF5] to-[#D1FAE5]',
    borderColor: 'border-[#A7F3D0]',
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-[#E11D48] tracking-widest uppercase mb-3">
            사용 방법
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            단 3단계, 총 7초
          </h2>
          <p className="text-[#6B7280] text-lg">
            복잡한 설정 없이 누구나 바로 사용할 수 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#E11D48]/30 to-transparent z-0 -translate-y-0.5" />
              )}
              <div className={`relative z-10 bg-gradient-to-br ${s.color} border ${s.borderColor} rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform duration-300`}>
                <div className="text-5xl mb-4">{s.icon}</div>
                <div
                  className="text-sm font-bold text-[#E11D48] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  STEP {s.step}
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-3">{s.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] bg-white/80 px-3 py-1 rounded-full border border-white">
                  <svg className="w-3 h-3 text-[#E11D48]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {s.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Demo placeholder */}
        <div className="relative bg-gradient-to-br from-[#1C1917] to-[#292524] rounded-2xl overflow-hidden h-72 md:h-96 flex items-center justify-center shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E11D48]/10 via-transparent to-[#F59E0B]/5" />
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 rounded-full bg-[#E11D48]/20 border-2 border-[#E11D48]/40 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#E11D48]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white/60 text-sm">데모 영상 플레이</p>
            <p className="text-white/30 text-xs mt-1">클릭하면 실제 사용 영상을 볼 수 있습니다</p>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            무료로 체험하기
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Features ───────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-[#E11D48] tracking-widest uppercase mb-3">
            핵심 기능
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            미용실 원장님에게 딱 맞는 3가지 기능
          </h2>
          <p className="text-[#6B7280] text-lg">
            촬영부터 SNS 게시까지 한 번에
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {hairFeatures.map((feature, i) => (
            <div
              key={i}
              className="group bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg hover:border-[#FECDD3] transition-all duration-300"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">{feature.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-5">{feature.description}</p>

              {/* Seller phrase pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF1F2] border border-[#FECDD3]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                <span className="text-[#E11D48] text-xs font-medium">{feature.sellerPhrase}</span>
              </div>

              {/* Screenshot placeholder */}
              <div className={`mt-6 w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${
                i === 0 ? 'from-[#FFF1F2] to-[#FFE4E6]' :
                i === 1 ? 'from-[#FFFBEB] to-[#FEF3C7]' :
                'from-[#EFF6FF] to-[#DBEAFE]'
              } flex items-center justify-center border border-[#E5E7EB]`}>
                <span className="text-4xl opacity-40">{feature.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Social Proof ───────────────────────────────────────────────────
function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const salons = useCountUp(850, 1800, active);
  const images = useCountUp(30000, 1800, active);
  const satisfaction = useCountUp(97, 1800, active);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const kpiNumbers: { value: number; suffix: string; label: string }[] = [
    { value: salons, suffix: '+', label: '미용실' },
    { value: images, suffix: '+', label: '이미지 생성' },
    { value: satisfaction, suffix: '%', label: '만족도' },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#1C1917]">
      <div className="max-w-6xl mx-auto px-6">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-8 mb-20">
          {kpiNumbers.map((kpi, i) => (
            <div key={i} className="text-center">
              <div
                className="text-4xl md:text-6xl font-bold text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {kpi.value.toLocaleString()}{kpi.suffix}
              </div>
              <div className="text-white/50 text-sm">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            미용실 원장님들의 실제 후기
          </h2>
          <p className="text-white/50">전국 850+ 미용실이 선택한 이유</p>
        </div>

        {/* Testimonial carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0 px-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 text-center max-w-2xl mx-auto">
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} className="w-5 h-5 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-white text-lg md:text-xl leading-relaxed mb-6 font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="text-white font-semibold">{t.author}</p>
                    <p className="text-white/50 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTestimonial(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentTestimonial
                  ? 'w-8 h-2 bg-[#E11D48]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`후기 ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Pricing ────────────────────────────────────────────────────────
export function PricingCards({ showYearly }: { showYearly: boolean }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 items-start">
      {pricingPlans.map((plan, i) => (
        <div
          key={i}
          className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
            plan.highlighted
              ? 'bg-white border-[#E11D48] shadow-xl shadow-[#E11D48]/10 scale-105'
              : 'bg-white border-[#E5E7EB] hover:border-[#FECDD3] hover:shadow-md'
          }`}
        >
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E11D48] text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
              {plan.badge}
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#111827] mb-1">{plan.name}</h3>
            <div className="flex items-end gap-1">
              <span
                className={`text-4xl font-bold ${plan.highlighted ? 'text-[#E11D48]' : 'text-[#111827]'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {(showYearly ? plan.yearlyPrice : plan.monthlyPrice).toLocaleString()}
              </span>
              <span className="text-[#6B7280] text-sm mb-1.5">원/{showYearly ? '년' : '월'}</span>
            </div>
            {showYearly && (
              <p className="text-xs text-[#059669] mt-1 font-medium">
                월 {Math.floor(plan.yearlyPrice / 12).toLocaleString()}원 — 2개월 무료
              </p>
            )}
          </div>

          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {plan.features.map((f, fi) => (
              <li key={fi} className="flex items-start gap-3">
                {f.included ? (
                  <svg className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-[#D1D5DB] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className={`text-sm ${f.included ? 'text-[#111827]' : 'text-[#9CA3AF] line-through'}`}>
                  {f.name}
                  {f.detail && (
                    <span className={`ml-1.5 text-xs font-medium ${f.included ? 'text-[#E11D48]' : 'text-[#9CA3AF]'}`}>
                      ({f.detail})
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className={`w-full py-3 rounded-full text-sm font-semibold text-center transition-all duration-200 hover:-translate-y-0.5 ${
              plan.highlighted
                ? 'bg-[#E11D48] hover:bg-[#BE185D] text-white shadow-md hover:shadow-lg'
                : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827]'
            }`}
          >
            {plan.highlighted ? '지금 시작하기' : '선택하기'}
          </a>
        </div>
      ))}
    </div>
  );
}

function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-[#E11D48] tracking-widest uppercase mb-3">
            요금제
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            부담 없이 시작하세요
          </h2>
          <p className="text-[#6B7280] text-lg mb-8">무료 체험 후 마음에 들면 구독하세요</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-full p-1.5 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !yearly ? 'bg-[#E11D48] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              월간
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                yearly ? 'bg-[#E11D48] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              연간
              <span className="text-xs bg-[#F59E0B]/20 text-[#B45309] px-2 py-0.5 rounded-full font-semibold">
                2개월 무료
              </span>
            </button>
          </div>
        </div>

        <PricingCards showYearly={yearly} />
      </div>
    </section>
  );
}

// ─── Section 8: Final CTA ──────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#E11D48]/10 via-transparent to-[#F59E0B]/5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#E11D48]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-[#E11D48] text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
          지금 바로 시작
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          지금 무료로<br />
          <span className="text-[#E11D48]">3장 만들어보세요</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 leading-relaxed">
          신용카드 없이 바로 시작 가능합니다.<br />
          처음 3장은 완전 무료로 체험하세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white font-bold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            무료로 3장 만들어보기
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#FEE500] hover:bg-[#F9D700] text-[#3B1E08] font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.584 1.658 4.876 4.148 6.263L5.12 20.16a.375.375 0 00.545.426l4.51-2.988A11.2 11.2 0 0012 18c5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
            </svg>
            카카오톡 문의
          </a>
        </div>

        <p className="mt-8 text-white/30 text-sm">
          친구 초대 시 추가 크레딧 제공 · 언제든지 해지 가능
        </p>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#111827] text-white/40 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-white font-bold text-lg">HairShot</span>
              <span className="text-[#E11D48] font-bold text-lg">AI</span>
            </div>
            <p className="text-xs">헤어 모델 촬영, 이제 AI로 10초면 끝.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <a href="/pricing" className="hover:text-white transition-colors">요금제</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">고객센터</a>
          </div>
        </div>
        <div className="border-t border-white/5 mt-8 pt-6 text-xs text-center">
          &copy; 2026 HairShot AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BeforeAfterSection />
        <GallerySection />
        <HowItWorksSection />
        <FeaturesSection />
        <SocialProofSection />
        <PricingSection />
        <FinalCTASection />
        <Footer />
      </main>
    </>
  );
}

'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   Scroll‑triggered fade-in wrapper
   ═══════════════════════════════════════════════════════════════════════ */
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CountUp hook
   ═══════════════════════════════════════════════════════════════════════ */
function useCountUp(target: number, duration = 1600, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return value;
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. Navbar
   ═══════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-14 md:h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center">
            <span className="text-white text-sm font-bold">H</span>
          </div>
          <span className="font-bold text-[15px] text-[#111827]">HairShot AI</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[#4B5563]">
          <a href="#features" className="hover:text-[#4F46E5] transition-colors">기능 소개</a>
          <a href="#gallery" className="hover:text-[#4F46E5] transition-colors">갤러리</a>
          <a href="#pricing" className="hover:text-[#4F46E5] transition-colors">요금제</a>
          <a href="#faq" className="hover:text-[#4F46E5] transition-colors">FAQ</a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a href="#pricing" className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4338CA] transition-colors">
            무료로 시작하기
          </a>
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -mr-2" aria-label="메뉴">
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 bg-[#111827] transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#111827] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#111827] transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#F3F4F6] px-5 py-4 space-y-4 animate-fadeIn">
          <a href="#features" onClick={() => setMenuOpen(false)} className="block text-sm text-[#4B5563]">기능 소개</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)} className="block text-sm text-[#4B5563]">갤러리</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="block text-sm text-[#4B5563]">요금제</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="block text-sm text-[#4B5563]">FAQ</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="block text-center py-3 rounded-full bg-[#4F46E5] text-white text-sm font-semibold">무료로 시작하기</a>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. Hero Section
   ═══════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="pt-20 pb-12 md:pt-28 md:pb-20 bg-gradient-to-b from-[#EEF2FF] to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        {/* Badge */}
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
            850+ 미용실이 선택한 AI 서비스
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center text-[26px] md:text-[42px] lg:text-[48px] font-extrabold leading-tight tracking-tight text-[#111827]">
          시술 사진 한 장으로<br />
          AI 헤어 모델컷{' '}
          <span className="text-[#4F46E5]">완성!</span>
        </h1>
        <p className="text-center text-[14px] md:text-[16px] text-[#6B7280] mt-3 max-w-md mx-auto leading-relaxed">
          초상권 걱정 없는 AI 모델컷을 10초 만에 만드세요.<br className="hidden md:block" />
          더 이상 모델 섭외에 시간 쓰지 마세요.
        </p>

        {/* Demo area */}
        <div className="mt-8 md:mt-12 max-w-lg mx-auto">
          <div className="relative bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-5 md:p-6">
            {/* Upload area */}
            <div className="relative aspect-[4/3] rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border-2 border-dashed border-[#C7D2FE] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#4F46E5] transition-colors">
              {/* Placeholder image representation */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#C7D2FE] to-[#A5B4FC] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#4B5563]">시술 사진을 올려보세요</p>
                <p className="text-xs text-[#9CA3AF] mt-1">뒷모습, 옆모습 어떤 각도든 OK</p>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <span className="text-xs text-[#9CA3AF]">JPG, PNG 지원</span>
              </div>
              <button className="px-5 py-2.5 rounded-full bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4338CA] transition-colors">
                AI 모델컷 생성
              </button>
            </div>
          </div>

          {/* Trust line */}
          <p className="text-center text-xs text-[#9CA3AF] mt-4">
            지금 무료로 3장 만들어 보세요 &middot; 신용카드 불필요
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. How It Works
   ═══════════════════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const steps = [
    { num: '1', title: '시술 사진 업로드', desc: '스마트폰으로 찍은 시술 사진 한 장이면 충분해요', icon: '📸' },
    { num: '2', title: 'AI 모델 & 스타일 선택', desc: '원하는 모델과 포즈, 배경을 선택하세요', icon: '✨' },
    { num: '3', title: '10초 만에 완성', desc: '초상권 걱정 없는 AI 모델컷이 바로 생성됩니다', icon: '🎉' },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <h2 className="text-center text-[22px] md:text-[32px] font-extrabold text-[#111827]">
            AI 모델컷 만들기
          </h2>
          <p className="text-center text-sm md:text-base text-[#6B7280] mt-2">
            시술 사진만 있으면 누구나 3단계로 완성
          </p>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.num} className={`delay-${(i + 1) * 100}`}>
              <div className="relative bg-[#F8FAFC] rounded-2xl p-6 text-center border border-[#F3F4F6] hover:shadow-md transition-shadow">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#4F46E5] text-white text-sm font-bold mb-4">
                  {s.num}
                </div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-[15px] font-bold text-[#111827] mb-2">{s.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Checkpoints */}
        <Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
            {['뒷모습만 있어도 OK', '초상권 걱정 없음', '고해상도 다운로드'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-sm text-[#4F46E5] font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. Platform Section — "미용실 운영에 필요한 모든 사진을 한 번에"
   ═══════════════════════════════════════════════════════════════════════ */
function PlatformSection() {
  const platforms = [
    { name: '인스타그램', icon: '📸', color: 'from-pink-400 to-purple-500' },
    { name: '네이버 플레이스', icon: '🟢', color: 'from-green-400 to-green-600' },
    { name: '카카오톡', icon: '💛', color: 'from-yellow-300 to-yellow-500' },
    { name: '네이버 블로그', icon: '📝', color: 'from-emerald-400 to-teal-500' },
    { name: '당근마켓', icon: '🥕', color: 'from-orange-300 to-orange-500' },
    { name: '포트폴리오', icon: '📁', color: 'from-blue-400 to-indigo-500' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <h2 className="text-center text-[22px] md:text-[32px] font-extrabold text-[#111827] leading-snug">
            미용실 운영에 필요한<br />모든 사진을 한 번에 만들어요
          </h2>
          <p className="text-center text-sm text-[#6B7280] mt-2">
            생성된 AI 모델컷을 다양한 플랫폼에 바로 활용하세요
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {platforms.map((p, i) => (
            <Reveal key={p.name} className={`delay-${Math.min((i + 1) * 100, 500)}`}>
              <div className="flex flex-col items-center gap-2.5 py-4">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl shadow-sm`}>
                  {p.icon}
                </div>
                <span className="text-xs md:text-sm text-[#4B5563] font-medium text-center">{p.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. Social Proof / Stats
   ═══════════════════════════════════════════════════════════════════════ */
function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const salons = useCountUp(850, 1400, active);
  const images = useCountUp(30000, 1600, active);
  const satisfaction = useCountUp(97, 1200, active);

  return (
    <section className="py-16 md:py-24 bg-[#111827]" ref={ref}>
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-center text-[22px] md:text-[32px] font-extrabold text-white leading-snug">
          <span className="text-[#A5B4FC]">{salons.toLocaleString()}+</span> 미용실 원장님들이<br />이미 선택하셨어요
        </h2>

        <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { value: `${salons.toLocaleString()}+`, label: '도입 미용실' },
            { value: `${images.toLocaleString()}+`, label: '생성된 이미지' },
            { value: `${satisfaction}%`, label: '만족도' },
          ].map((s) => (
            <div key={s.label} className="text-center py-4">
              <div className="text-2xl md:text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs md:text-sm text-[#9CA3AF] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. Gallery Section — "다른 원장님들은 이렇게 만들었어요"
   ═══════════════════════════════════════════════════════════════════════ */
function GallerySection() {
  const categories = ['전체', '커트', '펌', '염색', '남성', '여성'];
  const [active, setActive] = useState('전체');

  const items = [
    { category: '커트', label: '레이어드 커트', desc: '여성 미디엄 레이어드', gradient: 'from-rose-200 to-pink-300' },
    { category: '펌', label: 'C컬 펌', desc: '볼륨 C컬 디지털 펌', gradient: 'from-purple-200 to-fuchsia-300' },
    { category: '염색', label: '애쉬 브라운', desc: '애쉬 브라운 염색', gradient: 'from-amber-200 to-orange-300' },
    { category: '남성', label: '댄디컷', desc: '남성 댄디컷', gradient: 'from-sky-200 to-blue-300' },
    { category: '남성', label: '히피 펌', desc: '남성 히피 펌', gradient: 'from-emerald-200 to-teal-300' },
    { category: '염색', label: '하이라이트', desc: '블론드 하이라이트', gradient: 'from-yellow-200 to-amber-300' },
    { category: '여성', label: '허쉬컷', desc: '허쉬컷 + 에어터치', gradient: 'from-red-200 to-rose-300' },
    { category: '커트', label: '보브 커트', desc: '클래식 보브', gradient: 'from-indigo-200 to-violet-300' },
    { category: '펌', label: '볼드 펌', desc: '뿌리 볼드 펌', gradient: 'from-cyan-200 to-sky-300' },
  ];

  const filtered = active === '전체' ? items : items.filter((it) => it.category === active);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <h2 className="text-center text-[22px] md:text-[32px] font-extrabold text-[#111827] leading-snug">
            다른 원장님들은<br />이렇게 만들었어요
          </h2>
        </Reveal>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 overflow-x-auto no-scrollbar pb-2 justify-start md:justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active === c
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {filtered.map((item, i) => (
            <div key={`${item.label}-${i}`} className="group relative rounded-xl overflow-hidden bg-white border border-[#F3F4F6] hover:shadow-lg transition-shadow">
              {/* Image placeholder */}
              <div className={`aspect-[3/4] bg-gradient-to-br ${item.gradient} flex items-end p-4`}>
                <div className="w-full">
                  <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur mb-2 flex items-center justify-center text-lg">💇</div>
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full border border-[#E5E7EB] text-sm font-medium text-[#4B5563] hover:bg-[#F9FAFB] transition-colors">
            더 많은 스타일 보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. Use Cases — "매장에 필요한 모든 헤어 사진 만들기"
   ═══════════════════════════════════════════════════════════════════════ */
function UseCaseSection() {
  const cases = [
    { title: '포트폴리오', desc: '시술 결과를 전문적인 모델컷으로 보관', icon: '📁', gradient: 'from-indigo-100 to-blue-100' },
    { title: '인스타 피드', desc: '1:1 정사각형 고퀄리티 피드용 이미지', icon: '📸', gradient: 'from-pink-100 to-rose-100' },
    { title: '네이버 플레이스', desc: '4:3 비율 매장 대표 사진 자동 생성', icon: '🟢', gradient: 'from-green-100 to-emerald-100' },
    { title: '고객 상담', desc: '"이렇게 됩니다" 시각적 상담 도구', icon: '💬', gradient: 'from-purple-100 to-violet-100' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <h2 className="text-center text-[22px] md:text-[32px] font-extrabold text-[#111827] leading-snug">
            매장에 필요한<br />모든 헤어 사진 만들기
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {cases.map((c, i) => (
            <Reveal key={c.title} className={`delay-${(i + 1) * 100}`}>
              <div className={`rounded-2xl p-5 bg-gradient-to-br ${c.gradient} border border-white/50 hover:shadow-md transition-shadow`}>
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="text-[15px] font-bold text-[#111827] mb-1">{c.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. Testimonials — "직접 사용하신 원장님들의 생생한 후기"
   ═══════════════════════════════════════════════════════════════════════ */
function TestimonialSection() {
  const testimonials = [
    { quote: '모델 구하느라 반나절 날리던 시간이 사라졌어요. 시술 끝나면 바로 사진 찍어서 AI로 돌리면 끝!', author: '김○○', role: '헤어살롱 원장', avatar: 'from-rose-300 to-pink-400' },
    { quote: '고객 사진 모자이크 안 해도 되니까 인스타 퀄리티가 확 올라갔어요.', author: '박○○', role: '뷰티샵 디자이너', avatar: 'from-purple-300 to-fuchsia-400' },
    { quote: '월 3만원으로 매주 새 스타일 포트폴리오를 올릴 수 있게 됐습니다.', author: '이○○', role: '1인 헤어샵 운영자', avatar: 'from-amber-300 to-orange-400' },
    { quote: '"이 스타일 하면 이렇게 됩니다" 보여주니까 시술 동의율이 체감 30%는 올라갔어요.', author: '최○○', role: '프리랜서 헤어 디자이너', avatar: 'from-sky-300 to-blue-400' },
    { quote: '프랜차이즈 전 지점에 도입했는데 마케팅 콘텐츠 제작 비용이 1/10로 줄었습니다.', author: '정○○', role: '뷰티 프랜차이즈 마케팅 팀장', avatar: 'from-emerald-300 to-teal-400' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <h2 className="text-center text-[22px] md:text-[32px] font-extrabold text-[#111827] leading-snug">
            직접 사용하신<br />원장님들의 생생한 후기
          </h2>
        </Reveal>

        {/* Horizontal scrollable on mobile, grid on desktop */}
        <div className="mt-10 flex md:grid md:grid-cols-3 gap-4 overflow-x-auto no-scrollbar pb-4 md:pb-0 snap-x snap-mandatory">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={i} className={`delay-${(i + 1) * 100}`}>
              <div className="shrink-0 w-[280px] md:w-auto snap-start bg-[#F8FAFC] rounded-2xl p-5 border border-[#F3F4F6]">
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 20 20" fill="#FBBF24"><path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.5.91-5.33L2.27 6.67l5.34-.78L10 1z"/></svg>
                  ))}
                </div>
                <p className="text-sm text-[#374151] leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatar} flex items-center justify-center text-white text-xs font-bold`}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{t.author}</p>
                    <p className="text-xs text-[#9CA3AF]">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Second row on mobile (scrollable), shown on desktop grid */}
        <div className="mt-4 flex md:grid md:grid-cols-2 gap-4 overflow-x-auto no-scrollbar pb-4 md:pb-0 snap-x snap-mandatory max-w-3xl md:mx-auto">
          {testimonials.slice(3).map((t, i) => (
            <Reveal key={i} className="delay-300">
              <div className="shrink-0 w-[280px] md:w-auto snap-start bg-[#F8FAFC] rounded-2xl p-5 border border-[#F3F4F6]">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 20 20" fill="#FBBF24"><path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.5.91-5.33L2.27 6.67l5.34-.78L10 1z"/></svg>
                  ))}
                </div>
                <p className="text-sm text-[#374151] leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatar} flex items-center justify-center text-white text-xs font-bold`}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{t.author}</p>
                    <p className="text-xs text-[#9CA3AF]">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   9. Comparison — "AI로 다 간편하게"
   ═══════════════════════════════════════════════════════════════════════ */
function ComparisonSection() {
  const rows = [
    { label: '소요 시간', before: '반나절 ~ 하루', after: '10초' },
    { label: '비용', before: '30~50만원/회', after: '월 29,900원~' },
    { label: '초상권', before: '동의서 필수', after: '걱정 없음' },
    { label: '모델 섭외', before: '직접 구인', after: '불필요' },
    { label: '결과물 수량', before: '10~20장', after: '무제한 가능' },
    { label: 'SNS 변환', before: '별도 편집', after: '자동 변환' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto px-5">
        <Reveal>
          <h2 className="text-center text-[22px] md:text-[32px] font-extrabold text-[#111827] leading-snug">
            AI로 다 간편하게,<br />원장님이 할 일은 시술뿐
          </h2>
          <p className="text-center text-sm text-[#6B7280] mt-2">
            기존 모델 촬영과 비교해보세요
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10 bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 text-center text-xs font-semibold text-[#6B7280] border-b border-[#F3F4F6] py-3 px-4">
              <span className="text-left">항목</span>
              <span className="text-[#DC2626]">기존 촬영</span>
              <span className="text-[#4F46E5]">HairShot AI</span>
            </div>
            {rows.map((r, i) => (
              <div key={r.label} className={`grid grid-cols-3 text-center text-sm py-3.5 px-4 ${i < rows.length - 1 ? 'border-b border-[#F3F4F6]' : ''}`}>
                <span className="text-left font-medium text-[#374151]">{r.label}</span>
                <span className="text-[#9CA3AF]">{r.before}</span>
                <span className="text-[#4F46E5] font-semibold">{r.after}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   10. FAQ
   ═══════════════════════════════════════════════════════════════════════ */
function FAQSection() {
  const faqs = [
    { q: '무료 체험은 어떻게 이용하나요?', a: '회원가입 후 신용카드 정보 없이 바로 3장을 무료로 생성할 수 있습니다. 별도 결제 정보 입력 없이 이용 가능합니다.' },
    { q: '고객 사진을 올려도 개인정보가 보호되나요?', a: '네. 업로드된 사진은 AI 생성에만 사용되며, 생성 완료 후 즉시 서버에서 삭제됩니다. 고객의 얼굴 정보는 저장되지 않습니다.' },
    { q: '뒷모습 사진만 있어도 정면 AI 모델컷을 만들 수 있나요?', a: '가능합니다. HairShot AI는 뒷모습 사진으로 시술된 헤어스타일을 분석한 뒤, 정면 또는 측면 AI 모델컷을 생성합니다.' },
    { q: '요금제를 중간에 변경하거나 해지할 수 있나요?', a: '언제든지 가능합니다. 업그레이드는 즉시 적용되고, 다운그레이드는 다음 결제 사이클부터 적용됩니다.' },
    { q: '품질이 정말 전문 촬영 수준인가요?', a: '네. AI 모델은 전문 스튜디오 촬영 품질의 이미지를 생성합니다. 실제 고객의 97%가 품질에 만족하셨습니다.' },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-5">
        <Reveal>
          <h2 className="text-center text-[22px] md:text-[32px] font-extrabold text-[#111827]">
            사장님이 궁금하신<br />자주 묻는 질문
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={i} className={`delay-${Math.min((i + 1) * 100, 500)}`}>
              <div className="bg-[#F8FAFC] rounded-xl border border-[#F3F4F6] overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-[#111827] pr-4">{f.q}</span>
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"
                    className={`shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 pb-4 text-sm text-[#6B7280] leading-relaxed">{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   11. CTA Section
   ═══════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-[#111827]">
      <div className="max-w-lg mx-auto px-5 text-center">
        <Reveal>
          <h2 className="text-[22px] md:text-[32px] font-extrabold text-white leading-snug">
            바쁜 원장님을 위해<br />빠른 AI 시작하기
          </h2>
          <p className="text-sm text-[#9CA3AF] mt-3">
            무료 체험 3장 &middot; 신용카드 불필요 &middot; 1분이면 시작
          </p>
          <a
            href="#pricing"
            className="mt-8 inline-flex items-center px-8 py-3.5 rounded-full bg-[#4F46E5] text-white font-semibold text-[15px] hover:bg-[#4338CA] transition-colors shadow-lg shadow-[#4F46E5]/25"
          >
            무료로 시작하기
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   12. Pricing Section
   ═══════════════════════════════════════════════════════════════════════ */
function PricingSection() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: '무료',
      monthly: 0,
      annual: 0,
      desc: '처음 시작하는 원장님께',
      features: ['AI 모델컷 3장', '워터마크 포함', '기본 해상도'],
      cta: '무료로 시작하기',
      style: 'border-[#E5E7EB] bg-white',
      ctaStyle: 'border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]',
    },
    {
      name: '프로',
      monthly: 19800,
      annual: 199000,
      desc: '성장하는 미용실을 위한 플랜',
      badge: 'BEST',
      features: ['AI 모델컷 월 100장', '스타일 시뮬레이션', 'SNS 자동 변환 50건', '고해상도 · 워터마크 없음', '래퍼럴 초대권 5개'],
      cta: '프로 시작하기',
      style: 'border-[#4F46E5] bg-white ring-2 ring-[#4F46E5]/10',
      ctaStyle: 'bg-[#4F46E5] text-white hover:bg-[#4338CA]',
    },
    {
      name: '프리미엄',
      monthly: 49800,
      annual: 499000,
      desc: '대형 매장 · 프랜차이즈용',
      features: ['AI 모델컷 무제한', '모든 프로 기능 포함', 'SNS 변환 무제한', '우선 생성 큐', '래퍼럴 초대권 10개'],
      cta: '프리미엄 시작하기',
      style: 'border-[#E5E7EB] bg-white',
      ctaStyle: 'border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]',
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <h2 className="text-center text-[22px] md:text-[32px] font-extrabold text-[#111827] leading-snug">
            스튜디오 촬영보다<br />더 빠르고 저렴해요
          </h2>
          <p className="text-center text-sm text-[#6B7280] mt-2">
            모든 요금제는 부가세 포함 가격입니다
          </p>
        </Reveal>

        {/* Toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!yearly ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>월간 결제</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-12 h-7 rounded-full transition-colors ${yearly ? 'bg-[#4F46E5]' : 'bg-[#D1D5DB]'}`}
          >
            <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${yearly ? 'translate-x-5' : ''}`} />
          </button>
          <span className={`text-sm font-medium ${yearly ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>
            연간 결제
            <span className="ml-1 text-xs text-[#4F46E5] font-semibold">2개월 무료</span>
          </span>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map((p, i) => (
            <Reveal key={p.name} className={`delay-${(i + 1) * 100}`}>
              <div className={`relative rounded-2xl border p-6 ${p.style} transition-shadow hover:shadow-lg`}>
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#4F46E5] text-white text-xs font-bold">
                    {p.badge}
                  </span>
                )}
                <h3 className="text-lg font-bold text-[#111827]">{p.name}</h3>
                <p className="text-xs text-[#9CA3AF] mt-1">{p.desc}</p>

                <div className="mt-5">
                  <span className="text-3xl font-extrabold text-[#111827]">
                    {(yearly ? p.annual / 12 : p.monthly) === 0
                      ? '0'
                      : Math.round(yearly ? p.annual / 12 : p.monthly).toLocaleString()}
                  </span>
                  <span className="text-sm text-[#9CA3AF] ml-1">원/월</span>
                </div>
                {yearly && p.annual > 0 && (
                  <p className="text-xs text-[#4F46E5] mt-1">연 {p.annual.toLocaleString()}원 일시납</p>
                )}

                <ul className="mt-5 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#4B5563]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={`mt-6 w-full py-3 rounded-xl text-sm font-semibold transition-colors ${p.ctaStyle}`}>
                  {p.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   13. Trust Section
   ═══════════════════════════════════════════════════════════════════════ */
function TrustSection() {
  const items = [
    { icon: '🔒', title: '개인정보 완전 보호', desc: '업로드 사진은 생성 후 즉시 서버에서 삭제됩니다' },
    { icon: '⚡', title: '빠른 생성 속도', desc: '평균 10초 이내 AI 모델컷 생성 완료' },
    { icon: '🎯', title: '전문 스튜디오 품질', desc: '전문 촬영 수준의 고해상도 이미지 제공' },
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-t border-[#F3F4F6]">
      <div className="max-w-4xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-xl shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111827]">{item.title}</h4>
                <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   14. Footer
   ═══════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#1E293B]">
      <div className="max-w-6xl mx-auto px-5 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center">
                <span className="text-white text-sm font-bold">H</span>
              </div>
              <span className="font-bold text-[15px] text-white">HairShot AI</span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed max-w-xs">
              미용실 원장님을 위한 AI 헤어 모델 이미지 생성 서비스.<br />
              초상권 걱정 없이 전문적인 포트폴리오를 만드세요.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-3">서비스</h4>
              <ul className="space-y-2 text-[#6B7280]">
                <li><a href="#features" className="hover:text-white transition-colors">기능 소개</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">갤러리</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">요금제</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">고객지원</h4>
              <ul className="space-y-2 text-[#6B7280]">
                <li><a href="#faq" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1E293B] text-xs text-[#4B5563] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span>&copy; 2025 HairShot AI. All rights reserved.</span>
          <span>문의: hello@hairshot.ai</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <PlatformSection />
      <SocialProofSection />
      <GallerySection />
      <UseCaseSection />
      <TestimonialSection />
      <ComparisonSection />
      <FAQSection />
      <CTASection />
      <PricingSection />
      <TrustSection />
      <Footer />
    </main>
  );
}

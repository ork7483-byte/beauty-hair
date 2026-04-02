'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E7EB]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span
            className={`text-xl font-bold tracking-tight transition-colors ${
              scrolled ? 'text-[#111827]' : 'text-white'
            }`}
          >
            HairShot
          </span>
          <span className="text-xl font-bold text-[#E11D48]">AI</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/pricing"
            className={`text-sm font-medium transition-colors hover:text-[#E11D48] ${
              scrolled ? 'text-[#6B7280]' : 'text-white/80'
            }`}
          >
            요금제
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            무료로 시작하기
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-[#111827]' : 'text-white'
          }`}
          aria-label="메뉴"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E7EB] px-6 py-4 flex flex-col gap-4 shadow-lg">
          <a
            href="/pricing"
            className="text-sm font-medium text-[#6B7280] hover:text-[#E11D48] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            요금제
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white text-sm font-semibold transition-all"
            onClick={() => setMenuOpen(false)}
          >
            무료로 시작하기
          </a>
        </div>
      )}
    </header>
  );
}

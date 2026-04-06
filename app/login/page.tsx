'use client'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 md:px-8 h-14 border-b border-[#F3F4F6] bg-white">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#4F46E5] flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <span className="font-bold text-[14px] text-[#111827]">HairShot AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-[#6B7280]">
          <Link href="/pricing" className="hover:text-[#4F46E5] transition-colors">요금제</Link>
        </div>
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4338CA] transition-colors"
        >
          로그인/회원가입
        </Link>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row lg:h-[calc(100vh-56px)]">
        {/* Left — 이미지 영역 */}
        <div className="relative hidden lg:flex lg:w-1/2 bg-[#111827] overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e1b4b]" />
          {/* Sample generated images grid */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-4 opacity-30">
            <div className="bg-gradient-to-br from-rose-300 to-pink-400 rounded-2xl" />
            <div className="bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl" />
            <div className="bg-gradient-to-br from-purple-300 to-fuchsia-400 rounded-2xl" />
            <div className="bg-gradient-to-br from-sky-300 to-blue-400 rounded-2xl" />
          </div>
          {/* Dark overlay + text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white/90 text-sm font-medium">
              HairShot AI에서 AI로 생성한 이미지입니다.
            </p>
          </div>
        </div>

        {/* Right — 로그인 폼 */}
        <div className="flex-1 flex items-center justify-center px-5 py-12 lg:py-0 bg-white">
          <div className="w-full max-w-sm space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-[24px] md:text-[28px] font-extrabold text-[#111827]">
                로그인/회원가입
              </h1>
              <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
                850+ 미용실 원장님이 이미 선택하셨어요.<br />
                모델 촬영 보다 80% 저렴해요.
              </p>
            </div>

            {/* 최근에 사용했어요 tooltip */}
            <div className="flex justify-center">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#111827] text-white text-xs font-medium">
                최근에 사용했어요
                <span className="ml-1">👆</span>
              </span>
            </div>

            {/* Login buttons */}
            <div className="space-y-3">
              {/* 카카오 */}
              <button className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-[#FEE500] text-[#191919] text-sm font-semibold hover:bg-[#FAE100] transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1C4.58 1 1 3.87 1 7.39c0 2.22 1.48 4.17 3.71 5.27-.16.59-.59 2.15-.67 2.48-.1.41.15.41.32.3.13-.09 2.09-1.42 2.94-2 .54.08 1.1.12 1.7.12 4.42 0 8-2.87 8-6.17S13.42 1 9 1z" fill="#191919"/>
                </svg>
                카카오로 시작하기
              </button>

              {/* 구글 */}
              <button className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-[#E5E7EB] bg-white text-[#374151] text-sm font-semibold hover:bg-[#F9FAFB] transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.96 10.71A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3-2.33z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                구글로 시작하기
              </button>

              {/* 구분선 */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                <span className="text-xs text-[#9CA3AF]">또는</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>

              {/* 이메일 */}
              <button className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-[#E5E7EB] bg-white text-[#374151] text-sm font-semibold hover:bg-[#F9FAFB] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                이메일로 시작하기
              </button>

              {/* 프랜차이즈 */}
              <button className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-[#E5E7EB] bg-white text-[#374151] text-sm font-semibold hover:bg-[#F9FAFB] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                프랜차이즈로 시작하기
              </button>
            </div>

            {/* Footer note */}
            <p className="text-center text-[11px] text-[#9CA3AF] leading-relaxed">
              시작하기를 누르면{' '}
              <a href="#" className="underline hover:text-[#6B7280]">이용약관</a> 및{' '}
              <a href="#" className="underline hover:text-[#6B7280]">개인정보처리방침</a>에<br />
              동의하는 것으로 간주합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

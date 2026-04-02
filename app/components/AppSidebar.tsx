'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { icon: '💇', label: 'AI 헤어 모델', href: '/app/hair-model' },
  { icon: '✨', label: '스타일 시뮬레이션', href: '/app/style-simulation' },
  { icon: '📱', label: 'SNS 변환', href: '/app/sns-content' },
  { icon: '📁', label: '내 갤러리', href: '/app/gallery' },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const used = 1
  const total = 3

  return (
    <aside
      className="flex flex-col bg-white border-r border-[#E5E7EB] h-screen sticky top-0"
      style={{ width: 240, minWidth: 240 }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#E5E7EB]">
        <span className="text-lg font-bold text-[#E11D48]">HairShot AI</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#FFF1F2] text-[#E11D48]'
                  : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Usage + Upgrade */}
      <div className="px-4 py-4 border-t border-[#E5E7EB] space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-[#6B7280]">남은 무료 횟수</span>
            <span className="text-xs font-semibold text-[#E11D48]">
              {total - used}/{total}건
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E11D48] rounded-full transition-all"
              style={{ width: `${((total - used) / total) * 100}%` }}
            />
          </div>
        </div>

        <Link
          href="/pricing"
          className="block w-full text-center py-2 px-4 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white text-sm font-semibold transition-colors"
        >
          업그레이드
        </Link>
      </div>
    </aside>
  )
}

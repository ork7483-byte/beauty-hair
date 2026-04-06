'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { icon: '🏠', label: '홈', href: '/app' },
  { icon: '💇', label: '모델컷', href: '/app/hair-model' },
  { icon: '✨', label: '시뮬레이션', href: '/app/style-simulation' },
  { icon: '📸', label: 'SNS', href: '/app/sns-content' },
  { icon: '👤', label: '마이', href: '/app/my' },
]

export default function MobileTabBar() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[#E5E7EB] safe-area-pb">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive = tab.href === '/app'
            ? pathname === '/app'
            : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 ${
                isActive ? 'text-[#4F46E5]' : 'text-[#9CA3AF]'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

import AppSidebar from '@/app/components/AppSidebar';
import AppTopNav from '@/app/components/AppTopNav';
import MobileHeader from '@/app/components/MobileHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh]">
      {/* Desktop sidebar — 원본: 좌측 전체 높이 */}
      <AppSidebar />

      {/* Right area — content (사이드바 오른쪽) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile only: 헤더 + 햄버거 메뉴 */}
        <MobileHeader />

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-auto">
          <section className="max-w-[66.25rem] mx-auto px-4 lg:px-5 xl:px-20">
            {/* Desktop only: 콘텐츠 영역 내부 상단 네비 (원본 구조) */}
            <AppTopNav />
            <div className="pt-5 pb-10">
              {children}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

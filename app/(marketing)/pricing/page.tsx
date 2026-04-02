'use client';

import { useState } from 'react';
import { PricingCards } from '../page';

const faqs = [
  {
    question: '무료 체험은 어떻게 이용하나요?',
    answer: '회원가입 후 신용카드 정보 없이 바로 3장을 무료로 생성할 수 있습니다. 별도 결제 정보 입력 없이 이용 가능합니다.',
  },
  {
    question: '고객 사진을 올려도 개인정보가 보호되나요?',
    answer: '네. 업로드된 사진은 AI 생성에만 사용되며, 생성 완료 후 즉시 서버에서 삭제됩니다. 고객의 얼굴 정보는 저장되지 않습니다.',
  },
  {
    question: '뒷모습 사진만 있어도 정면 AI 모델컷을 만들 수 있나요?',
    answer: '가능합니다. HairShot AI는 뒷모습 사진으로 시술된 헤어스타일을 분석한 뒤, 정면 또는 측면 AI 모델컷을 생성합니다. 사진의 각도에 제한이 없습니다.',
  },
  {
    question: '요금제를 중간에 변경하거나 해지할 수 있나요?',
    answer: '언제든지 가능합니다. 업그레이드는 즉시 적용되고, 다운그레이드는 다음 결제 사이클부터 적용됩니다. 해지 시 이미 결제된 기간은 계속 이용 가능합니다.',
  },
  {
    question: '래퍼럴(친구 초대) 혜택은 어떻게 받나요?',
    answer: '내 초대 링크로 친구가 가입하면 나와 친구 모두 추가 이미지 크레딧을 받습니다. 프로 플랜의 경우 월 5개, 프리미엄은 월 10개의 초대권이 제공됩니다.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-[#FECDD3] transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-[#FAFAFA] transition-colors"
      >
        <span className="text-[#111827] font-semibold text-sm md:text-base pr-4">{question}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            open ? 'border-[#E11D48] bg-[#E11D48] rotate-45' : 'border-[#D1D5DB]'
          }`}
        >
          <svg
            className={`w-3 h-3 transition-colors ${open ? 'text-white' : 'text-[#6B7280]'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white border-t border-[#F3F4F6]">
          <p className="text-[#6B7280] text-sm leading-relaxed pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#1C1917] to-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-[#E11D48] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
            요금제
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            부담 없이 시작하고<br />
            <span className="text-[#E11D48]">필요할 때 업그레이드하세요</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            무료 3장으로 먼저 경험하고, 마음에 들면 구독하세요.<br />
            언제든지 해지 가능합니다.
          </p>
        </div>
      </section>

      {/* Pricing table */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6">
          {/* Toggle */}
          <div className="flex justify-center mb-12">
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

          {/* Free trial note */}
          <div className="mt-10 text-center">
            <p className="text-[#6B7280] text-sm">
              모든 플랜 시작 전 <span className="text-[#E11D48] font-semibold">무료 3장 체험</span> 가능 · 신용카드 불필요
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-[#E11D48] tracking-widest uppercase mb-3">
              자주 묻는 질문
            </span>
            <h2 className="text-3xl font-bold text-[#111827]">
              궁금한 점이 있으신가요?
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1C1917] to-[#292524] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E11D48]/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            아직 망설이고 계신가요?
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            3장 무료 체험으로 직접 확인해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#E11D48] hover:bg-[#BE185D] text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              무료로 3장 만들어보기
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#FEE500] hover:bg-[#F9D700] text-[#3B1E08] font-bold transition-all duration-200 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.584 1.658 4.876 4.148 6.263L5.12 20.16a.375.375 0 00.545.426l4.51-2.988A11.2 11.2 0 0012 18c5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
              </svg>
              카카오톡 문의
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

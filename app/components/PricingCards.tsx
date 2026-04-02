'use client';

import { pricingPlans } from '../data/mock';

export default function PricingCards({ showYearly }: { showYearly: boolean }) {
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

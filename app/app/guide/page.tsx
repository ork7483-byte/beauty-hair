'use client'

import Link from 'next/link'

const EXAMPLE_PLACEHOLDERS = [
  { from: 'from-rose-100', to: 'to-pink-200', emoji: '💇' },
  { from: 'from-purple-100', to: 'to-fuchsia-200', emoji: '✂️' },
  { from: 'from-amber-100', to: 'to-orange-200', emoji: '🌟' },
]

const GOOD_TIPS = [
  '자연광 또는 밝은 조명에서 찍은 사진',
  '헤어 스타일이 잘 보이는 사진',
  '흔들리지 않고 선명하게 찍힌 사진',
]

const BAD_TIPS = [
  '얼굴이나 헤어가 잘린 사진',
  '이미 합성되어 있는 사진',
  '화질이 지나치게 낮은 사진',
]

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4">
      <div className="max-w-[640px] mx-auto space-y-7">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">사진 업로드 가이드</h1>
          <p className="text-sm text-[#6B7280] mt-1">좋은 결과물을 위해 아래 가이드를 참고해 주세요</p>
        </div>

        {/* Section 1: Example images */}
        <section>
          <p className="text-sm font-semibold text-[#374151] mb-3">
            다른 원장님들은 이렇게 업로드하셨어요
          </p>
          <div className="grid grid-cols-3 gap-3">
            {EXAMPLE_PLACEHOLDERS.map((ex, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl bg-gradient-to-br ${ex.from} ${ex.to} flex items-center justify-center`}
              >
                <span className="text-4xl">{ex.emoji}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Guide card */}
        <section>
          <p className="text-sm font-semibold text-[#374151] mb-3">업로드 가이드</p>
          <div className="space-y-3">

            {/* Good */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">✅</span>
                <p className="font-semibold text-green-800 text-sm">좋아요</p>
              </div>
              <ul className="space-y-2">
                {GOOD_TIPS.map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">·</span>
                    <span className="text-sm text-green-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bad */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">❌</span>
                <p className="font-semibold text-red-800 text-sm">좋지 않아요</p>
              </div>
              <ul className="space-y-2">
                {BAD_TIPS.map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">·</span>
                    <span className="text-sm text-red-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <span className="text-amber-500 flex-shrink-0">⚠️</span>
          <p className="text-xs text-amber-700 leading-relaxed">
            가이드에 맞지 않는 사진을 업로드할 경우 AI 생성 품질이 낮아질 수 있어요.
            최상의 결과를 위해 가이드를 지켜주세요.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/app"
          className="block w-full py-4 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold text-base text-center transition-colors"
        >
          확인했어요
        </Link>
      </div>
    </div>
  )
}

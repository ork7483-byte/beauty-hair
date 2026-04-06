import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HairShot AI — 시술 사진 한 장으로 AI 헤어 모델컷 완성",
  description: "초상권 걱정 없는 AI 헤어 모델컷을 10초 만에 만드세요. 850+ 미용실이 선택한 헤어 AI 이미지 생성 서비스.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

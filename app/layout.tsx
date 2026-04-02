import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HairShot AI — 헤어 모델 촬영, 이제 AI로 10초면 끝",
  description: "시술 사진 한 장이면 초상권 걱정 없는 AI 헤어 모델컷이 완성됩니다. 미용실 원장님을 위한 AI 이미지 생성 서비스.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="bg-[#FAFAFA] text-[#111827] antialiased">
        {children}
      </body>
    </html>
  );
}

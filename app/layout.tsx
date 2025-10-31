import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMS 딥링크 생성기",
  description: "SMS 번호로 쉽게 딥링크를 만들어보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}


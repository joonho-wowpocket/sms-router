import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SMS Deep Link Generator',
  description: 'Bitly 스타일로 SMS 딥링크와 하이퍼링크 텍스트를 빠르게 생성하세요.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}


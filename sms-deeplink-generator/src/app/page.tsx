import { Suspense } from 'react';
import { SmsLinkForm } from '@/components/sms-link-form';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col px-4 pb-16 pt-20">
      <div className="mx-auto w-full max-w-5xl space-y-12">
        <header className="space-y-6 text-center">
          <p className="mx-auto inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-zinc-500 shadow-sm ring-1 ring-zinc-200">
            Bitly 스타일 SMS 딥링크
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            원하는 번호로 곧바로 연결되는 SMS 링크를 만들어 보세요
          </h1>
          <p className="mx-auto max-w-2xl text-base text-zinc-500">
            번호를 입력하면 `sms:` 스킴 링크와 하이퍼링크 HTML이 동시에 생성됩니다. 별도 서버 없이도
            빠르게 공유하고, 여러 문서나 블로그에 응용해 보세요.
          </p>
        </header>

        <Suspense fallback={<div className="text-center text-sm text-zinc-500">폼을 불러오는 중이에요…</div>}>
          <SmsLinkForm />
        </Suspense>
      </div>
    </main>
  );
}


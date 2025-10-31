'use client';

import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState, useTransition } from 'react';

type FormState = {
  phone: string;
  message: string;
  label: string;
};

const INITIAL_STATE: FormState = {
  phone: '',
  message: '',
  label: 'SMS 보내기'
};

const PHONE_ALLOWED = /[^\d+]/g;

function buildSmsLink({ phone, message }: Pick<FormState, 'phone' | 'message'>) {
  const sanitized = phone.replace(PHONE_ALLOWED, '');
  if (!sanitized) return '';

  const body = message.trim();
  const qs = body ? `?&body=${encodeURIComponent(body)}` : '';
  return `sms:${sanitized}${qs}`;
}

export function SmsLinkForm() {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [copiedId, setCopiedId] = useState<'link' | 'html' | 'rich' | null>(null);
  const [isPending, startTransition] = useTransition();

  const smsLink = useMemo(() => buildSmsLink(formState), [formState]);
  const htmlSnippet = useMemo(() => {
    if (!smsLink) return '';
    const label = formState.label.trim() || 'SMS 보내기';
    return `<a href="${smsLink}">${label}</a>`;
  }, [smsLink, formState.label]);

  const handleChange = useCallback(
    (key: keyof FormState) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        startTransition(() => {
          setFormState((previous) => ({
            ...previous,
            [key]: key === 'phone' ? value.replace(PHONE_ALLOWED, '') : value
          }));
        });
      },
    []
  );

  const handleReset = useCallback(() => {
    startTransition(() => {
      setFormState(INITIAL_STATE);
      setCopiedId(null);
    });
  }, []);

  const copyToClipboard = useCallback(async (value: string, id: 'link' | 'html') => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('클립보드 복사 실패', error);
      alert('클립보드로 복사하지 못했어요. 다시 시도해 주세요.');
    }
  }, []);

  const copyLinkedText = useCallback(async () => {
    if (!smsLink) return;
    const label = formState.label.trim() || 'SMS 보내기';
    const html = `<a href="${smsLink}">${label}</a>`;

    try {
      if (
        typeof window !== 'undefined' &&
        typeof ClipboardItem !== 'undefined' &&
        navigator.clipboard &&
        'write' in navigator.clipboard
      ) {
        const item = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([label], { type: 'text/plain' })
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(html);
      }

      setCopiedId('rich');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('하이퍼링크 텍스트 복사 실패', error);
      alert('링크된 텍스트를 복사하지 못했어요. 다시 시도해 주세요.');
    }
  }, [formState.label, smsLink]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <header className="mb-6 space-y-2">
          <h2 className="text-2xl font-semibold">SMS 딥링크 만들기</h2>
          <p className="text-sm text-zinc-500">
            전화번호와 메시지를 입력하면 즉시 사용할 수 있는 `sms:` 링크와 하이퍼링크 HTML을 만들어 드릴게요.
          </p>
        </header>

        <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-700">수신 전화번호 *</span>
            <input
              required
              inputMode="tel"
              pattern="[0-9+]+"
              placeholder="예: +821012345678"
              value={formState.phone}
              onChange={handleChange('phone')}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
            />
            <span className="text-xs text-zinc-400">국제 번호 표기(예: +82) 또는 숫자만 입력하세요.</span>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-700">기본 메시지</span>
            <textarea
              placeholder="예: 안녕하세요! 방금 만든 링크로 접속해 주세요."
              value={formState.message}
              onChange={handleChange('message')}
              rows={4}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
            />
            <span className="text-xs text-zinc-400">
              기본 SMS 메시지를 미리 채워둘 수 있어요. 비워두면 메시지 없이 링크만 생성됩니다.
            </span>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-700">하이퍼링크 표시 텍스트</span>
            <input
              placeholder="예: 방금 만든 링크 바로 열기"
              value={formState.label}
              onChange={handleChange('label')}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
            />
            <span className="text-xs text-zinc-400">링크에 붙일 텍스트를 자유롭게 지정하세요.</span>
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-200"
              disabled={isPending}
            >
              초기화
            </button>
            <span className="text-xs text-zinc-400">입력 즉시 링크가 생성되니 따로 제출 버튼이 필요 없어요.</span>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-xl font-semibold">바로 복사할 결과</h3>
          <p className="text-sm text-zinc-500">필요한 형식으로 준비된 링크를 즉시 복사하세요.</p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <header className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-semibold">SMS 링크</h4>
                <p className="text-xs text-zinc-500">바로 붙여 넣거나 공유해 보세요.</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(smsLink, 'link')}
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800 disabled:opacity-30"
                disabled={!smsLink}
              >
                {copiedId === 'link' ? '복사 완료!' : '링크 복사'}
              </button>
            </header>
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-700 break-all">
              {smsLink || '유효한 전화번호를 입력하면 링크가 보여요.'}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <header className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-semibold">하이퍼링크 HTML</h4>
                <p className="text-xs text-zinc-500">블로그나 이메일에 바로 붙여 넣을 수 있어요.</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(htmlSnippet, 'html')}
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800 disabled:opacity-30"
                disabled={!htmlSnippet}
              >
                {copiedId === 'html' ? '복사 완료!' : 'HTML 복사'}
              </button>
            </header>
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-700 break-all whitespace-pre-wrap">
              {htmlSnippet || '링크가 생성되면 HTML 스니펫이 표시됩니다.'}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <header className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-semibold">링크된 텍스트</h4>
                <p className="text-xs text-zinc-500">텍스트 그대로 붙여도 링크가 유지돼요.</p>
              </div>
              <button
                type="button"
                onClick={copyLinkedText}
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800 disabled:opacity-30"
                disabled={!smsLink}
              >
                {copiedId === 'rich' ? '복사 완료!' : '링크된 텍스트 복사'}
              </button>
            </header>
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
              {smsLink ? (
                <a href={smsLink} className="text-zinc-900 underline decoration-zinc-400 decoration-2 underline-offset-4">
                  {formState.label.trim() || 'SMS 보내기'}
                </a>
              ) : (
                '링크가 생성되면 하이퍼링크된 텍스트가 표시됩니다.'
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">실시간 미리보기</h3>
        <p className="text-sm text-zinc-500">아래 버튼을 눌러 실제로 동작하는지 확인해 보세요.</p>
        <div className="mt-4">
          {smsLink ? (
            <a
              href={smsLink}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              {formState.label.trim() || 'SMS 보내기'}
            </a>
          ) : (
            <span className="inline-flex items-center justify-center rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-400">
              링크가 아직 없어요
            </span>
          )}
        </div>
      </section>
    </div>
  );
}


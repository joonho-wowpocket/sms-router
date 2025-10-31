"use client";

import { useState } from "react";

export default function SmsLinkGenerator() {
  // 폼 상태 관리
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [linkText, setLinkText] = useState("문자 보내기");
  const [generatedLink, setGeneratedLink] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [copied, setCopied] = useState(false);

  // SMS 링크 생성 함수
  const generateSmsLink = () => {
    if (!phoneNumber) {
      alert("전화번호를 입력해주세요!");
      return;
    }

    // 전화번호에서 특수문자 제거 (-, 공백 등)
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "");
    
    // SMS 딥링크 생성
    // iOS: sms:NUMBER&body=MESSAGE
    // Android: sms:NUMBER?body=MESSAGE
    // 호환성을 위해 ? 사용
    const encodedMessage = encodeURIComponent(message);
    const smsUrl = `sms:${cleanNumber}${message ? `?body=${encodedMessage}` : ""}`;
    
    // HTML 링크 생성
    const htmlLink = `<a href="${smsUrl}">${linkText || "문자 보내기"}</a>`;
    
    setGeneratedLink(smsUrl);
    setGeneratedHtml(htmlLink);
    setCopied(false);
  };

  // 클립보드 복사 함수
  const copyToClipboard = async (text: string, type: "link" | "html") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 전화번호 포맷팅 (한국 번호 기준)
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    if (numbers.length <= 10) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* 입력 폼 */}
      <div className="space-y-6">
        {/* 전화번호 입력 */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            받는 사람 전화번호 *
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="010-1234-5678"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
          <p className="mt-1 text-xs text-gray-500">
            예: 010-1234-5678 또는 01012345678
          </p>
        </div>

        {/* 메시지 입력 */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            기본 메시지 (선택사항)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="문자에 미리 입력될 내용을 작성하세요"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
          />
        </div>

        {/* 링크 텍스트 입력 */}
        <div>
          <label htmlFor="linkText" className="block text-sm font-medium text-gray-700 mb-2">
            링크에 표시될 텍스트
          </label>
          <input
            id="linkText"
            type="text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            placeholder="문자 보내기"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* 생성 버튼 */}
        <button
          onClick={generateSmsLink}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          🔗 링크 생성하기
        </button>
      </div>

      {/* 결과 표시 */}
      {generatedLink && (
        <div className="mt-8 space-y-4 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">생성된 링크</h3>
          
          {/* 미리보기 */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">미리보기:</p>
            <a
              href={generatedLink}
              className="text-indigo-600 hover:text-indigo-800 underline font-medium"
            >
              {linkText || "문자 보내기"}
            </a>
          </div>

          {/* URL 복사 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMS URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono"
              />
              <button
                onClick={() => copyToClipboard(generatedLink, "link")}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition font-medium text-sm"
              >
                {copied ? "✓ 복사됨" : "복사"}
              </button>
            </div>
          </div>

          {/* HTML 코드 복사 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HTML 코드 (웹사이트에 바로 사용)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={generatedHtml}
                readOnly
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono"
              />
              <button
                onClick={() => copyToClipboard(generatedHtml, "html")}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition font-medium text-sm"
              >
                {copied ? "✓ 복사됨" : "복사"}
              </button>
            </div>
          </div>

          {/* 사용 안내 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 사용방법:</strong> 생성된 링크를 클릭하면 모바일 기기에서 자동으로 문자 앱이 열립니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


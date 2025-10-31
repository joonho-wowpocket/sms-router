"use client";

import { useState } from "react";
import SmsLinkGenerator from "./components/SmsLinkGenerator";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📱 SMS 딥링크 생성기
          </h1>
          <p className="text-gray-600">
            전화번호와 메시지를 입력하면 클릭 한 번으로 SMS를 보낼 수 있는 링크를 만들어드려요
          </p>
        </div>

        {/* Main Component */}
        <SmsLinkGenerator />

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>💡 Tip: 생성된 링크를 웹사이트, 이메일, QR코드 등 어디든 사용하세요</p>
        </div>
      </div>
    </main>
  );
}


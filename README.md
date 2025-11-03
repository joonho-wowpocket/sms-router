# 📱 SMS 딥링크 생성기

Bitly처럼 SMS 번호를 입력하면 클릭 한 번으로 문자를 보낼 수 있는 딥링크를 생성하는 간단한 웹 앱입니다.

## ✨ 주요 기능

- 📞 전화번호 입력 (자동 포맷팅)
- 💬 기본 메시지 설정
- 🔗 원하는 텍스트에 하이퍼링크 생성
- 📋 클립보드 복사 (URL 및 HTML 코드)
- 📱 모바일 친화적 디자인
- ⚡ 빠르고 직관적인 UI

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
# 또는
yarn install
```

### 2. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어보세요.

### 3. 빌드 및 배포

```bash
npm run build
npm start
```

## 📖 사용 방법

1. **전화번호 입력**: 받는 사람의 전화번호를 입력하세요 (예: 010-1234-5678)
2. **메시지 작성** (선택): 문자에 미리 입력될 내용을 작성하세요
3. **링크 텍스트 설정**: 하이퍼링크에 표시될 텍스트를 입력하세요
4. **링크 생성**: "링크 생성하기" 버튼을 클릭하세요
5. **복사 및 사용**: 생성된 URL 또는 HTML 코드를 복사해서 사용하세요

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React 18 (Client Components)

## 📱 지원 플랫폼

- iOS (Safari)
- Android (Chrome, Samsung Internet)
- 모든 모바일 기기에서 작동

## 🌐 배포

### Vercel (권장)

```bash
vercel
```

또는 GitHub repository와 연결하면 자동 배포됩니다.

## 💡 작동 원리

SMS 딥링크는 `sms:` 프로토콜을 사용합니다:

- **기본 형식**: `sms:전화번호`
- **메시지 포함**: `sms:전화번호?body=메시지내용`

이 링크를 클릭하면 모바일 기기에서 자동으로 문자 앱이 열리고 번호와 메시지가 입력됩니다.

## 📝 라이센스

MIT

## 🤝 기여

이슈와 PR은 언제나 환영합니다!


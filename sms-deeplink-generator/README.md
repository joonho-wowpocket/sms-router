# SMS Deep Link Generator

Next.js(App Router) 기반의 간단한 SMS 딥링크 생성기입니다. 전화번호와 메시지를 입력하면 즉시 사용할 수 있는 `sms:` 스킴 링크와 하이퍼링크 HTML 스니펫을 만들어 줍니다.

## 사용 방법

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 폼을 입력해 링크를 만들어 보세요.

## 주요 기능

- 전화번호를 실시간으로 정규화하여 안전한 `sms:` 링크 생성
- 기본 메시지 입력 시 자동 `body` 쿼리스트링 인코딩
- 하이퍼링크 텍스트 지정 및 즉시 미리보기 제공
- 버튼 한 번으로 링크와 HTML 스니펫 클립보드 복사

## 배포 가이드

가장 간단한 방법은 [Vercel](https://vercel.com)을 사용하는 것입니다. 이 저장소를 가져온 뒤 Vercel 프로젝트와 연결하면 자동으로 빌드 및 배포가 진행됩니다.


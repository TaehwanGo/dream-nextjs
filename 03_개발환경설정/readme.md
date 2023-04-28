# 3. 개발 환경 설정

## 3.1 챕터 소개

- Next.js vs. React
- 직접 설치
- 다양한 Next.js로 구성된 사이트들

## 3.2 개발 환경 설정

- 아래 항목들에 적힌 버전은 엘리가 강의를 진행한 시점의 버전입니다.
- 코드 에디터
  - VSCode
- Node.js
  - v18.13.0
- Git
  - 2.37.3
- Yarn 또는 npm
  - Yarn : 3.2.3

## 3.3 공식 사이트 확인

- 대부분 공식 사이트는 해당 기술이 무엇인지, 어떤 철학을 가지고 있는지 알려줌
  - https://nextjs.org/
- Next.js
  - 웹을 위한 React 프레임워크
  - 풀스택 웹 어플리케이션을 만드는 것을 가능하게 해준다
- Getting Started 보면서 따라하다가 필요할 때 찾아서 보면 된다
- Docs에 대한 내용은 v12 버전으로 되어있기 때문에 v13버전도 같이보면서 공부하면 좋다
  - 12버전 : https://nextjs.org/docs
  - 13버전 : https://beta.nextjs.org/docs

## 3.4 첫 프로젝트 만들어보기

- 강의에선 13버전으로 같이 공부하고
- 12버전에선 어떻게 구현했는지 같이 보면서 학습한다

### Getting Started

- https://beta.nextjs.org/docs/getting-started
- Routing

  - file-system
  - layouts
  - nested routing
  - loading states
  - error handling
  - ...

- Rendering

  - Client and Server Components

- Data Fetching
- Caching
- Optimizing(최적화)
- Transpilation
- API
  - 12버전과 동일한 방식인 pages 안에 정의해야 함
- Tooling

  - Turbopack이 추가되었지만 아직 안정적이지 않아서 Webpack을 사용

### Installation

- https://beta.nextjs.org/docs/installation

- Node 16.8 버전 이상 필요

- 간편하게 시작하기

```bash
npx create-next-app@latest --experimental-app
```

- project name? : my-app
- use typescript? : Yes
- use ESLint? : Yes
- use 'src/' directory? : Yes
- use Tailwind CSS? : No (이번에 버전오르면서 새로 추가된 것 같다)
- import alias? @/\*

## 3.5 프로젝트 구조 파악

- public
  - 외부에 공개하는 resource
- src

  - app

- 현재 내가 강의를 듣는 시점인 next.js 13.3.1 버전에서는 pages 폴더가 더 이상 존재하지 않는다

  - api 디렉토리 경로도 app안에 들어있음

- page.tsx가 페이지 진입점
- page.module.css는 css module
- 기본적으로 css module이 활성화 되어있다

## 3.6 실행 해보기 + SSG 확인

#### package.json

```json
// ...
  "scripts": {
    "dev": "next dev", // 우리가 개발할 때 쓰는 개발용 모드
    "build": "next build", // 서버에 배포한 뒤에 프로젝트를 빌드할 때
    "start": "next start", // 서버에 배포한뒤 빌드 후 실행할 때 쓰는 것
    "lint": "next lint" // 프로젝트 소스코드를 검사할 때(ESLint)
  },
// ...
```

- dev 모드에서 실행한 경우엔 static site generation이 적용되지 않는다
  - 항상 SSR

## 3.7 다양한 사이트 구경가기

- https://nextjs.org/showcase

  - 틱톡, 트위치, 넷플릭스, 노션, 나이키, ...

- 크롬익스텐션의 Wappalyzer를 통해 어떤 기술을 사용하는지 확인할 수 있다

  - https://www.wappalyzer.com/
  - https://chrome.google.com/webstore/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg?hl=ko

- Next.js로 구성된 다양한 템플릿도 가져다 사용할 수 있다
  - https://vercel.com/templates/next.js?utm_source=next-site&utm_medium=navbar&utm_campaign=showcase

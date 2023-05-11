# 4. 개념1 - 페이지 구성

## 4.1 챕터 소개

- 웹앱을 구성하는 기본적인 내용들
  - Static Routing, Dynamic Routing, Build
  - Layout, Link, SEO

## 4.2 프로젝트 셋업

```bash
npx create-next-app@latest
```

Installing dependencies:

- react
- react-dom
- next
- typescript
- @types/react
- @types/node
- @types/react-dom
- eslint
- eslint-config-next

## 4.3 정적 라우팅 (버전12)

- pages 폴더에 파일을 생성하면 자동으로 라우팅이 된다.
- 중첩된 경로를 만들고 싶다면
  - pages 폴더에 폴더를 생성하고 그 안에 파일을 생성하면 된다.

## 4.4 정적 라우팅 (버전13)

- 왜 13버전이 나오고
- 왜 pages 대신 app이 나왔을까?
  - 새로운 기능을 많이 추가해서 12버전에서 13버전으로 업데이트 해도 기존 코드가 깨지지 않도록 하기 위해서 pages 대신 app이 나왔다.
- 경로 별로 재사용하고 싶은 컴포넌트가 있다면?

  - layout

- 폴더를 만들고 page.tsx를 만들어서 고정적으로 생긴 라우팅이 정적 라우팅이다

## 4.5 ~ 4.6 정적 라우팅 연습

## 4.7 빌드 결과 분석 해보기

- npm run dev로 실행하면 SSR이기 때문에 요청마다 해당 페이지가 컴파일링이 되면서 페이지가 렌더링 된다.

```bash
Route (app)                                Size     First Load JS
┌ ○ /                                      152 B            77 kB
├ ○ /about                                 153 B            77 kB
├ ○ /contact                               153 B            77 kB
├ ○ /favicon.ico                           0 B                0 B
├ ○ /products                              152 B            77 kB
└ ○ /products/pants                        152 B            77 kB
+ First Load JS shared by all              76.8 kB
  ├ chunks/139-ecdfc5cea483cfbb.js         24.4 kB
  ├ chunks/2443530c-9d09dde9f906fe30.js    50.5 kB
  ├ chunks/main-app-28c0407b629409e8.js    211 B
  └ chunks/webpack-e2e35aa1d7ee76d8.js     1.65 kB

Route (pages)                              Size     First Load JS
┌ ○ /404                                   178 B            86 kB
└ λ /api/hello                             0 B            85.8 kB
+ First Load JS shared by all              85.8 kB
  ├ chunks/main-ff216a5d0f2c8abd.js        83.9 kB
  ├ chunks/pages/_app-c544d6df833bfd4a.js  192 B
  └ chunks/webpack-e2e35aa1d7ee76d8.js     1.65 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

- app 폴더 안에 어떤 라우터가 정의되어 있는지 확인 가능
- 처음으로 로드되는 js 파일의 각 크기
- 프로젝트에 보이진 않지만 pages에 404 페이지가 있다.
- ○ 표시가 되어 있는 것은 정적 페이지라는 뜻이다.
- λ 표시가 되어 있는 것은 서버사이드 렌더링이라는 뜻이다.
- 빌드를 하면 dev 모드에서의 SSR과 달리 SSG로 된 페이지들은 빠르게 렌더링이 된다.

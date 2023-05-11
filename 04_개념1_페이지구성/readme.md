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

## 4.8 동적 라우팅

- products/[slug].tsx

  - 대괄호를 쓰고 키워드를 적으면 됨

- 자주 사용하는 것은 미리 만들고 싶다면? 4.9를 공부하자

## 4.9 페이지 미리 생성

- 원하는 경로에서 페이지를 미리 만들어두고 싶다면?
  - dynamic route를 사용하는 페이지에서 getStaticPaths 함수를 export 해주면 된다.

```tsx
type Props = {
  params: {
    slug: string;
  };
};
export default function PantsPage({ params }: Props) {
  return <div>Products/ {params.slug} Page</div>;
}

/**
 * dynamic route에서 특정 경로에 대해서는
 * 페이지를 미리 만들고 싶다면
 * 그 경로를 미리 알려줄 때 사용하는 함수
 */
export function generateStaticParams() {
  const products = ["pants", "shirts", "shoes"];
  return products.map((product) => ({
    slug: product,
  }));
}
```

```bash
Route (app)                                Size     First Load JS
┌ ○ /                                      153 B            77 kB
├ ○ /about                                 153 B            77 kB
├ ○ /contact                               153 B            77 kB
├ ○ /favicon.ico                           0 B                0 B
├ ○ /products                              152 B            77 kB
└ ● /products/[slug]                       153 B            77 kB
    ├ /products/pants
    ├ /products/shirts
    └ /products/shoes
+ First Load JS shared by all              76.8 kB
  ├ chunks/139-ecdfc5cea483cfbb.js         24.4 kB
  ├ chunks/2443530c-9d09dde9f906fe30.js    50.5 kB
  ├ chunks/main-app-28c0407b629409e8.js    211 B
  └ chunks/webpack-e2e35aa1d7ee76d8.js     1.65 kB

Route (pages)                              Size     First Load JS
┌ ○ /404                                   178 B          85.9 kB
└ λ /api/hello                             0 B            85.8 kB
+ First Load JS shared by all              85.8 kB
  ├ chunks/main-1574691a5ff7f5b4.js        83.9 kB
  ├ chunks/pages/_app-c544d6df833bfd4a.js  192 B
  └ chunks/webpack-e2e35aa1d7ee76d8.js     1.65 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

- /products/[slug] 경로에서 미리 만들고자 하는 페이지는 SSG로 생성되었다

## 4.10 공식 사이트 읽기

- 지금까지 file base routing에 대해 알아보았습니다
- routing
  - https://nextjs.org/docs/app/building-your-application/routing
- pages and layouts
  - https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
- (그룹-디렉토리) : app/(그룹-디렉토리)
  - 라우팅에 영향을 주진 않지만 그룹으로 묶고 싶을 때 사용 가능
- app/shop/[...slug]/page.js
  - ...slug는 여러개의 경로를 받을 수 있다는 뜻
  - /shop/a/b/c/d/e/f/g/h/i/j/k/l/m/n/o/p/q/r/s/t/u/v/w/x/y/z
    - 이런식으로 여러개의 경로를 받을 수 있다.
    - { slug: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", ...] }
- app/shop/`[[...slug]]`/page.js
  - 대괄호가 두개를 사용했다면 있어도 되고 없어도 되는 옵셔널
  - /shop => params : {}
  - /shop/a => params : { slug: ["a"] }
  - /shop/a/b => params : { slug: ["a", "b"] }

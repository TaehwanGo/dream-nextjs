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

## 4.11 Not Found 페이지

- File convention

  - page.tsx : 해당 디렉토리에서 표시할 페이지

- 해당 경로 내에서 `notFound 함수를 호출`하면 not-found.tsx를 렌더링한다.
- 기본적으로 404 페이지는 next.js에서 제공되는 페이지가 나온다
- 하지만 notFound()를 호출하면 not-found.tsx가 나온다.
  - `import { notFound } from "next/navigation";`
- not-found.tsx은 각 디렉토리 마다 만들 수 있다
- pages/404.tsx를 만들면 모든 경로에서 404 페이지가 나온다.

## 4.12 레이아웃으로 골격을!(layout.tsx)

- page.tsx는 해당 디렉토리의 페이지를 렌더링하는 역할을 한다.
- layout.tsx는 page.tsx를 감싸서 공통으로 사용할 UI를 만드는 역할을 한다.
  - layout.tsx에서 children을 사용해서 하위 디렉토리의 page.tsx를 감싸준다.

### Post CSS

- 이름.module.css 와 같이 module을 중간에 붙여줘야 한다

## 4.13 ~ 4.14 레이아웃 챌린지

## 4.15 링크 만들기

- a대신 Link를 사용하자

  - import Link from "next/link";

- `<Link>` 컴포넌트
  - https://nextjs.org/docs/app/api-reference/components/link
  - `<Link>`는 HTML `<a>` 요소를 확장하여 경로 간 prefetching 및 클라이언트 측 네비게이션(페이지이동)을 제공하는 React 구성 요소입니다. Next.js에서 경로 사이를 탐색하는 기본 방법입니다.
    - prefetching
      - https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#prefetching
      - 미리 가져오기는 경로를 방문하기 전에 백그라운드에서 미리 로드하는 방법입니다. 미리 가져온 경로의 렌더링 결과는 라우터의 클라이언트 측 캐시에 추가됩니다. 이렇게 하면 미리 가져온 경로로 거의 즉시 탐색할 수 있습니다.

## 4.16 ~ 4.17 제품 링크 만들기

- https://nextjs.org/docs/app/building-your-application/optimizing/metadata

## 4.18 변화에 대처하는 자세

- 페이지별 SEO도 할 수 있다
  - https://nextjs.org/docs/basic-features/pages#next-seo
- SEO : Search Engine Optimization
- 공식 문서를 확인하자
- 이전에는 Head.tsx를 이용했지만 이제는 Metadata를 사용하자
  - https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- 시시각각 변하는 트렌드를 따라간다는 것은 변화의 역사를 직접 체험할 수 있는 좋은 기회이다

## 4.19 SEO 중요 내용

- https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- static과 dynamic metadata 모두 오직 서버컴포넌트에서만 사용가능하다

### Static Metadata

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function Page() {
  return "...";
}
```

### Dynamic Metadata

```tsx
import type { Metadata } from "next";

// The `fetch` response is cached and reused between both functions
// below, resulting in a single API request. If you cannot use `fetch`
// directly, you can use `cache`. Learn more:
// https://beta.nextjs.org/docs/data-fetching/caching
async function getProduct(id) {
  const res = await fetch(`https://.../api/products/${id}`);
  return res.json();
}

// 비동기적으로 메타데이터를 생성
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  return { title: product.title };
}

export default async function Page({ params }) {
  const product = await getProduct(params.id);
  // ...
}
```

### JSON-LD

- 검색엔진(search engine)이 이해할 수 있는 데이터 포맷

```tsx
// app/products/[id]/page.tsx
export default async function Page({ params }) {
  const product = await getProduct(params.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
  };

  return (
    <section>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... */}
    </section>
  );
}
```

### title template

- title을 위한 템플릿을 만들어서 사용할 수도 있다
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template

```tsx
// app/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme",
  },
};
```

```tsx
// app/about/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

// Output: <title>About | Acme</title>
```

### 메타 데이터 정리

#### 자식 노드에 있는 메타데이터가 상위의 메타데이터를 덮어쓸 수 있음

- 상위 layout.tsx의 메타데이터 중 description은 그대로 쓰고 title만 업데이트 할 수도 있다

```tsx
// src/app/products/[slug]/page.tsx
export function generateMetadata({ params }: Props) {
  return {
    title: `제품의 이름: ${params.slug}`,
  };
}
```

- 만약 자식노드에 별도로 메타데이터가 없다면 상위의 메타데이터를 따라감

- 메타데이터를 하나도 지정하지 않아도 viewport에 대한 정보는 자동으로 지정됨

#### title을 위한 템플릿을 만들어서 사용할 수도 있다

## 4.20 Nextjs 장점 파악!

- Link 태그를 사용하면 해당 페이지에 대한 정보를 미리 prefetching해온다

## 4.21 마무리

- SSG로 만들고 싶다면
  - generateStaticParams 함수를 컴포넌트 맨 밑에서 사용함으로써 만들 수 있다
- not-found
  - 해당 경로에서 notFound()를 호출하면 not-found.tsx를 렌더링한다.
- 재사용 가능한 레이아웃
  - layout.tsx
- Link 태그
  - prefetching
- SEO
  - static과 dynamic `metadata` 모두 오직 서버컴포넌트에서만 사용가능하다
  - JSON-LD
  - title template

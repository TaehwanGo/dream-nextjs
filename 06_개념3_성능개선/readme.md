# 6. 성능 개선

## 6.1 챕터 소개

- Loading
- Error
- Image
- Font
- Redirect
- Rewrite
- Middleware

## 6.2 로딩 UI

- 13버전 부터는 folder 단위로 route를 구성해나갔다
  - some-route/page.tsx
- 그 이유는?
  - 해당 라우트를 위한 다양한 파일들을 만들 수 있다
    - page.tsx
    - layout.tsx
    - not-found.tsx
    - 이제는 loading.tsx에 대해 알아보자

### loading.tsx

- 해당 라우트에서 페이지 UI가 준비되기 이전에 무언가 준비중이라는 것을 보여주기 위한 UI 컴포넌트
- React에서 제공하는 Suspense, Boundary를 사용하는 것과 동일하다
- 해당 경로에 loading.tsx를 만들고 UI를 구성하면 된다
- 전체 페이지가 다 대체된다

## 6.3 병렬적으로 수행

- 어떤 원리로 동작하는지 자세히 알아보자
- 공식 문서
  - https://nextjs.org/docs/app/api-reference/file-conventions/loading
- 서버 컴포넌트와 클라이언트 컴포넌트 모두에서 사용할 수 있다
- 해당 페이지가 layout같은 것을 사용하고 있다면 공통 layout을 제외하고 해당 컴포넌트에 해당하는 부분에만 loading이 적용된다
- 내부적으론 React Suspense를 사용해서 구현되었다

```tsx
// 내부적으로 Suspense를 사용해서 구현된 예시
export default function Loading() {
  return <LoadingSkeleton />;
}

<Layout>
  <Header />
  <Suspense fallback={<Loading />}>
    <Page />
  </Suspense>
</Layout>;
```

- 로딩 파일의 한계점

  - 전체 페이지가 대체되기 때문에 필요한 곳에서 부분적으로 Suspense를 사용해도 된다

- https://nextjs.org/docs/app/building-your-application/data-fetching#parallel-and-sequential-data-fetching
  - 병렬적으로 데이터를 요청하면 더 빠르게 페이지를 로딩할 수 있다
    - Promise.all을 사용해서 병렬적으로 요청할 수 있다
    - https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#parallel-data-fetching
  - 하지만 Promise.all은 전부 로딩이 끝날 때 까지 기다려야 하므로 부분적으로 Suspense를 적용해서 부분적으로 로딩을 적용할 수도 있다

```tsx
// Suspense를 사용해서 부분적으로 로딩을 적용하는 예시
import { getArtist, getArtistAlbums, type Album } from "./api";

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  // Initiate both requests in parallel
  const artistData = getArtist(username);
  const albumData = getArtistAlbums(username);

  // Wait for the artist's promise to resolve first
  const artist = await artistData;

  return (
    <>
      <h1>{artist.name}</h1>
      {/* Send the artist information first,
          and wrap albums in a suspense boundary */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <Albums promise={albumData} />
      </Suspense>
    </>
  );
}

// Albums Component
async function Albums({ promise }: { promise: Promise<Album[]> }) {
  // Wait for the albums promise to resolve
  const albums = await promise;

  return (
    <ul>
      {albums.map((album) => (
        <li key={album.id}>{album.name}</li>
      ))}
    </ul>
  );
}
```

## 6.4 에러 UI

- loading은 React Suspense를 사용해서 구현되었다
- 에러 UI는 React Error Boundary를 사용해서 구현된다
- 공식 문서
  - https://nextjs.org/docs/app/api-reference/file-conventions/error
  - https://nextjs.org/docs/app/building-your-application/routing/error-handling
- route별로 에러 UI를 구성할 수 있다

```tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
```

- 에러 컴포넌트는 클라이언트이므로 무조건 'use client'를 사용해야 한다

## 6.5 이미지

- 공식 문서
  - https://nextjs.org/docs/app/building-your-application/optimizing/images
- public/images에 이미지를 넣어서 테스트를 해보자
- local에 있는 이미지를 Next에서 보여줄 때 어떻게 처리되는지 알아보자
  - 자동 최적화
- 인터넷 상에 있는 이미지는 어떻게 할까?
  - width, height을 지정해야 한다
    - 부모 컴포넌트에 width, height이 지정이 되었다면 fill이라는 속성을 사용하면 Image태그에 지정하지 않아도 된다
      - 부모 컴포넌트는 대신 static이면 안된다
      - ObjectFit을 사용해서 이미지를 채울 수 있다
  - next.config.js에서도 등록을 해줘야 한다
- Image 컴포넌트의 장점

  - 이미지 사이즈 최적화
  - 사이즈가 정해져있고 그 영역을 차지하고 있기 때문에 layout shift가 발생하지 않는다

- 한 페이지에서 이미지가 많은 경우 우선순위를 정할 수 있다
- blur 옵션을 줄 수도 있다

```tsx
<Image src={clothesImage} alt="clothes" priority />
```

## 6.6 ~ 6.7 제품 상세 페이지

- products.json 데이터의 image를 추가하고 각 이미지 파일명 값을 지정해준다
- 데이터 타입이 변경되었으므로 타입을 변경해준다

## 6.8 폰트

- 공식 문서
  - https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- 폰트 적용 과정

  - 폰트 파일 다운로드 전 까지는 브라우저가 기본 폰트를 사용한다
  - 폰트 파일 다운로드가 완료되면 브라우저가 폰트를 적용한다
  - 폰트가 새롭게 적용될 때 UI가 깨지는 현상이 발생할 수 있다

- next/font는 자동적으로 폰트를 최적화한다

  - 서버에서 자체적으로 폰트 호스팅
  - layout shift가 발생하지 않도록 함
    - 내부적으로 CSS size-adjust를 사용해서 해결

- variable fonts

  - 한 가지 파일만으로도 다양의 버전의 폰트를 가지고 있는 것
  - https://fonts.google.com/variablefonts

- 원하는 폰트는 최상위의 layout에서 사용하는 것이 좋다

## 6.9 Redirect

- 특정 페이지로 보내주는 것
- next.config.js에서 설정할 수 있다
- 초기 버전에서 설정했던 경로를 페이지 개편으로 인해 변경되었을 때 사용할 수 있다

## 6.10 Rewrite

- 내부적으로 복잡하고
- 이상한 아이디
- 보안상에 민감함 키가 포함된 것이 URL이 있다면
- 이런 경우 일일이 타이핑하기 귀찮으므로 다른 것으로 대체하는 것
- URL은 변경되지 않고 내부적으로만 변경된다

## 6.11 redirect를 동적으로 수행

- 지금까진 next.config 파일에 설정을 했다
  - 고정된(정적인) 데이터를 저장
- 무언가 동적으로 수행하고 싶다면?
  - 로그인된 사용자를 특정 페이지로 보내거나 하는 경우

## 6.12 미들웨어

- 공식 문서
  - https://nextjs.org/docs/app/building-your-application/routing/middleware
- app/api/[:path]/route.ts 에서 각 메소드(GET, POST, PUT, DELETE)에 대한 미들웨어를 적용할 수 있다
- 그런데 만약 공통적으로 로그인 같은 것을 검사하고 싶다면 어떻게 해야할까?
- 미들웨어 : 문지기 같은 역할
- `미들웨어`는 `src 폴더에` 만들거나 만약 src 폴더를 사용하지 않는다면 프로젝트 최상위 폴더에 만들어야 한다
- 제품 소개 같은 Link 태그에 마우스를 올리면
  - Next.js는 미리 fetching을 해줘서 미들웨어가 해당 시점에 동작되는 것으로 보이는 것

```ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("미들웨어 테스트");
  if (request.nextUrl.pathname.startsWith("/products/1004")) {
    console.log("경로 리다이렉팅");
    return NextResponse.redirect(new URL("/products", request.url)); // redirect('경로', 'base url')
  }
}

// 미들웨어가 특정 경로에서만 실행되도록 설정
export const config = {
  matcher: ["/products/:path+"],
};
```

강의에서 설명을 잘못해 드린게 있어서 정정합니다.

정규표현식에서 \*과 +는 다른 의미예요

\*: zero or more

+: one or more

그러니깐,

/products/:path\* path가 있거나(많거나) 없거나 둘 다 가능

/products/:path+ path가 하나 또는 많거나

고로, /produts/slug 다이나믹 경로에 해당하는 곳에서만 미들웨어 실행을 원할경우 아래와 같이 작성해 주셔야 해요

/products/:path+

## 6.13 마무리

- 공식사이트를 보면서 변경된 사항은 없는지 확인하는 습관을 가지자
- 처음부터 너무 꼼꼼하게 보기보단 필요할 때 찾아봐도 된다

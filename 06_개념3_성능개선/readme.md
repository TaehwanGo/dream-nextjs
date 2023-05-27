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

- public/images에 이미지를 넣어서 테스트를 해보자
- local에 있는 이미지를 Next에서 보여줄 때 어떻게 처리되는지 알아보자
  - 자동 최적화
- 인터넷 상에 있는 이미지는 어떻게 할까?
  - width, height을 지정해야 한다
  - next.config.js에서도 등록을 해줘야 한다
- Image 컴포넌트의 장점

  - 이미지 사이즈 최적화
  - 사이즈가 정해져있고 그 영역을 차지하고 있기 때문에 layout shift가 발생하지 않는다

- 한 페이지에서 이미지가 많은 경우 우선순위를 정할 수 있다

```tsx
<Image src={clothesImage} alt="clothes" priority />
```

## 6.6 ~ 6.7 제품 상세 페이지

- products.json 데이터의 image를 추가하고 각 이미지 파일명 값을 지정해준다
- 데이터 타입이 변경되었으므로 타입을 변경해준다

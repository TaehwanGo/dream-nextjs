# 5. 렌더링

## 5.1 챕터 소개

- Server Component
- Client Component
- Fetch
- Rendering
  - SSG
  - ISR
  - SSR
  - CSR
- v12
- API Routes

## 5.2 최신 버전의 큰 차이점

- v12 vs. v13

### v12

- 페이지 단위로 렌더링
- getStaticProps()
- getServerSideProps()

### v13

- 컴포넌트 단위로 렌더링 방식을 규정
- Server Component : 서버상에서만 동작하는 컴포넌트
- Client Component
- 한 페이지 내 어떤 부분은 서버 컴포넌트, 어떤 부분은 클라이언트 컴포넌트로 구성 가능

## 5.3 서버 컴포넌트

- app 폴더 내 모든 컴포넌트는 기본적으로 서버 컴포넌트이다
- 서버컴포넌트는 console.log를 사용하면 서버 콘솔에 출력된다
- 서버 컴포넌트는 서버에서 실행이 된다
- prerendring된 HTML이 전송된다
- 서버 컴포넌트가 할 수 있는 것들
  - file system에 접근 가능
  - database 입출력 가능
  - node에서 할 수 있는 것들은 가능하다
- 서버 컴포넌트가 할 수 없는 것들

  - 상태 관련된 것들은 할 수 없다

- 서버 컴포넌트 : 서버에서 빌드될 때 실행되는 컴포넌트

## 5.4 클라이언트 컴포넌트

- 정말 필요한 부분만 클라이언트 컴포넌트로 만들어서 사용하자

## 5.5 동작 원리 분석

```bash
npm run build
npm run start
```

- 빌드 후 실행 시켜보자
  - 클라이언트 컴포넌트에서 찍은 console.log도 서버 콘솔에 찍힌다 -> 정적 페이지로 전달하기 위해서 실행 됨
- 네트워크 탭에서 최초 다운로드하는 html을 확인해보면 클라이언트 컴포넌트도 html에 포함되어 넘어오는 것을 확인할 수 있다

- 빌드 시 클라이언트 컴포넌트도 빌드되어서 전달된다
- 클라이언트 컴포넌트는 최초 전달 시 정적인 html로 전달이되고 해당 html은 클릭이벤트 같은 것이 동작하지 않음
- 이후 클라이언트 컴포넌트는 하이드레이션이 되면서 클릭이벤트 등을 처리할 수 있게 된다

## 5.6 공식 사이트 읽기

- https://nextjs.org/docs/getting-started/react-essentials
- 12버전까진 페이지 단위로 서버 or 클라이언트로 구분이 되었지만
- 13버전 부터는 컴포넌트 단위로 서버 or 클라이언트로 구분이 된다
  - interleave Server and Client Components
- 서버컴포넌트는 최종 빌드된 js 크기도 줄여준다
- 서버컴포넌트를 사용하면 apiKey 같은 것이 노출되지 않는다

## 5.7 리팩토링(설계)

- 동적인 데이터를 이용해서 구현해보자
- service라는 폴더를 만들고
  - 그 안에 products.ts를 만들어서 products 와 관련된 데이터를 다루는 함수를 만든다
  - 만들어진 함수를 각 서버 컴포넌트에서 사용한다

## 5.8 SSG 렌더링

- Node에서 파일을 읽어오고 Typescript를 이용
- Next.js의 서버컴포넌트는 비동기로도 구현 가능하다
  - 컴포넌트가 async 함수가 될 수 있다

## 5.9 ISR 렌더링

- 서버 -> 데이터 읽음 -> SSG
  - SSG : 페이지 미리 생성
- 서버 컴포넌트는 기본적으로 SSG

- ISR로 동작하기 위해서 컴포넌트 맨위에 `revalidate`를 지정해주면 된다

```ts
export const revalidate = 3; // 3초마다 재생성
```

- npm run dev로 실행하면 항상 SSR로 동작하기 때문에
- ISR을 확인하려면 빌드 후 실행해야한다
  - npm run build
  - npm run start

## 5.10 fetch를 사용한 SSG, ISR, SSR

- 서버 컴포넌트에서도 fetch를 사용할 수 있다(node-fetch가 내장된건가? -> 아님 NextFetch라는 Nextjs에서 제공하는 fetch)

```tsx
import { getProducts } from "@/service/products";
import Link from "next/link";
import styles from "./page.module.css";

// export const revalidate = 3;

export default async function ProductsPage() {
  // 서버 파일(데이터베이스)에 있는 제품의 리스트를 읽어와서, 그것을 보여줌
  const products = await getProducts();

  const res = await fetch("https://meowfacts.herokuapp.com", {
    next: {
      revalidate: 0, // 3 -> ISR, 0 -> SSR
    },
    cache: "no-store", // make it always fetch like SSR
  });
  const data = await res.json();
  const factText = data.data[0];

  return (
    <>
      <h3>Products Page</h3>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <article className={styles.article}>{factText}</article>
    </>
  );
}
```

## 5.11 fetch를 사용한 CSR

- SSG로 만들면 고양이에 대한 재밌는 사실이 고정되기 때문에 흥미가 떨어질 수 있다
- 그러자니 SSR로 만들자니 서버에 부하가 감
- 페이지에 있긴 하지만 천천히 렌더링 돼도 되는 경우 CSR로 만들어도 된다

```tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./MeowArticle.module.css";

export default function MeowArticle() {
  const [text, setText] = useState("데이터 준비중...");

  useEffect(() => {
    fetch("https://meowfacts.herokuapp.com", {
      next: {
        revalidate: 0, // 3 -> ISR, 0 -> SSR
      },
      cache: "no-store", // make it always fetch like SSR
    })
      .then((res) => res.json())
      .then((data) => setText(data.data[0]));
  }, []);

  return <article className={styles.article}>{text}</article>;
}
```

- client 컴포넌트이더라도 초기 값이 있다면 초기값으로 SSG가 된다

## 5.12 공식 사이트 읽기

- 여러 컴포넌트에서 중복으로 요청(fetch)을 해도 자동으로 중복제거를 해준다
  - POST 같은 요청은 중복제거를 하지 않음
- CSR을 사용할 땐 ReactQuery를 써도 된다
- validation을 위해 header와 cookie를 사용할 때 제공되는 메서드가 있다
  - https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#validation

## 5.13 버전12로 구현한 것 살펴보기

- 기본적으로 웬만한 코드들은 Client side에서 실행되고
- 컴포넌트 맨 아래 getStaticProps 같은 함수들만 서버에서 실행된다
- getServerSideProps
  - 서버에서 실행되는 함수
  - revalidate도 지정할 수 있다

## 5.14 API 라우트란 무엇인가?

- 우리는 지금 웹앱을 만들고 있다
- Next.js에선 풀스택 커버가 가능하다
- api 라우트에 함수를 등록해놓으면 서버처럼 동작한다
  - 해당 api를 다른 클라이언트에게 api형태로 제공하고 싶다면 api 라우트를 사용하면 된다

```ts
// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.status(200).json({ name: "John Doe" });
}
```

- api/hello로 요청을 보내면 json 형태로 응답을 받을 수 있다
- 반드시 export default로 함수를 만들어야 한다

## 5.15 커뮤니티에 기여하기

- app 경로에 route를 만들고 POST와 GET을 나눠서 처리할 수 있다
  - 기존 pages 경로에 있는 api 문제점
    - req.method가 GET인지 POST인지 확인을 다 했어야 함

## 5.16 예전 방식의 API 라우트

- service에서 만들었던 함수를 재사용하자
- pages 디렉토리에서 api 함수들은 method를 if문으로 구분해야 한다

## 5.17 최신 방식의 라우트 핸들러

```ts
import { getProducts } from "@/service/products";
import { NextResponse } from "next/server";

// app/api 에선 method 별로 나눠서 작성할 수 있다
// 단점은 리턴 타입을 지정할 수 없다는 것이다(generic이 아님)
export async function GET(request: Request, response: Response) {
  const products = await getProducts();
  return NextResponse.json(products);
}
```

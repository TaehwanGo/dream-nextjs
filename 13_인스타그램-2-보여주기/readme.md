# 13. 인스타그램 만들기 - 파트 2. 보여주기

## 13.1 챕터 소개

- 전반적인 UI 및 기능 구현

## 13.2 ~ 3 사이드바 구현하기

- pages
  - HomePage
- components

  - FollowingBar
  - PostList
  - SideBar

- 웹앱에서 사용하는 도메인 스키마 타입들을 모델로 정의
  - src/models
    - Post.ts
    - User.ts

## 13.5 팔로잉바 구현하기 - 소개

- 팔로잉 표시
- 클릭시 유저 페이지로 이동

## 13.6 팔로잉바 - SWR 적용

- FollowingBar, PostList는 어떻게 렌더링 할 것인가?

  - SSR or CSR

- NavBar와 SideBar는 정적인 컴포넌트로 구현 -> 사용자에게 먼저 보여줌

### FollowingBar 구현 전략

1. 클라이언트 컴포넌트에서 백엔드에게 api/me 요청 -> 사용자의 정보를 얻어온다
2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서 사용자의 상세 정보를 Sanity에서 가져옴 (followings)
3. 클라이언트 컴포넌트(FollowingBar)에서 followings의 정보를 UI에 보여줌

### SWR 적용

- https://swr.vercel.app/ko/docs/getting-started

```tsx
// fetcher와 함께 사용해야 한다(react-query와 비슷)
// fetcher
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// ---------------------------------------------

import useSWR from "swr";

function Profile() {
  // swr 사용 예
  const { data, error, isLoading } = useSWR("/api/user/123", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // 데이터 렌더링
  return <div>hello {data.name}!</div>;
}
```

## 13.7 팔로잉바 - 서비스 구현

## 13.8 팔로잉바 - GROQ 쿼리

- Sanity에서 사용하는 Query 언어
  - https://www.sanity.io/docs/groq
- Graph-Relational Object Queries
  - 숨겨진 아이디어 : 어플리케이션에서 필요한 정보를 정확하게 묘사한다
  - 여러가지 데이터셋을 조인해서 쓸 수도 있다
- 내가 어떤 필드를 받고 싶은지도 명시 할 수 있다

```ts
// src/service/sanity.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache - 동적인 데이터가 들어있으므로 false
  apiVersion: "2023-06-25", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client - 데이터를 업데이트 하므로 토큰이 필요
});

// src/service/user.ts
import groq from "groq";
import { client } from "./sanity";

export async function getUserByUsername(username: string) {
  return client.fetch(
    groq`*[_type == "user" && username == "${username}"][0]{
      ...,
      "_id": _id,
      following[]->{username, image},
      followers[]->{username, image},
      "bookmarks": bookmarks[]->_id
    }`
  );
}
```

- groq라이브러리는 별다른 기능은 없지만 에디터에서 해당 템플릿 리터럴은 groq 쿼리라고 인식하게 해준다

- sanity studio 실행 후 vision탭에서 groq 쿼리를 테스트 해볼 수 있다

## 13.9 팔로잉바 - 컴포넌트

## 13.10 팔로잉바 - 스타일링

## 13.11 팔로잉바 - 라이브러리

- 팔로잉바에 multi carousel 라이브러리 적용
  - https://www.npmjs.com/package/react-multi-carousel

## 13.12 포스트 리스트 - 소개

- 포스트 리스트 만들기
- GROQ의 Joins 사용
  - 사용자와 사용자가 following하는 정보를 갖고 author와 매칭되는 정보를 가져와야 함
- 포스트의 이미지는 `@sanity/image-url` 사용
- 상대적인 시간 `timeAgo` 라이브러리 사용
  - https://www.npmjs.com/package/timeago-react

## 13.13 포스트 목록 - 서비스

```ts
// Books by author.name (book.author is a reference)
*[_type == "book" && author._ref in *[_type=="author" && name=="John Doe"]._id ]{...}
```

- book이라는 스키마에 있는 author의 reference가 type이 "author"라는 스키마와 조인해서 가져온다

  - 이름ㅇ이 John Doe인 저자의 책들을 가져온다

- 타입이 book인 스키마의 author는 <- 타입이 author인 스키마에서 이름이 John Doe인 것의 id를 가져온다

## 13.14 포스트 목록 - 이미지 URL

- 이미지를 단순히 asset->url로 가져오면 이미지의 크기를 조절할 수 없다(원본 이미지)
- 이미지의 크기를 조절하려면 `@sanity/image-url` 라이브러리를 사용해야 한다
  - https://www.npmjs.com/package/@sanity/image-url

## 13.15 포스트 목록 - 컴포넌트

- timeago 라이브러리 사용 : 상대적 날짜 표시
- npm i timeago.js

## 13.16 포스트 목록 - 스타일링

## 13.17 포스트 목록 - 리팩토링

### dynamic import

```
Warning: Prop `style` did not match. Server: "display:inline-block;background-color:red;width:15px;height:15px;margin:2px;border-radius:100%;animation-fill-mode:both;animation:react-spinners-GridLoader-grid 1.0491292850450247s 0.24912928504502457s infinite ease" Client: "display:inline-block;background-color:red;width:15px;height:15px;margin:2px;border-radius:100%;animation-fill-mode:both;animation:react-spinners-GridLoader-grid 0.8766746920757024s 0.07667469207570238s infinite ease"
```

- 로딩 스피너 두 개
- 서버에서 만들어진 것과 클라이언트에서 하이드레이션 했을 때 달라지는 경우
- lazyLoading, dynamic import
  - GridSpinner.tsx

```tsx
import dynamic from "next/dynamic";

const GridLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.GridLoader),
  {
    ssr: false,
  }
);

interface Props {
  color?: string;
}
export default function GridSpinner({ color = "red" }: Props) {
  return <GridLoader color={color} />;
}
```

### image priority

```
Image with src "https://cdn.sanity.io/images/bgt40mwm/production/d9c7ee93a54d548f138d4cfb03a5ccb45ccd0343-1000x750.jpg?w=800" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.
Read more: https://nextjs.org/docs/api-reference/next/image#priority
```

```tsx
// 컴포넌트
<Image
  className="object-cover w-full aspect-square"
  src={image}
  alt={`photo by ${username}`}
  width={500}
  height={500}
  priority={priority}
/>

// 컴포넌트 사용
<PostListCard post={post} priority={index < 2} />
```

- 이미지가 많은 경우 priority를 줘서 위에 있는 이미지를 먼저 로딩하게 할 수 있다

## 13.18 상세다이얼로그 구현하기 - 소개

- 다이얼로그(모달) 구현
  - 이미지 보여주기
  - 코멘츠 보여주기

## 13.19 상세다일로그 - Portal 사용

- https://legacy.reactjs.org/docs/portals.html
- https://react.dev/reference/react-dom/createPortal

- 사용하고자 하는 곳에서 createPortal을 통해서 연결하고자 하는 dom 요소에 연결

## 13.20 상세다일로그 - 서비스

## 13.21 상세다일로그 - 컴포넌트

## 13.22 앱전체 레이아웃 스타일링

## 13.23 사용자 검색 구현하기 소개 + 중간 정리

### 중간 점검

- Part2의 중점

  - Content Lake <-> Server(Backend: Next.js - 서버에서 실행) <-> Client(Next.js - browser에서 실행)

- flow
  - server side rendering(웹사이트 접속 -> Next.js -> Client)
  - client component에서 데이터 요청(Client -> Next.js api)
  - Next.js의 api에서 요청을 받아서 Content Lake에 요청(Next.js api -> Content Lake)
  - Content Lake에서 데이터를 받아서 Next.js의 api로 전달(Content Lake -> Next.js api)
  - Next.js의 api에서 데이터를 받아서 client component로 전달(Next.js api -> Client)

### 사용자 검색 구현하기 - 소개

- 아무것도 입력하지 않았을 때는 모든 사용자를 보여준다
- 사용자를 검색하면 검색어에 맞는 사용자를 보여준다(debounce 적용해서 자동으로 검색 - 검색버튼 필요 없음)
- 보여지는 사용자를 클릭하면 해당 유저 페이지로 이동한다

## 13.24 사용자 검색 - 서비스

- 검색해서 보여주므로 클라이언트 컴포넌트가 되어야 하고 해당 컴포넌트는 페이지가 아닌 별도의 클라이언트 컴포넌트로 만든다

## 13.25 사용자 검색 - 컴포넌트

- 서비스에서 가져온 데이터로 UI 작업

## 13.26 사용자 검색 - 카드

## 13.27 ~ 28 사용자 검색 - 디바운스

### 이슈

- 예를 들어, anna라고 검색 시 한글자 마다 요청이 계속 들어감
- https://github.com/vercel/swr/issues/110
- https://redd.one/blog/debounce-vs-throttle

## 13.29 사용자 프로필 구현 - 소개

- 사용자 페이지는 로그인을 하지 않아도 볼 수 있음
- 단, 로그인을 하지 않으면 포스트 상세 페이지 클릭 시 로그인 하라는 페이지로 이동

## 13.30 사용자 프로필 - 서비스

## 13.31 사용자 프로필 - 컴포넌트

## 13.32 사용자 프로필 - 스타일링

## 13.33 사용자 포스트 - 서비스

## 13.34 사용자 포스트 - 컴포넌트

## 13.35 사용자 포스트 - 스타일링

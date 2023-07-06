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

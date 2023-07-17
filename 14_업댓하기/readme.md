# 14. 업데이트

## 14.1 챕터소개

- SWR을 중점적으로 mutation을 다뤄볼 에정
- 사용자 인터랙션
  - 좋아요 기능
  - 북마크
  - 코멘트
  - 클릭해서 상세 페이지

## 14.2 SWR 이해하기

- https://swr.vercel.app/ko/docs/advanced/understanding
- data는 undefined -> loading -> data
- 기존 데이터가 존재하면 stale(오래된 데이터)를 보여주고 새로운 데이터를 가져온다.(while revalidating)

## 14.3 좋아요 토글하기 - 소개

- SWR 을 이용 시 아래를 중점적으로 살펴보기
  - mutation
  - revalidation

## 14.4 좋아요 - 토글 버튼

- 컴포넌트에서 state를 만들고 filled 버전과 unfilled 버전을 보여준다

## 14.5 좋아요 - 라우트 핸들러

- 업데이트 요청 : PUT

  - `/api/likes`

- 서버에서 next-auth는 사용시 아래와 같이 세션부터 가져온다

```ts
const session = getSeverSession(authOption);
```

## 14.6 좋아요 - 업데이트

- swr에서 캐시키는 api route의 url을 사용한다

- mutate를 통해 캐시를 업데이트한다

```ts
const { mutate } = useSWRConfig();
const handleLike = (like: boolean) => {
  fetch("api/likes", {
    method: "PUT",
    body: JSON.stringify({
      id,
      like,
    }),
  }).then(() => {
    mutate(`api/posts`);
  });
};
```

## 14.7 좋아요 - 커스텀 훅

- 현재 문제점
  - 좋아요 클릭 후 업데이트 되는 시점이 너무 느림(서버의 응답을 기다린 후에 되므로)

```ts
// before
const { mutate } = useSWRConfig();
const handleLike = (like: boolean) => {
  fetch("api/likes", {
    method: "PUT",
    body: JSON.stringify({
      id,
      like,
    }),
  }).then(() => {
    mutate(`api/posts`);
  });
};
```

```ts
// after: ActionBar.tsx
const { setLike } = usePosts();

// 커스텀 훅
import { SimplePost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";

export default function usePosts() {
  const { mutate } = useSWRConfig();
  const { data: posts, isLoading, error } = useSWR("api/posts");
  const setLike = (post: SimplePost, username: string, like: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({
        id: post.id,
        like,
      }),
    }).then(() => {
      mutate("api/posts");
    });
  };

  return {
    posts,
    isLoading,
    error,
    setLike,
  };
}
```

- 아직 속도 개선은 이루어지지 않음
- 코드에서 hook으로 분리하고, 컴포넌트에서는 hook을 사용하는 방식으로 변경

## 14.8 좋아요 - Revalidate

- Bound Mutate
  - https://swr.vercel.app/ko/docs/mutation
  - Bound mutate는 현재 키를 기반으로 데이터로 변경하는 빠른 방법입니다. useSWR 함수에 전달된 키와 연결된 키는 캐시에서 데이터를 찾을 때 사용되며, 이렇게 찾은 데이터는 첫 번째 인자로 반환됩니다.
  - 우리 캐시키와 직접적으로 연결된 mutate를 가져올 수 있음
- 옵션으로 optimisticData를 설정할 수 있다
  - UI상에서 업데이트를 먼저해주고 백그라운드로 데이터를 받아온다

```ts
// after: ActionBar.tsx
const { setLike } = usePosts();

// 커스텀 훅
import { SimplePost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";

async function updateLike(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({
      id: post.id,
      like,
    }),
  }).then((res) => res.json()); // global fetch가 아니므로 json으로 변환해줘야함
}

export default function usePosts() {
  const { data: posts, isLoading, error, mutate } = useSWR("api/posts");
  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));
    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return {
    posts,
    isLoading,
    error,
    setLike,
  };
}
```

## 14.9 북마크 토글하기 - 소개

## 14.12 코멘트 추가 - 소개

## 14.16 코멘트 - 리팩토링

- PostListCard.tsx와 PostDetail.tsx에서 중복되는 코드를 최소화
  - CommentForm을 ActionBar로 이동

## 14.17 코멘트 - 성능개선

- useFullPost에서 globalMutate를 사용
  - 자체적인 mutate이후 globalMutate를 호출

### 성능 개선

- useMe에서 전달하는 것들을 prop으로 전달 -> 다른 것들 모두 rerendering
  - 함수들에 useCallback을 사용

## 14.18 팔로우 버튼 - 소개

## 14.19 팔로우 버튼 - 서버

### 팔로우-팔로잉 구현 개념

- Following과 Followers가 각각 존재
- B가 A를 팔로우(A <- B)
  - B사용자의 Following에 A를 추가
  - A사용자의 Followers에 B를 추가
- B가 A를 언팔로우(A <- B)

  - B사용자의 Following에서 A를 제거
  - A사용자의 Followers에서 B를 제거

### 여러 사용자 동시 업데이트

- 기존에 한 사용자를 업데이트 : path
- 여러 사용자를 업데이트 : Multiple mutations in a transaction
  - https://www.sanity.io/docs/js-client#multiple-mutations-in-a-transaction

```ts
// src/service/user.ts
export async function follow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetId, _type: "reference" }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("following", [{ _ref: myId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}
```

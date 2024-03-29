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
- 기존 데이터가 존재하면 `stale`(오래된 데이터)를 보여주고 새로운 데이터를 가져온다.(`while` `revalidating`)

- Key Change + Previous Data
  - 키를 따로 지정하지 않으면 url을 키로 사용한다

## 14.3 좋아요 토글하기 - 소개

- SWR 을 이용 시 아래를 중점적으로 살펴보기
  - mutation
  - revalidation
- Sanity에서 데이터 업데이트 : patch
  - https://www.sanity.io/docs/js-client#patch-a-document-only-if-revision-matches
- 참고
  - https://www.sanity.io/docs/js-client
  - https://next-auth.js.org/configuration/callbacks
  - https://swr.vercel.app/docs/mutation

## 14.4 좋아요 - 토글 버튼

- 컴포넌트에서 state를 만들고 filled 버전과 unfilled 버전을 보여준다

## 14.5 좋아요 - 라우트 핸들러

- 이번 강의 목표

  - 라우트 핸들러
  - Sanity 정의

- Post scheme(sanity-studio/schemas/post.js)를 보면 필드 중 Likes(좋아요)에 Author에 user가 배열로 포함되어 있다

  - 좋아요를 누를때 해당 포스트의 좋아요에 유저배열에서 현재 유저를 추가해준다

```ts
// api/likes/route.ts
// 참고
client
  .patch("bike-123")
  // Ensure that the `reviews` arrays exists before attempting to add items to it
  .setIfMissing({ reviews: [] })
  // Add the items after the last item in the array (append)
  .insert("after", "reviews[-1]", [{ title: "Great bike!", stars: 5 }])
  .commit({
    // Adds a `_key` attribute to array items, unique within the array, to
    // ensure it can be addressed uniquely in a real-time collaboration context
    autoGenerateArrayKeys: true,
  });
```

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
  - Bound(연결된) mutate는 현재 키를 기반으로 데이터로 변경하는 빠른 방법입니다. useSWR 함수에 전달된 키와 연결된 키는 캐시에서 데이터를 찾을 때 사용되며, 이렇게 찾은 데이터는 첫 번째 인자로 반환됩니다.
  - 우리 캐시키와 직접적으로 연결된 mutate를 가져올 수 있음
- 옵션으로 optimisticData를 설정할 수 있다
  - UI상에서 업데이트를 먼저해주고 백그라운드로 데이터를 받아온다

### 개선

- 기존
  - 좋아요 클릭 -> 서버 응답 -> 캐시 업데이트 -> UI 업데이트
- 변경
  - 좋아요 클릭 -> 캐시 업데이트 -> UI 업데이트 -> 서버 응답

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

## 14.9 ~ 11 북마크 토글하기

```ts
// user schema
import { Rule } from "sanity";

export default {
  title: "User",
  name: "user",
  type: "document",
  fields: [
    // ...
    {
      title: "Bookmarks",
      name: "bookmarks",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
    },
  ],
  // ...
};
```

## 14.12 ~ 15 코멘트 추가

- 좋아요, 북마크와 같이 모발과 메인 페이지 동시 업데이트
- 코멘트 입력창에 한글자 이상 입력해야 Post 버튼 활성화

### 구현 단계

- 1. 서비스 구현
- 2. 라우터 구현
- 3. UI 확인

### 스키마 확인

- likes는 사용자id를 가지고 있는 배열
- comments는 배열이지만 Comment라는 객체를 가지고 있음
  - Comment 객체: { 사용자 id, comment 내용}

```ts
export default {
  title: "Post",
  name: "post",
  type: "document",
  fields: [
    // ...
    {
      title: "Comments",
      name: "comments",
      type: "array",
      of: [
        {
          title: "Comment",
          name: "comment",
          type: "document",
          fields: [
            {
              title: "Author",
              name: "author",
              type: "reference",
              to: [{ type: "user" }],
            },
            {
              title: "Comment",
              name: "comment",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
  // ...
};
```

### 14.15 코멘트 - 상세 화면

#### 프로세스

- 메인에서 코멘트를 포함한 post 데이터엔 comment가 숫자로만 존재
  - `api/posts`
- 상세 페이지(PostDetail)를 클릭하면 다시 해당 포스트의 post 데이터를 가져오고 그 때 comment 상세 데이터까지 포함된 데이터를 받음
  - `api/posts/[id]`

## 14.16 코멘트 - 리팩토링

- PostListCard.tsx와 PostDetail.tsx에서 중복되는 코드를 최소화
  - CommentForm을 ActionBar로 이동

### CommentForm을 ActionBar로 이동

## 14.17 코멘트 - 성능개선

- useFullPost에서 globalMutate를 사용
  - 자체적인 mutate이후 globalMutate를 호출

### 성능 개선

- useMe에서 전달하는 것들을 prop으로 전달 -> 다른 것들 모두 rerendering
  - 함수들에 useCallback을 사용
- PostDetail 페이지에서 등록한 댓글이 PostCardList에 바로 반영되지 않음
  - 호출하는 api가 다르기 때문
    - bound된 mutate로 해결할 수 없는 문제
  - globalMutate를 사용하여 해결

```ts
import { Comment, SimplePost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";

async function updateLike(id: string, like: boolean) {
  return fetch("api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch("api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePost() {
  // posts 가져오기
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");
  const { mutate: globalMutate } = useSWRConfig();

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((v) => v !== username),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false, // 서버에 요청을 보내지 않음
      rollbackOnError: true,
    });
  };

  const postComment = (post: SimplePost, comment: Comment) => {
    const newPost = {
      ...post,
      comments: post.comments + 1,
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false, // 서버에 요청을 보내지 않음
      rollbackOnError: true,
      // globalMutate는 즉각적으로 업데이트 되진 않음
    }).then(() => globalMutate("/api/posts"));
  };

  return {
    posts,
    isLoading,
    error,
    setLike,
    postComment,
  };
}
```

## 14.18 ~ 20 팔로우 버튼

### 팔로우-팔로잉 구현 개념

- Following과 Followers가 각각 존재
- B가 A를 팔로우(A <- B)
  - B사용자의 Following에 A를 추가
  - A사용자의 Followers에 B를 추가
- B가 A를 언팔로우(A <- B)

  - B사용자의 Following에서 A를 제거
  - A사용자의 Followers에서 B를 제거

### 여러 사용자 동시 업데이트

- 기존에 한 사용자를 업데이트 : client.patch
- 여러 사용자를 업데이트 : Multiple mutations in a `transaction`
  - https://www.sanity.io/docs/js-client#multiple-mutations-in-a-transaction

```ts
// src/service/user.ts
export async function follow(myId: string, targetId: string) {
  return client
    .transaction() // transaction()을 사용하면 여러개의 patch를 한번에 보낼 수 있다
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

### UI 구현

- bookmark 구현 시엔 optimisticData를 전달했지만

  - follow에서 해주지 않은 이유
    - 현재 사용자 뿐만 아니라 타겟 아이디의 사용자도 업데이트 해줘야 하기 때문

- 사용자 페이지에서 follow 버튼을 클릭하는 경우
  - 이슈
    - follow <-> unfollow는 되지만
    - ssr로 렌더링된 followers가 몇 명인지 표시하는 부분은 업데이트가 되지 않음
  - 해결
    - 1. SSR -> CSR
    - 2. Next.js 13의 새로운 기능
  - 다음 영상에서 알아보자(14.21)

## 14.21 최신 기능 그리고 공부 팁

### Mutating Data

- 준비중인 새로운 기능

  - RFC: Request For Comment
    - 코멘트(피드백)을 받기 위한 요청

- 그 전까지 권장하는 방식
  - 데이터 변경 후 `router.refresh()`
  - 필요한 부분만 업데이트
- useTransition과 함께 사용하면 의미있는 로딩 스피너를 보여줄 수 있다
- 만약 오픈소스를 사용 중 문제가 있다면 이슈를 남겨서 기여해보자

## 14.22 최신 기능 - SSR 페이지 업데이트

````ts
const router = useRouter();
const [isPending, startTransition] = useTransition();
const [isFetching, setIsFetching] = useState(false);
const isUpdating = isPending || isFetching;

const handleFollow = async () => {
  setIsFetching(true);
  await toggleFollow(user.id, !following);
  setIsFetching(false);
  startTransition(() => {
    router.refresh();
  });
};```
````

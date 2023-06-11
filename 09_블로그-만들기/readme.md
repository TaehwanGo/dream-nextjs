# 9. 블로그 만들기

## 9.1 챕터 소개

## 9.2 프로젝트 셋업

```bash
npx create-next-app@latest
```

- 선택한 옵션들

  - app name: blog
  - use typescript: yes
  - use eslint: yes
  - use tailwindcss: yes
  - use src directory: yes
  - use custom alias: no

- tailwindcss 설치를 수동으로도 할 수 있다
  - 공식 문서 참고
    - https://nextjs.org/docs/app/building-your-application/styling/tailwind-css

## 9.3 ~ 9.4 페이지 레이아웃 만들기

- header
- body
- footer

## 9.5 페이지 레이아웃 만들기 - 스타일링

- 우리가 원하는 것

  - header
    - 상위에 고정
  - footer
    - 하위에 고정
  - main
    - 가득 채우도록 설정

- extensions
  - tailwindcss intellisense
  - headwind
  - tailwind css highlight

## 9.6 ~ 9.7 프로필 만들기

- Hero : 웹 페이지를 상징하는 페이지

## 9.8 ~ 9.9 피쳐된 포스트 보여주기 - 코드 구조

- service 폴더안에 비즈니스 로직을 구현해서 컴포넌트에서 코드를 분리
- 컴포넌트가 데이터를 가져오는 과정
  - service에서 파일을 읽고 반환하는 함수를 분리해서 구현

## 9.10 피쳐된 포스트 보여주기 - 카드

- 파일에서 읽은 posts 중 featured가 true인 것만 가져온다
- time tag
  - https://miaow-miaow.tistory.com/51
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time

## 9.11 피쳐된 포스트 보여주기 - 스타일링

- 엘리의 구현 순서

  - 메인 로직
  - 컴포넌트 골격
  - 스타일링

- Promise를 리턴하는 컴포넌트에서 발생하는 에러를 처리하는 방법
  - 아직 타입스크립트팀에서 업데이트를 하지 않아서 발생하는 문제이다
  - 아래와 같이 임시 무시하도록 처리하여 해결한다

```tsx
{
  /* @ts-expect-error Async Server Component */
}
```

## 9.12 ~ 9.13 캐러셀 포스트 보여주기

- 캐러셀 라이브러리

  - npm i react-multi-carousel

- 캐러셀 드래그 안되는 문제

  - Link(a 태그)에 draggable을 false로 설정
  - Image에 draggable을 false로 설정

- 캐러셀에서 드래그할 땐 페이지 이동을 하지 않고 클릭했을 때만 페이지 이동하게 하기

```tsx
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(0);
    <Link
      href={`/posts/${path}`}
      draggable="false"
      onClick={(e) => {
        // prevent link if user is dragging
        if (Math.abs(startPosition - endPosition) > 10) {
          e.preventDefault();
        }
      }}
      onMouseDown={(e) => {
        setStartPosition(e.clientX);
      }}
      onMouseMove={(e) => {
        setEndPosition(e.clientX);
      }}
    >
```

## 9.14 ~ 9.15 필터 가능한 포스트 페이지 - 구현

- 카테고리
  - 중복 제거
    - Set을 사용해서 제거

```ts
const categories = [...new Set(posts.map((post) => post.category))];
```

- 에러 발생
  - Type 'Set<string>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.ts(2802)
  - tsconfig.json의 target을 es2015로 변경

<!-- 여기서 부터 따라 치면서 다시 들어야 함 -->

## 9.16 필터 가능한 포스트 페이지 - 스타일링

- 선택된 포스트 카테고리에 스타일을 적용
  - post === selected && 'text-blue-500'

## 9.17 ~ 9.18 블로그 포스트 페이지

- 선택 -> 포스트 페이지로 이동

- 다이나믹 라우트
  - src/app/post/[slug]/page.tsx

1. 전달된 slug에 해당된 포스트를 가져와서
2. 마크다운 뷰어에 표시

- 제목은 h2로 표시
- markdown은 pre로 표시

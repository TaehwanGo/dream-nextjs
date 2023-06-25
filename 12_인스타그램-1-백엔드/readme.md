# 12. 인스타그램 만들기 - 1. 백엔드

## 12.1 챕터 소개

- 몸풀기
- Sanity 셋업

## 12.2 큰 그림 먼저 살펴보기

- Sanity 뿐만 아니라 클라우드형 데이터베이스의 유의 사항
- Sanity : 클라우드상에 존재하는 데이터 보관소
  - Content Lake
- Sanity Studio : Sanity를 관리하는 웹앱

  - 어드민 창, 데이터 준비
  - 데이터 모델 (스키마) 정의

- Sanity에서 제공해주는 API를 이용해서 데이터를 가져옴
  - Front end에서 직접 사용하는 것일까?
    - No. 좋지 않은 방법임
  - Next.js(server, backend)에서 직접 접근 후 Front-end에 전달

## 12.3 프로젝트 셋업

- 프로젝트 생성
  - tailwind 포함

## 12.4 Sanity 셋업

### 선택 사항

1. Sanity Studio를 프로젝트 안에 만들 것인지
2. 아니면 프로젝트와 별개의 폴더에 둘 것인지

중요한 것은 Sanity Studio는 Next.js 프로젝트의 일부가 아님

- 하나의 깃 레포로 관리하려면 Next.js 프로젝트 안에 만들어도 됨

### 설치

- (첫 질문)Would you like to add configuration files for a Sanity project in this Next.js folder?
  - n 선택

### sanity 관련 명령어

- sanity docs - to open the documentation in a browser
- sanity manage - to open the project settings in a browser
- sanity help - to explore the CLI manual

### sanity studio

- 하나의 독립된 프로젝트
- React로 만들어짐

#### 폴더

- schemas
  - 데이터 모델 정의

### 이슈

- `[vite] Internal server error: [postcss] Cannot read properties of undefined (reading 'config')`
  - tailwind.config.js 파일이 없어서 발생하는 문제
  - tailwind.config.js 파일을 복사해서 그래도 붙여넣어줌

### 실행

- sanity-studio가 설치된 폴더에서 `npm run dev`
  - content-lake(클라우드 데이터베이스)와 연결된 sanity studio가 실행됨

## 12.5 Sanity 공식사이트 읽기

### Create a schema

#### What is Sanity Studio?

- 자바스크립트 문법으로 데이터 모델을 정의할 수 있음
- Sanity Studio는 SPA로 만들어짐
  - React로 만들어짐
  - 따로 배포해서 관리도 가능
- 데이터는 클라우드에 저장되어있다(로컬이 아님)
- 스튜디오를 실행하는 것은 어드민(sanity-studio)를 위한 앱이 실행
  - sanity-studio에서 npm run dev

#### Defining your first document type

```js
// schemas/pet.js
export default {
  name: "pet", // 데이터 이름
  type: "document", // 타입 : 문서
  title: "Pet", // 스튜디오에 표시될 이름
  fields: [
    // 해당 데이터에 속한 필드
    {
      name: "name", // 필드 이름
      type: "string", // 필드 타입
      title: "Name", // 스튜디오에 표시될 이름
    },
  ],
};

// schemas/index.js
import pet from "./pet";

export const schemaTypes = [pet];
```

- 자동으로 Content Lake로 동기화

## 12.6 사용자 스키마 정의

## 12.7 포스트 스키마 정의

- image 타입은 어떻게 저장할까?

## 12.8 데이터 추가하기

- sanity studio에서 데이터 추가하기

## 12.9 멋진 프리뷰 만들기

- Sanity studio란?
  - 어드민용 웹 어플리케이션
- 어디에서 동작
  - 지금은 로컬에서 동작
  - 다른 곳에 배포하면 다른곳에서 동작하게 할 수 있음
- 데이터는 어디에 있나요?
  - Content lake라는 클라우드
- 웹 어플리케이션 이기 때문에 조작이 가능하다

### 프리뷰

- https://www.sanity.io/docs/previews-list-views

```js
export default {
  name: "movie",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Release Date",
      name: "releaseDate",
      type: "datetime",
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "releaseDate",
    },
    prepare(selection) {
      // selection : {title, date} <- select에서 정의한 것이 객체로 전달
      const { title, date } = selection;
      return {
        title: title,
        subtitle: date.split("-")[0], // YYYY-MM-DD --> YYYY
      };
    },
  },
};
```

## 12.10 골격, Navbar 만들기 - 소개

- sticky, 경로에 따른 버튼 활성화 색상 변경

## 12.11 골격, Navbar 만들기 - 구현

- icon도 재사용 가능한 컴포넌트로 추상화하자

## 12.12 골격, Navbar 만들기 - 스타일링

## 12.13 로그인 구현 - 소개

- 로그인 -> 구글 로그인 -> 로그인 성공 -> 텍스트 변경
- NextAuth.js 라이브러리 사용

### Add API route

- 12버전 => pages/api/auth
- 13버전에서의 api는 edge 환경에서 동작할 수 있게 만들어야 함
  - 우리 코드 뿐만 아니라 라이브러리들도 edge 환경에 적합하게 만들어야 함
- next-auth의 api는 13버전이 이제 지원됨
  - 사용 방법
    - https://next-auth.js.org/getting-started/example
    - https://next-auth.js.org/configuration/initialization#route-handlers-app

## 12.14 로그인 구현 - 백엔드

- 설치
  - npm install next-auth
- api route 추가

### google oauth 사용

- google cloud에서 credentials 생성

  - project 생성
  - 대시보드
    - API 카드의 "API 개요로 이동" 클릭
      - 왼쪽 Nav에 Oauth consent screen

#### Auth 동의 화면(Oauth consent screen)

- 외부
- 나중에 배포 후 domain 지정할 수 있음

#### 사용자 인증 정보(Credentials)

- 사용자 인증 정보 만들기 클릭

  - OAuth client Id 클릭

- 웹 어플리케이션
- 클라이언트 아이디, 클라이언트 보안 비밀 생성

#### TODO

- 클라이언트에서 세션 프로바이더 설정
  - useSession 등 사용 가능
- 13 버전에선 Provider 설정을 어디서 해야 하는지 알아보자
  - 12버전 : \_app.js에서 했었음

## 12.15 로그인 구현 - 프론트엔드

- 클라이언트 컴포넌트로 만들어야 함
  - 서버컴포넌트에선 접근 할 수 없음
- Provider는 app/layout.tsx에서 사용

### 400 오류: redirect_uri_mismatch

- 구글 클라우드 콘솔 -> api -> credentials(사용자 인증 정보) -> 내 앱 클릭(instagram-tony)
  - 승인된 자바스크립트 원본(Authorised Javascript origins)
    - 브라우저 요청에 사용(For use with requests from a browser)
      - http://localhost:3000
  - 승인된 리디렉션 URI(Authorised redirect URIs)
    - 웹 서버의 요청에 사용(For use with requests from a web server)
      - http://localhost:3000/api/auth/callback/google

### Warning

- 경고 메시지

  - [next-auth][warn][NEXTAUTH_URL]
    - https://next-auth.js.org/warnings#nextauth_url
  - [next-auth][warn][NO_SECRET]
    - https://next-auth.js.org/warnings#no_secret

- 해결
  - .env.local 파일에 NEXTAUTH_URL, NEXTAUTH_SECRET 추가
- https://www.strongpasswordgenerator.org/

## 12.16 로그인 페이지 구현 - 소개

- 로그인 후 원래 있던 페이지로 돌아가기
- 로그인 하면 프로필 사진이 보여지고
  - 해당 프로필 클릭 시 유저 개인 페이지로 이동
- 참고

  - https://next-auth.js.org/configuration/pages
  - https://next-auth.js.org/getting-started/client#specifying-a-callbackurl
  - https://next-auth.js.org/configuration/callbacks#session-callback

## 12.17 로그인 페이지 구현 - 페이지

- https://next-auth.js.org/configuration/pages

### 공식 문서의 version 12 코드

```tsx
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
```

### 공식 문서의 version 13 코드

- git history 참고

## 12.18 로그인 페이지 구현 - 아바타

- 로그인한 사용자 정보를 navbar에 표시해보자
- 세션 정보를 가져오는 방법
  - useSession
  - getSession

```tsx
// app/api/auth/[...nextauth]/route.ts
...
callbacks: {
  async jwt({ token, account }) {
    // Persist the OAuth access_token to the token right after signin
    if (account) {
      token.accessToken = account.access_token
    }
    return token
  },
  async session({ session, token, user }) {
    // Send properties to the client, like an access_token from a provider.
    session.accessToken = token.accessToken
    return session
  }
}
...
```

- 세션 데이터 확인

```ts
callbacks: {
    async session({ session }) {
      // Send properties to the client, like an access_token from a provider.
      console.log(session);
      return session;
    },
  },
```

```
# session data console.log
{
  user: {
    name: 'Tony',
    email: 'gth1123z@gmail.com',
    image: 'https://lh3.googleusercontent.com/a/AAcHTtdSB6EwBBRTgZlw2zZHrrgNzOU0L0IfW3lgIMSI3amAatw=s96-c'
  },
  expires: '2023-07-25T06:04:55.637Z'
}
```

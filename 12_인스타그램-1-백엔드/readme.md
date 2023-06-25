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

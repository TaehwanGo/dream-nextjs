# 4. 개념1 - 페이지 구성

## 4.1 챕터 소개

- 웹앱을 구성하는 기본적인 내용들
  - Static Routing, Dynamic Routing, Build
  - Layout, Link, SEO

## 4.2 프로젝트 셋업

```bash
npx create-next-app@latest
```

Installing dependencies:

- react
- react-dom
- next
- typescript
- @types/react
- @types/node
- @types/react-dom
- eslint
- eslint-config-next

## 4.3 정적 라우팅 (버전12)

- pages 폴더에 파일을 생성하면 자동으로 라우팅이 된다.
- 중첩된 경로를 만들고 싶다면
  - pages 폴더에 폴더를 생성하고 그 안에 파일을 생성하면 된다.

## 4.4 정적 라우팅 (버전13)

- 왜 13버전이 나오고
- 왜 pages 대신 app이 나왔을까?
  - 새로운 기능을 많이 추가해서 12버전에서 13버전으로 업데이트 해도 기존 코드가 깨지지 않도록 하기 위해서 pages 대신 app이 나왔다.
- 경로 별로 재사용하고 싶은 컴포넌트가 있다면?

  - layout

- 폴더를 만들고 page.tsx를 만들어서 고정적으로 생긴 라우팅이 정적 라우팅이다

## 4.5 ~ 4.6 정적 라우팅 연습

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

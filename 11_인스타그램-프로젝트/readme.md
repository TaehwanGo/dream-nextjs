# 11. 인스타그램 프로젝트 준비

## 11.1 챌린지 안내

- 다룰 라이브러리들
  - Next.js
  - Tailwind CSS
  - Sanity
    - Headless CMS

## 11.2 기능들 확인하기

- 로그인을 해야 앱을 사용할 수 있음

  - Sign in with google
  - 로그인하지 않아도 검색은 가능

- 인스타와 비슷하게 만들어보자

## 11.3 Headless CMS란?

- CMS: Content Management System
  - 컨텐트를 관리하는 시스템
- 웹개발
  - Head : front-end
  - Body : back-end
- Headless
  - front-end 없이 back-end만 가지고 있는 웹 컨텐트 매니지먼트 시스템
- front-end가 있는 CMS
  - wordpress

| Traditional CMS |  Headless CMS  |
| :-------------: | :------------: |
|   Monolithic    | Semi-decoupled |
|    Self-host    | Saas or Hosted |
|    Websites     |  Web Oriented  |

- Headless CMS 예시

  - WordPress가 새롭게 지원하는 Headless CMS WordPress
  - Strapi
  - Sanity
  - Contentful
  - Prismic
  - Storyblok
  - Webflow
  - Drupal

- Content Lake 라는 클라우드에 데이터가 저장됨
  - Sanity studio에 데이터가 저장
  - Front-end에서 데이터를 가져와서 사용

## 11.4 Sanity 살펴보기

- https://www.sanity.io/docs
- 프로젝트 생성
- create a schema
- create content
- connect content

## 11.5 사용할 라이브러리 소개

- swr
  - react-query와 비슷하지만 다양한 라이브러리를 경험해보기 위해
  - next.js에서 만든 vercel이 swr를 만들었기 때문
  - swr 패턴 : stale(오래된 데이터를 먼저 보여주고)-while(그 동안에)-revalidate(다시 검증)
- next-auth
  - 사용자 로그인을 위해
  - backend, front-end 양방향 지원
- react-spinners
  - 로딩 중에 보여줄 스피너
- timeago.js
  - 상대적 시간을 나타내는 것
- react-multi-carousel

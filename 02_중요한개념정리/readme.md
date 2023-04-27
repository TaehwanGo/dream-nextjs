# 2. 중요한 개념 정리

## 2.1 챕터 소개

- 개념, 원리를 정리해보자
- What's Next.js?
- History principles
- CSR vs SSR vs SSG vs ISR : Web App에서 쓸 수 있는 4가지 렌더링 방식
  - Client Side Rendering
  - Server Side Rendering
  - Static Site Generation
  - Incremental Static Regeneration
- Hybrid, Hydration
  - Next.js의 구현 특징

## 2.2 Next.js란 무엇인가?

- React
  - A JavaScript library for building user interfaces
  - SPA(Single page application)
  - `+` React router
  - Client Side Rendering
- Next.js

  - The React Framework for the Web
  - React로 웹앱을 개발하는데 리액트 만으로는 힘든 많은 것들을 가능하게 해줌

- Library : 툴 같은 개념
- Framework : 골격을 제공

## 2.3 Next.js 역사와 버전 스토리

- Next.js by Vercel
  - Paas(Platform as a Service) : 플랫폼을 제공해주는 서비스
  - Cloud Platform as a Service
- React based web app ssr, ssg 지원
- Next.js의 중요 원칙

  - 복잡한 설정 없이 바로 시작할 수 있어야 한다.
  - 자바스크립트만으로 풀스택
  - 개발자들이 따로 신경쓰지 않아도 코드스플리팅과 서버사이드렌더링을 자동으로 해준다.
  - data fetching을 설정가능하게 만들겠다
    - 한번 or 주기적 등
  - 요청사항을 예상 가능하게 만들겠다
  - 배포를 손쉽게 만들겠다

- History of Next.js

  - Next.js 13버전
    - 새로운 라우팅(/app)
    - 중첩 layouts
    - html streaming
    - new toolchain(Turbopack)

- 학습 포인트
  - React는 마스터해야 한다
  - React만으로는 힘든 많은 것들을 가능하게 해줌
    - React만의 한계점?
  - 어떤 것들을 어떻게 할 수 있는지?
  - 왜 그런 것들이 필요한지

## 2.4 CSR 특징, 장/단점

- Next.js는 리액트 웹앱을 만들기 위한 프레임 워크
- 리액트만으로 웹앱을 만들었을 때

  - Client Side Rendering
    - 렌더링 주체자 : 클라이언트(브라우저)
    - 장점
      - 한번 로딩되면, 빠른 UX 제공
      - 서버의 부하가 작음
    - 문제점
      - 페이지 로딩 시간(TTV)이 길다
        - TTV(Time To View)
        - FCP(First Contentful Paint)
      - 자바스크립트 활성화가 필수임
      - SEO 최적화가 힘듬
      - 보안에 취약함
      - CDN에 캐시가 안됨(HTML 페이지가 없으므로)
        - CDN(Content Delivery Network)
          - 미국 -> 한국 : 오래걸림
          - 미국 -> 싱가폴(CDN, 캐시) -> 한국

## 2.5 CSR 특징, 장/단점

- 아무것도 없는 HTML을 받아서 JS를 다운받고, JS를 실행하고, JS가 HTML을 만들어서 보여줌

## 2.6 SSG 특징, 장/단점

- 배포할 땐 정적인 사이트로 배포하는것은 어떨까? 라는 생각으로 나온 것
- 언제 렌더링 하냐?
  - 어플리케이션을 빌드 후 배포할 때
- CDN에 캐시된 HTML을 가져올 수 있음
- 장점
  - 페이지 로딩 시간(TTV)이 빠름
  - 자바스크립트 활성화가 필요없음
  - SEO 최적화가 가능
  - 보안에 강함
- 단점
  - 빌드할 때 렌더링 => 데이터가 정적임
  - 사용자별 정보 제공의 어려움
    - 모든 사용자에게 동일한 정보를 제공해야 함

## 2.7 ISR(Incremental Static Regeneration) 특징, 장/단점

- static site + regeneration
  - 주기적으로 렌더링
    - e.g. 최초 빌드 할 때 만들고 5분마다 업데이트
- SSG와 동일한 원리
  - 단, 정해진 주기에 따라 페이지를 다시 생성함
- 장점
  - SSG의 장점
  - 데이터가 주깆거으로 업데이트 됨
- 문제점
  - 주기적이지만 여전히 실시간 데이터가 아님
  - 사용자별 정보 제공의 어려움
- 이런 문제점을 해결하기 위해 나온게 SSR

## 2.8 SSR(Server Side Rendering) 특징, 장/단점

- 렌더링 하는 주체자가 서버
- SSG와 ISR도 주체자는 서버
- 언제 렌더링?

  - SSR : 요청시 렌더링
    - HTML파일을 만들고, 그걸 보내줌

- 장점
  - 페이지 로딩 시간(TTV)이 빠름
  - 자바스크립트 활성화가 필요없음
  - SEO 최적화가 가능
  - 보안에 강함
  - 실시간 데이터를 사용
  - 사용자별 필요한 데이터를 사용함
- 문제점
  - 비교적 느릴 수 있음
  - 서버의 과부하가 걸릴 수 있음
  - CDN에 캐시가 안됨

## 2.9 하이브리드의 매력

- Next.js for Hybrid Web App
  - 성능 좋은 강력한 Web App을 만들기 위해 두 개 이상(CSR, SSG, ISR, SSR)의 방식을 혼합해서 사용

## 2.10 하이드레이션(중요 컨셉!)

- Hydration : 수화시키다
  - Stay Hydrated : 물로 가득 채우다
  - 물 : 리액트
  - 리액트로 가득 채우다
  - 물티슈를 건조시킨 티슈, 컵라면
- 정적 HTML 페이지를 만들어서 보여줌
- 클라이언트에서 정적 페이지를 빠르게 보여줌(JS를 받기전이라 클릭해도 반응 없음)
- React와 JS코드가 다운로드가 되면 리액트로 가득 채우는 것
- 단순 정적 HTML 페이지 -> React로 변환(컴포넌트 렌더링)

## 2.11 웹개발 시 중요한 포인트

- TTV(Time To View) : 페이지가 보여지기까지 걸리는 시간
- TTI(Time To Interactive) : 페이지가 보여지고, 사용자가 페이지와 상호작용할 수 있게 되는 시간
- CSR(Client Side Rendering)
  - 요청
  - 텅텅빈 HTML
  - 아직 의미있는 컨텐츠 X
  - JS까지 다 받아야 볼 수 있음 : TTV, TTI
- SSR(Server Side Rendering)
  - 요청
  - 정적 HTML을 받아옴(Pre rendering) : TTV
  - 동작되진 않지만 화면이 보여짐(JS다운 중)
  - JS까지 다 받아지면 인터렉션이 가능해짐 : TTI

## 2.12 언제 어떤걸 쓰면 좋은지 정리

- Next.js Decision Tree
  - 엘리의 노하우 !
- 사용자의 로그인이 필요한가?
  - No
    - 얼마자 자주 변경되는가?(Static)
      - No : SSG
        - Next.js에서 상태가 없는 페이지라면 기본적으로 SSG로 동작 함
      - Yes
        - 데이터가 얼마나 자주 변경되는가?
          - 자주 변경되지 않고 민감하지 않음 => ISR
          - 자주 변경되고 민감함
            - SSR
            - 만약 서버 부하가 많아질 것 같다면 Hybrid : ISR|SSR + CSR
  - Yes
    - CSR
    - SSR
    - Hybrid : SSG + CSR

# 5. 렌더링

## 5.1 챕터 소개

- Server Component
- Client Component
- Fetch
- Rendering
  - SSG
  - ISR
  - SSR
  - CSR
- v12
- API Routes

## 5.2 최신 버전의 큰 차이점

- v12 vs. v13

### v12

- 페이지 단위로 렌더링
- getStaticProps()
- getServerSideProps()

### v13

- 컴포넌트 단위로 렌더링 방식을 규정
- Server Component : 서버상에서만 동작하는 컴포넌트
- Client Component
- 한 페이지 내 어떤 부분은 서버 컴포넌트, 어떤 부분은 클라이언트 컴포넌트로 구성 가능

## 5.3 서버 컴포넌트

- app 폴더 내 모든 컴포넌트는 기본적으로 서버 컴포넌트이다
- 서버컴포넌트는 console.log를 사용하면 서버 콘솔에 출력된다
- 서버 컴포넌트는 서버에서 실행이 된다
- prerendring된 HTML이 전송된다
- 서버 컴포넌트가 할 수 있는 것들
  - file system에 접근 가능
  - database 입출력 가능
  - node에서 할 수 있는 것들은 가능하다
- 서버 컴포넌트가 할 수 없는 것들

  - 상태 관련된 것들은 할 수 없다

- 서버 컴포넌트 : 서버에서 빌드될 때 실행되는 컴포넌트

## 5.4 클라이언트 컴포넌트

- 정말 필요한 부분만 클라이언트 컴포넌트로 만들어서 사용하자

## 5.5 동작 원리 분석

```bash
npm run build
npm run start
```

- 빌드 후 실행 시켜보자
  - 클라이언트 컴포넌트에서 찍은 console.log도 서버 콘솔에 찍힌다 -> 정적 페이지로 전달하기 위해서 실행 됨
- 네트워크 탭에서 최초 다운로드하는 html을 확인해보면 클라이언트 컴포넌트도 html에 포함되어 넘어오는 것을 확인할 수 있다

- 빌드 시 클라이언트 컴포넌트도 빌드되어서 전달된다
- 클라이언트 컴포넌트는 최초 전달 시 정적인 html로 전달이되고 해당 html은 클릭이벤트 같은 것이 동작하지 않음
- 이후 클라이언트 컴포넌트는 하이드레이션이 되면서 클릭이벤트 등을 처리할 수 있게 된다

## 5.6 공식 사이트 읽기

- https://nextjs.org/docs/getting-started/react-essentials
- 12버전까진 페이지 단위로 서버 or 클라이언트로 구분이 되었지만
- 13버전 부터는 컴포넌트 단위로 서버 or 클라이언트로 구분이 된다
  - interleave Server and Client Components
- 서버컴포넌트는 최종 빌드된 js 크기도 줄여준다
- 서버컴포넌트를 사용하면 apiKey 같은 것이 노출되지 않는다

## 5.7 리팩토링(설계)

- 동적인 데이터를 이용해서 구현해보자
- service라는 폴더를 만들고
  - 그 안에 products.ts를 만들어서 products 와 관련된 데이터를 다루는 함수를 만든다
  - 만들어진 함수를 각 서버 컴포넌트에서 사용한다

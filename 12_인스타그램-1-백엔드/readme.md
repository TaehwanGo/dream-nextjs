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

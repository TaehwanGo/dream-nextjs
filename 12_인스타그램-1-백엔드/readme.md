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

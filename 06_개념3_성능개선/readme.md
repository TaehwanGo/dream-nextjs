# 6. 성능 개선

## 6.1 챕터 소개

- Loading
- Error
- Image
- Font
- Redirect
- Rewrite
- Middleware

## 6.2 로딩 UI

- 13버전 부터는 folder 단위로 route를 구성해나갔다
  - some-route/page.tsx
- 그 이유는?
  - 해당 라우트를 위한 다양한 파일들을 만들 수 있다
    - page.tsx
    - layout.tsx
    - not-found.tsx
    - 이제는 loading.tsx에 대해 알아보자

### loading.tsx

- 해당 라우트에서 페이지 UI가 준비되기 이전에 무언가 준비중이라는 것을 보여주기 위한 UI 컴포넌트
- React에서 제공하는 Suspense, Boundary를 사용하는 것과 동일하다
- 해당 경로에 loading.tsx를 만들고 UI를 구성하면 된다
- 전체 페이지가 다 대체된다

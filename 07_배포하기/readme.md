# 7. 배포하기

## 7.1 챕터 소개

- Next.js 앱을 Vercel에 간단히 배포
- CI/CD 방법
- 현업에서 배포 FLOW

## 7.2 Vercel에 배포하기

- github에 레포를 새로 만든다

  - 배포할 디렉토리에서 git init으로 초기화
  - 초기화된 파일들을 커밋 후 해당 레포로 push
  - 현재 배포할 프로젝트(note)에 git remote를 추가한다
    - `git remote add deploy https://github.com/TaehwanGo/next-note-deploy.git`

- vercel에서 해당 레포를 가져온다

  - popup -> install (만약 팝업이 안뜨면 Import Git Repository를 클릭해서 팝업창을 띄울 수 있다)
  - import repository

- 환경변수를 .env에 추가했던 것을 배포할 때 서버환경에서 key value를 하나씩 추가해준다
- 설정이 완료되면 deploy 버튼 클릭 -> 배포 완료

  - https://next-note-deploy.vercel.app/

- Dashboard
  - build log : 빌드 시 발생한 로그
  - Runtime log : 런타임 시 발생한 로그

## 7.3 CI/CD

- vercel에 배포 후 github에 push하면 자동으로 배포가 된다
  - 실제 현업에선 work flow를 따라서 배포를 한다

## 7.4 개발자의 work flow

- 브랜치를 하나 더 만든다(release)
- release 브랜치 생성 후 push
- vercel -> setting -> git
  - https://vercel.com/taehwango/next-note-deploy -> setting -> git -> production 브랜치 변경
- master에서 작업 후 배포하려면 release로 pull request를 보낸다(Squash and merge)
  - Release v2.1
    - 해당 릴리즈에 대한 설명

## 7.5 공식 사이트 읽기

- https://nextjs.org/docs/app/building-your-application/deploying
- 일반적인 env파일에 있는 것은 client 컴포넌트에서 접근이 불가능
  - getServerSideProps, getStaticProps에서만 접근 가능
- 만약 client에서 접근가능한 환경변수(env 파일에 있는)가 필요하다면 `NEXT_PUBLIC_`을 붙여준다(보안에 취약)
  - e.g. NEXT_PUBLIC_API_URL=http://localhost:3000/api/notes

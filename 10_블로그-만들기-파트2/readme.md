# 10. 블로그 만들기 파트2

## 10.1 마크다운 뷰어

- md 파일을 markdown viewer에 표시

## 10.2 마크다운 뷰어 - 라이브러리

블로그 프로젝트에 마크다운 관련 라이브러리 및 플러그인 설치

```bash
npm i react-markdown remark-gfm
```

현재 Tailwind CSS를 사용하면 기본적으로 reset이 된다

우리가 컨트롤 하지 못하는 HTML 또는 Markdown에선 그 스타일을 유지시켜줄 수 있다

```bash
npm install -D @tailwindcss/typography
```

- https://tailwindcss.com/docs/typography-plugin

tailwind.config.js에 플러그인 추가

```js
module.exports = {
  ...
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

MarkdownViewer 컴포넌트의 className="prose" 추가

### 10.3 마크다운 뷰어 - 상세 정보

- 제목뿐만 아니라 이미지나 메타데이터 같은 정보도 보여주자
- icon 사용을 위해 라이브러리를 추가하자
  - https://react-icons.github.io/react-icons/

```bash
npm i react-icons
```

## 10.4 마크다운 뷰어 - 코드문법

- syntax highlighting in react-markdown

```bash
npm i react-syntax-highlighter
npm i --save-dev @types/react-syntax-highlighter
```

- https://www.npmjs.com/package/react-markdown#use-custom-components-syntax-highlight

## 10.5 이전, 다음 포스트 카드 버튼 만들기 안내

## 10.6 이전, 다음 포스트 카드 버튼 만들기 - 리팩터링

- 컴포넌트가 비대해지면 분리하자

## 10.7 이전, 다음 포스트 카드 버튼 만들기 - 로직 구현

- 현재 포스트 데이터에 이전, 다음 포스트의 데이터가 있어야 한다
  - getAllPosts에서 데이터를 가져오므로 이전, 다음 데이터를 쉽게 구할 수 있다

## 10.8 이전, 다음 포스트 카드 버튼 만들기 - 컴포넌트

## 10.9 정보, 연락 페이지 - 안내

## 10.10 정보, 연락 페이지 - 페이지

- 같은 페이지 내에서 이동 시 Link 태그를 이용하지만 다른 페이지로 이동 시에는 a 태그를 사용한다
- rel은 관계를 뜻하는 relationship의 줄임말입니다. 웹 브라우저와 검색 엔진을 위한 속성입니다. 이 속성이 있고 없고가 사용자에게 미치는 영향은 거의 없습니다.
  - noreferrer noopener는 보안을 위해 사용한다
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/noopener
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/noreferrer
  - https://joshua-dev-story.blogspot.com/2020/12/html-rel-noopener-noreferrer.html
  - https://3rabbitz.com/blog_ko/08d34c69855fbcad
  - noopener
    - noopener(노오프너)를 지정하면, 링크된 페이지에서 window.opener을 사용해서 링크를 건 페이지를 참조(reference)할 수 없게 됩니다
  - noreferrer
    - noreferrer(노리퍼러)를 지정하면 다른 페이지로 이동할 때, 링크를 건 페이지의 주소 등의 정보를 브라우저가 Referer: HTTP 헤더로 리퍼러(referer 또는 referrer)로서 송신하지 않습니다.
  - nofollow
    - 예를 들어 nofollow을 사용하면 검색 엔진이 해당 링크를 크롤링하지 않을 수 있습니다. 검색 대상이 아닌 로그인 페이지 링크를 이렇게 설정할 수 있습니다.

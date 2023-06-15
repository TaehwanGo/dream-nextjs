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

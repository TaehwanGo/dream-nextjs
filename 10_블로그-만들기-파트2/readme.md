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

## 10.11 정보, 연락 페이지 - 입력폼

- form 은 클라이언트에서 실행되어야 하므로 클라이언트 컴포넌트

```tsx
export default function ContactForm() {
  const [form, setForm] = useState<Form>({
    from: "",
    subject: "",
    message: "",
  });

  // onChange에서 event.target name으로 각 input 또는 textarea의 name을 사용해서 setState를 해준다
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="from">Your Email</label>
        <input
          type="email"
          id="from"
          name="from"
          required
          autoFocus
          value={form.from}
          onChange={onChange}
        />
        <label htmlFor="subject">Your Email</label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={onChange}
        />
        <label htmlFor="message">Your Email</label>
        <textarea
          rows={10} // 총 줄 수
          id="message"
          name="message"
          required
          value={form.message}
          onChange={onChange}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}
```

- onChange에서 event name으로 각 input 또는 textarea의 name을 사용해서 setState를 해준다

## 10.12 정보, 연락 페이지 - 배너

- 이메일을 잘 보냈는지 아닌지 보여주는 배너(banner: 신문의 맨 위에 있는 큰 제목)

## 10.13 이메일 보내기 - 안내

- 이메일을 보내는 방법은 여러가지가 있다
  - https://www.npmjs.com/package/nodemailer
- 유효성 검사
  - yup
    - https://www.npmjs.com/package/yup

## 10.14 이메일 보내기 - 클라이언트

- submit 이 발생
- 서버 API 라우트에서 이메일을 보낸다
- service 폴더 : 비즈니스 로직
- app/api
  - [path]/route.ts
    - 해당 파일에서 HTTP 메소드별 API 라우트를 정의한다

#### 프로세스 정리

- ContactForm

  - 클라이언트 컴포넌트
  - form 데이터를 submit

- service/contact

  - sendContactEmail
    - 클라이언트에서 실행
    - 비동기로 메일 데이터를 요청
      - fetch

- api/contact/route.ts
  - 서버에서 실행
  - POST
    - 메일을 보내고 응답을 보내줌

## 10.15 이메일 보내기 - 서버 라우트

- 노드메일러

  - https://nodemailer.com/about/
  - createTextAccount
  - 계정 설정
    - createTransport
  - sendMail

- 메일 계정은 .env.local에 저장한다

  - gitignore에 설정하고 서버에서 환경변수로 사용한다

- gmail 사용

  - Google Account > Security > Signing in to Google
    - 2-Step Verification 설정하기 > App password
      - app password를 생성한다
        - select app : Mail
        - select device : Other (Custom name) => Blog
      - 생성된 app password를 .env.local에 저장한다

- api/contact/route.ts 에서 메일을 보내지만 외부 라이브러리를 사용할 땐 파일을 분리해서 사용한다
  - service/email.ts

#### 에러: http://localhost:3000/api/contact 400 (Bad Request)

- request.body => request.body ReadableStream { locked: false, state: 'readable', supportsBYOB: false }
- ReadableStream
  - API route의 body는 노드에서 사용하는 Request와 동일
  - body는 ReadableStream이다
  - https://nodejs.org/api/stream.html#stream_readable_streams
  - await을 이용해서 json으로 변환해줘야 함
    - const body = await request.body();

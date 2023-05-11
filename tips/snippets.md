### 커맨드 팔렛트에서 snippet 열기

- cmd + shift + P
- Snippet: Configure User Snippets
- New Global Snippets file

### snippet 만들기

```json
{
  "React Function Component": {
    "prefix": "rfc",
    "body": [
      "export default function ${1:${TM_FILENAME_BASE/(.*)/${1:/pascalcase}/}}($2) {",
      "  $3",
      "  return (",
      "    <div>",
      "      $4",
      "    </div>",
      "  );",
      "}"
    ],
    "description": "React Function Component"
  }
}
```

- https://snippet-generator.app/

### 참고

- https://youtu.be/umeqCopb96w

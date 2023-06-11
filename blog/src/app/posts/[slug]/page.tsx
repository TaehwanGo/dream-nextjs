import { getPostData } from "@/service/posts";

interface PostPageProps {
  params: {
    slug: string;
  };
}
export default async function PostPage({ params: { slug } }: PostPageProps) {
  // 1. 전달된 slug에 해당하는 포스트 데이터를 읽어와서
  // 2. 데이터를 마크다운 뷰어에 표기
  const post = await getPostData(slug);
  return (
    <>
      <h1>{post.title}</h1>
      <pre>{post.content}</pre>
    </>
  );
}

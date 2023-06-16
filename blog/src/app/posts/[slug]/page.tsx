import PostContent from "@/components/PostContent";
import { getPostData } from "@/service/posts";
import Image from "next/image";

interface PostPageProps {
  params: {
    slug: string;
  };
}
export default async function PostPage({ params: { slug } }: PostPageProps) {
  const post = await getPostData(slug);
  const { title, path, next, prev } = post;
  return (
    <article className="m-4 overflow-hidden bg-gray-100 shadow-lg rounded-2xl">
      <Image
        className="w-full h-1/5 max-h-[500px]"
        src={`/images/posts/${path}.png`}
        alt={title}
        width={760}
        height={420}
      />
      <PostContent post={post} />
      <section>
        {prev && <p>{prev.title}</p>}
        {next && <p>{next.title}</p>}
      </section>
    </article>
  );
}

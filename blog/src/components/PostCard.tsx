import { Post } from "@/service/posts";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({
  post: { title, description, date, path, category },
}: PostCardProps) {
  return (
    <Link href={`/posts/${path}`}>
      <Image
        src={`/images/posts/${path}.png`}
        alt={title}
        width={300}
        height={200}
      />
      <div>
        <time dateTime={date.toString()}>{date.toString()}</time>
        <h3>{title}</h3>
        <p>{description}</p>
        <span>{category}</span>
      </div>
    </Link>
  );
}

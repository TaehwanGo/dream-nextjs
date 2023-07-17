import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";

interface Props {
  post: SimplePost;
  priority?: boolean;
}
export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <article className="border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center p-2">
        <Avatar image={userImage} highlight size="medium" />
        <span className="ml-2 font-bold text-gray-900">{username}</span>
      </div>
      <Image
        className="object-cover w-full aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
    </article>
  );
}

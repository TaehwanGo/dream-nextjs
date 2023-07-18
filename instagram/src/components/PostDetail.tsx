import { FullPost, SimplePost } from "@/model/post";
import useSWR from "swr";

interface Props {
  post: SimplePost;
}
export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  console.log(comments);
  return <div>1</div>;
}

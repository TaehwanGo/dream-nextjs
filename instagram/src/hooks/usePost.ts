import { SimplePost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";

export default function usePost() {
  // posts 가져오기
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/posts");
  const { mutate } = useSWRConfig();
  const setLike = (post: SimplePost, username: string, like: boolean) => {
    fetch("api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: post.id, like }),
    }).then(() => {
      mutate("/api/posts");
    });
  };
  return {
    posts,
    isLoading,
    error,
    setLike,
  };
}

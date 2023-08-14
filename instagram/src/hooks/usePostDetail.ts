import { Comment, FullPost } from "@/model/post";
import useSWR from "swr";

async function addComment(id: string, comment: string) {
  return fetch("api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePostDetail(postId: string) {
  // posts 가져오기
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);

  const postComment = (comment: Comment) => {
    if (!post) return;
    const newPost = {
      ...post,
      comments: [...post.comments, comment],
    };

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false, // 서버에 요청을 보내지 않음
      rollbackOnError: true,
    });
  };

  return {
    post,
    isLoading,
    error,
    postComment,
  };
}

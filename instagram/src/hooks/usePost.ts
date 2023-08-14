import { Comment, SimplePost } from "@/model/post";
import useSWR from "swr";

async function updateLike(id: string, like: boolean) {
  return fetch("api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch("api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePost() {
  // posts 가져오기
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((v) => v !== username),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false, // 서버에 요청을 보내지 않음
      rollbackOnError: true,
    });
  };

  const postComment = (post: SimplePost, comment: Comment) => {
    const newPost = {
      ...post,
      comments: post.comments + 1,
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false, // 서버에 요청을 보내지 않음
      rollbackOnError: true,
    });
  };

  return {
    posts,
    isLoading,
    error,
    setLike,
    postComment,
  };
}

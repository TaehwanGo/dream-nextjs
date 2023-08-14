"use client";
import { SimplePost } from "@/model/post";
import useSWR from "swr";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";
import usePost from "@/hooks/usePost";

export default function PostList() {
  const { posts, isLoading } = usePost();
  return (
    <section>
      {isLoading && (
        <div className="mt-32 text-center">
          <GridSpinner color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => {
            return (
              <li key={post.id} className="mb-4">
                <PostListCard post={post} priority={index < 2} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

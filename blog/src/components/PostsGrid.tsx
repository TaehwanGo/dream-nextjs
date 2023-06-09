import { Post } from "@/service/posts";
import PostCard from "./PostCard";

interface PostsGridProps {
  posts: Post[];
}

export default function PostsGrid({ posts }: PostsGridProps) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.path}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}

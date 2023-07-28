import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import { SimplePost } from "@/model/post";
import PostGridCard from "./PostGridCard";

type Props = {
  username: string;
  query: string;
};
export default function PostGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

  return (
    <div>
      {isLoading && <GridSpinner />}
      <ul>
        {posts?.map((post, index) => {
          return (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

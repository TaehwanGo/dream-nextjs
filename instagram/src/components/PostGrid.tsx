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
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 px-8 py-4">
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

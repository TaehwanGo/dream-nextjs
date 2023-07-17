import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";

interface ActionBarProps {
  likes: string[];
  username: string;
  text: string;
  createdAt: string;
}
export default function ActionBar({
  likes,
  username,
  text,
  createdAt,
}: ActionBarProps) {
  return (
    <>
      <div className="flex justify-between px-4 my-2">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 text-sm font-bold">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        <p>
          <span className="mr-1 font-bold">{username}</span>
          {text}
        </p>
        <p
          className="my-2 text-xs uppercase text-neutral-500"
          title={createdAt}
        >
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}

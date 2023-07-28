"use client";

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostGrid from "./PostGrid";

const tabs = [
  {
    type: "posts",
    icon: <PostIcon />,
  },
  {
    type: "saved",
    icon: <BookmarkIcon className="w-3 h-3" />,
  },
  {
    type: "liked",
    icon: <HeartIcon className="w-3 h-3" />,
  },
];

type Props = {
  user: ProfileUser;
};
export default function UserPosts({ user: { username } }: Props) {
  /**
   * tab 3가지
   * 1. /api/users/:username/posts
   * 2. /api/users/:username/liked
   * 3. /api/users/:username/bookmarks
   */
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase">
        {tabs.map(({ type, icon }) => {
          return (
            <li
              className={`mx-12 p-4 cursor-pointer border-black ${
                type === query && "font-bold border-t"
              }`}
              key={type}
              onClick={() => setQuery(type)}
            >
              <button className="scale-150 md:scale-100">{icon}</button>
              <span className="hidden md:inline">{type}</span>
            </li>
          );
        })}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
}

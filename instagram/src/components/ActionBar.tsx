"use client";

import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import { useState } from "react";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";

interface ActionBarProps {
  likes: string[];
  username: string;
  text?: string;
  createdAt: string;
}
export default function ActionBar({
  likes,
  username,
  text,
  createdAt,
}: ActionBarProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <>
      <div className="flex justify-between px-4 my-2">
        <ToggleButton
          toggled={isLiked}
          onToggle={setIsLiked}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 text-sm font-bold">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {text && (
          <p>
            <span className="mr-1 font-bold">{username}</span>
            {text}
          </p>
        )}
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

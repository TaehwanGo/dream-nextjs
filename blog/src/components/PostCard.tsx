"use client";

import { Post } from "@/service/posts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({
  post: { title, description, date, path, category },
}: PostCardProps) {
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(-100);
  return (
    <Link
      href={`/posts/${path}`}
      draggable="false"
      onClick={(e) => {
        // prevent link if user is dragging
        if (Math.abs(startPosition - endPosition) > 10) {
          e.preventDefault();
        }
      }}
      onMouseDown={(e) => {
        setStartPosition(e.clientX);
      }}
      onMouseMove={(e) => {
        setEndPosition(e.clientX);
      }}
    >
      <article className="overflow-hidden rounded-md shadow-md hover:shadow-lg">
        <Image
          className="w-full"
          src={`/images/posts/${path}.png`}
          alt={title}
          width={300}
          height={200}
          draggable="false"
        />
        <div className="flex flex-col items-center">
          <time className="self-end text-gray-700" dateTime={date.toString()}>
            {date.toString()}
          </time>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="w-full text-center truncate">{description}</p>
          <span className="px-2 my-2 text-sm bg-green-100 rounded-lg">
            {category}
          </span>
        </div>
      </article>
    </Link>
  );
}

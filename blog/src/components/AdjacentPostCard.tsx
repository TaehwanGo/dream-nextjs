import { Post } from "@/service/posts";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ICON_CLASS =
  "m-4 text-5xl text-yellow-300 transition-all group-hover:text-6xl";

interface AdjacentPostCardProps {
  post: Post;
  type: "prev" | "next";
}
export default function AdjacentPostCard({
  post,
  type,
}: AdjacentPostCardProps) {
  const { title, path, description } = post;
  return (
    <Link href={`/posts/${path}`} className="relative w-full bg-black max-h-56">
      <Image
        className="w-full opacity-40"
        src={`/images/posts/${path}.png`}
        alt={title}
        width={150}
        height={100}
      />
      <div className="absolute flex items-center justify-around w-full px-8 text-white -translate-x-1/2 -translate-y-1/2 group top-1/2 left-1/2">
        {type === "prev" && <FaArrowLeft className={ICON_CLASS} />}
        <div className="w-full text-center">
          <h3 className="text-3xl font-bold">{title}</h3>
          <p className="font-bold">{description}</p>
        </div>
        {type === "next" && <FaArrowRight className={ICON_CLASS} />}
      </div>
    </Link>
  );
}

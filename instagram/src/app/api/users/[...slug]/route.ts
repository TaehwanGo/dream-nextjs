import {
  getLikedPostsOf,
  getPost,
  getPostsOf,
  getSavedPostsOf,
} from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[];
  };
};
// dynamic route 이지만 여러 slug를 받아오므로 [...slug]로 디렉토리를 만들어준다.
export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;
  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const [username, query] = slug;

  let request = getPostsOf;
  if (query === "saved") {
    request = getSavedPostsOf;
  } else if (query === "liked") {
    request = getLikedPostsOf;
  }

  return request(username).then((data) => NextResponse.json(data));
}

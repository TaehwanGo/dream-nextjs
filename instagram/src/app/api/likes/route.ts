import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { likePost, unlikePost } from "@/service/posts";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id, like } = await req.json(); // req의 body를 json으로 변환

  if (!id || like === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = like ? likePost : unlikePost;

  return request(id, user.id) //
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByUsername } from "@/service/user";

export async function GET(req: Request) {
  // 사용자가 보낸 토큰안에 있는 정보를 가져옵니다.
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    // 유효한지 검사하는 것은 모듈별로 나눠서 개발하는 것이 좋다
    return new Response("Authentication Error", { status: 401 });
  }

  return getUserByUsername(user.username).then((data) =>
    NextResponse.json(data)
  );
}

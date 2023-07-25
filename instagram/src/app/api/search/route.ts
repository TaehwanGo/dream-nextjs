import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

export async function GET() {
  // 검색 기능은 로그인 없이도 사용가능하기 때문에 세션을 사용하지 않음
  return searchUsers().then((data) => NextResponse.json(data));
}

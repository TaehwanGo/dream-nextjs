import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ssr을 위해 필요한 코드

export async function GET() {
  // Nextjs의 fetch를 사용하지 않아서 SSG로 동작했었음
  // 검색 기능은 로그인 없이도 사용가능하기 때문에 세션을 사용하지 않음
  return searchUsers().then((data) => NextResponse.json(data));
}

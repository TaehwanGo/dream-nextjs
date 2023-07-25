import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    keyword: string;
  };
};
export async function GET(_: NextRequest, context: Context) {
  // 검색 기능은 로그인 없이도 사용가능하기 때문에 세션을 사용하지 않음
  return searchUsers(context.params.keyword).then((data) =>
    NextResponse.json(data)
  );
}

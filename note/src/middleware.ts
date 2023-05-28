import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("미들웨어 테스트");
  if (request.nextUrl.pathname.startsWith("/products/1004")) {
    console.log("경로 리다이렉팅");
    return NextResponse.redirect(new URL("/products", request.url)); // redirect('경로', 'base url')
  }
}

// 미들웨어가 특정 경로에서만 실행되도록 설정
export const config = {
  matcher: ["/products/:path+"],
};

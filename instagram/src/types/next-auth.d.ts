import NextAuth, { DefaultSession } from "next-auth/next";

// 추가로 모듈의 타입을 확장
declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    } & DefaultSession["user"];
  }
}

import { addUser } from "@/service/user";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_IO || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user: { id, email, name, image } }) {
      if (!email) {
        return false;
      }
      addUser({
        id,
        name: name || "",
        email,
        image,
        username: email.split("@")[0],
      });
      return true;
    },
    async session({ session, token }) {
      // console.log(session);
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email.split("@")[0],
          id: token.id as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      // jwt는 token이 만들어질 때마다 호출됨
      // 참고 : https://next-auth.js.org/configuration/callbacks#jwt-callback
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

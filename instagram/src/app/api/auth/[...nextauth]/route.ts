import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_IO || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
    // ...add more providers here
  ],
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email;

      if (!email || !email.toLowerCase().endsWith("@ves.ac.in")) {
        return false;
      }

      return true;
    },

    async session({ session }) {
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const res = await axios.post(`${process.env.SERVER_URI}api/login`, {
          email,
          password,
        });

        const user = res.data;
        if (user) {
          return user;
        } else return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  jwt: {
    maxAge: 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      session = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

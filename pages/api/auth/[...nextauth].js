import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password, role } = credentials;

        const response = await axios.post(
          `${process.env.SERVER_URI}api/login`,
          {
            email,
            password,
            role,
          }
        );

        const data = response?.data;
        if (data.user) {
          return data;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

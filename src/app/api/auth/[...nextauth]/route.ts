import { BACKEND_URL } from "@/lib/constants";
import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token.tokens.refresh_token}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    tokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null
        const { username, password } = credentials;

        const res = await fetch(BACKEND_URL + "/auth/login", {
          method: 'POST',
          body: JSON.stringify({
            username,
            password
          }),
          headers: { "Content-Type": "application/json" }
        })

        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json()
        if (res.ok && user) {
          return user
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("Jwt token and user object ",{token, user})
      if (user) return { ...token, ...user }
      if(new Date().getTime() < token.tokens.expiresIn)  return token;
      
      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user
      session.tokens = token.tokens
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    verifyRequest: "/auth/verify-email"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
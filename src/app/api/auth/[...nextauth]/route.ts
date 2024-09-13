import { BACKEND_URL } from "@/lib/constants";
import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

async function refreshToken(token: JWT): Promise<JWT> {
  console.log("This should be correct : ", token.tokens?.refresh_token);
  const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.tokens?.refresh_token}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();
  const refreshedTokens = { ...token, tokens: response }
  return refreshedTokens;
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null
        const { email, password } = credentials;

        const res = await fetch(BACKEND_URL + "/auth/login", {
          method: 'POST',
          body: JSON.stringify({
            email,
            password
          }),
          headers: { "Content-Type": "application/json" }
        })

        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json()
        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user }
      }
      if (new Date().getTime() < token.tokens.expiresIn) return token;
      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token?.user
      session.tokens = token?.tokens
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-email"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
import { hash, compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

import { getServerSession } from "next-auth/next";

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Email/Password Provider
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Call our backend API for authentication
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data.user) {
            return {
              id: data.user._id,
              email: data.user.email,
              name: data.user.name,
              image: data.user.avatar,
              provider: "credentials",
              role: data.user.role || "user", // default to 'user' if not set
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),

    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "Google User";
        if (profile?.email == "aman230630@gmail.com") userRole = "admin";

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // GitHub Provider
    GitHubProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "Github User";
        if (profile?.email == "aman230630@gmail.com") userRole = "admin";

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // For OAuth providers (Google, GitHub), sync with our backend
        if (account?.provider === "google" || account?.provider === "github") {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/auth/oauth`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: account.provider,
                providerId: user.id,
                email: user.email,
                name: user.name,
                avatar: user.image,
                profile: profile,
              }),
            }
          );

          if (!response.ok) {
            console.error("Failed to sync OAuth user with backend");
            return false;
          }

          const data = await response.json();
          // Update user object with backend user ID

          user.id = data.user._id;
          user.role = data.user.role || "user"; // Attach role
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      console.log("auth.js > authOptions > callbacks > jwt");
      console.log("token", token);
      console.log("user", user);
      console.log("account", account);

      // Initial sign in
      if (account && user) {
        token.provider = account.provider;
        token._id = user.id;
        token.role = user.role || "user";
      }

      return token;
    },
    async session({ session, token }) {
      console.log("auth.js > authOptions > callbacks > session");
      console.log("session", session);
      console.log("token", token);
      if (token) {
        session.user._id = token._id;
        session.user.provider = token.provider as string;
        session.user.role = token.role || "user";
        session.user.accessToken = token;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    role?: "user" | "owner" | "admin";
  }
  interface Session {
    user: {
      _id?: string;
      username?: string;
      role?: "user" | "owner" | "admin";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    role?: "user" | "owner" | "admin";
  }
}

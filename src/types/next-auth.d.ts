import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            userId?: string
            email?: string
            username?: string
        } & DefaultSession["user"]
    }

    interface User {
        id?: string
        email?: string
        username?: string
    }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string
    email?: string
    username?: string
  }
}
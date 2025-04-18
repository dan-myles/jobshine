import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { getBaseUrl } from "@jobshine/common"
import { db } from "@jobshine/db/client"
import * as schema from "@jobshine/db/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  baseURL: `${getBaseUrl()}/api/v1/auth`,
  trustedOrigins: [
    ...(process.env.NODE_ENV === "production"
      ? [getBaseUrl()!]
      : [`http://localhost:${process.env.PORT ?? 3000}`]),
  ],
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production" ? true : false,
  },
  session:{
    cookieCache: {
      enabled: true,
      maxAge: 600,
    }
  },
  emailAndPassword: {
    enabled: true,
  },
})

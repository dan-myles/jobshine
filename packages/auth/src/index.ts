import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { getBaseUrl } from "@acme/common"
import { db } from "@acme/db/client"
import * as schema from "@acme/db/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  baseURL: `${getBaseUrl()}/auth`,
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    ...(process.env.NODE_ENV === "production"
      ? [getBaseUrl()]
      : [`http://localhost:${process.env.PORT ?? 3000}`]),
  ],
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production" ? true : false,
  },
})

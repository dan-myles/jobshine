import { createAuthClient } from "better-auth/react"

import { getBaseUrl } from "@jobshine/common"

export const auth = createAuthClient({
  baseURL: `${process.env.NODE_ENV === "production" ? getBaseUrl() : "http://localhost:3000"}/api/v1/auth`,
})

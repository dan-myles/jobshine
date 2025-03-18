import { createAuthClient } from "better-auth/react"

import { getBaseUrl  } from "@acme/common"

export const authClient = createAuthClient({
  baseURL: `${getBaseUrl()}/api/v1/auth`,
})

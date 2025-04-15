import { createAuthClient } from "better-auth/react"

import { getBaseUrl } from "@jobshine/common"

export const authClient = createAuthClient({
  baseURL: `${getBaseUrl()}/api/v1/auth`,
})

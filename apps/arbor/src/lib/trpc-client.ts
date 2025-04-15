import {
  createTRPCClient as client,
  loggerLink,
  httpBatchLink
} from "@trpc/client"
import SuperJSON from "superjson"

import type { AppRouter } from "@jobshine/api"
import { getBaseUrl } from "@jobshine/common"

export function createTRPCClient() {
  return client<AppRouter>({
    links: [
      loggerLink({
        enabled: (op) =>
          process.env.NODE_ENV === "development" ||
          (op.direction === "down" && op.result instanceof Error),
      }),
      httpBatchLink({
        transformer: SuperJSON,
        url: getBaseUrl() + "/api/v1/trpc",
      }),
    ],
  })
}

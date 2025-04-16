import { getHeaders } from "@tanstack/react-start/server"
import {
  createTRPCClient as client,
  httpBatchLink,
  loggerLink,
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
        headers() {
          const headers = new Map<string, string>()

          // If we are on the server in a loader/RSC,
          // we need to get the headers from the request.
          if (typeof window === "undefined") {
            const kv = getHeaders()
            headers.set("Cookie", kv.cookie ?? "")
          }

          return Object.fromEntries(headers)
        },
      }),
    ],
  })
}

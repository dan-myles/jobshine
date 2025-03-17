import { QueryClient } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"
import superjson from "superjson"

import type { AppRouter } from "@acme/api"

import { authClient } from "~/utils/auth-client"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ...
    },
  },
})

/**
 * A set of typesafe hooks for consuming your API.
 */
const api = createTRPCOptionsProxy<AppRouter>({
  client: createTRPCClient({
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === "development" ||
          (opts.direction === "down" && opts.result instanceof Error),
        colorMode: "ansi",
      }),
      httpBatchLink({
        transformer: superjson,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        url: `https://${process.env.EXPO_PUBLIC_API_URL}/api/v1/trpc`,
        headers() {
          const headers = new Map<string, string>()
          const cookies = authClient.getCookie()

          if (cookies) {
            // NOTE: Here is where we are setting our authentication cookie
            // to the headers of our request. If this is not set, then we
            // will not be able to authenticate our requests.
            headers.set("Cookie", cookies)
          }

          headers.set("x-trpc-source", "expo-react")
          return Object.fromEntries(headers)
        },
      }),
    ],
  }),
  queryClient,
})

export { type RouterInputs, type RouterOutputs } from "@acme/api"
export { api, queryClient }

"use client"

import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client"
import SuperJSON from "superjson"

import type { AppRouter } from "@acme/api"
import { getBaseUrl } from "@acme/common"

import type { QueryClient } from "@tanstack/react-query"
import { APIProvider as APIReactProvider } from "@/lib/api/client"
import { createQueryClient } from "@/lib/query-client"

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}

export function APIProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/v1/trpc",
          headers: () => {
            const headers = new Headers()
            headers.set("x-trpc-source", "nextjs-react")
            return headers
          },
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <APIReactProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </APIReactProvider>
    </QueryClientProvider>
  )
}

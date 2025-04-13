"use client"

import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client"
import SuperJSON from "superjson"

import type { AppRouter } from "@jobshine/api"

import type { QueryClient } from "@tanstack/react-query"
import { APIProvider as APIReactProvider } from "@/lib/api-client"
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
        httpBatchLink({
          transformer: SuperJSON,
          url: "/api/v1/trpc",
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

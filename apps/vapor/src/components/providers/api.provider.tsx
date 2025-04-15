"use client"

import { QueryClientProvider } from "@tanstack/react-query"

import type { AppRouter } from "@jobshine/api"

import type { QueryClient } from "@tanstack/react-query"
import type { TRPCClient } from "@trpc/client"
import { APIProvider as APIReactProvider } from "@/lib/api/client"
import { createQueryClient } from "@/lib/query-client"
import { createTRPCClient } from "@/lib/trpc-client"

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}

let trpcClientSingleton: TRPCClient<AppRouter> | undefined = undefined
const getTRPCClient = () => {
  if (typeof window === "undefined") {
    return createTRPCClient()
  }
  return (trpcClientSingleton ??= createTRPCClient())
}

export function APIProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  const trpcClient = getTRPCClient()

  return (
    <QueryClientProvider client={queryClient}>
      <APIReactProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </APIReactProvider>
    </QueryClientProvider>
  )
}

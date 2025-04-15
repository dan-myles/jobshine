import { useState } from "react"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { QueryClientProvider } from "@tanstack/react-query"
import { persistQueryClient } from "@tanstack/react-query-persist-client"

import type { QueryClient } from "@tanstack/react-query"
import { APIProvider as APIReactProvider } from "@/lib/api-client"
import { createQueryClient } from "@/lib/query-client"
import { createTRPCClient } from "@/lib/trpc-client"

let queryClientSingleton: QueryClient | undefined = undefined
export const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (queryClientSingleton ??= createQueryClient())
}

if (typeof window !== "undefined") {
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  })

  persistQueryClient({
    // @ts-ignore not sure why :()
    queryClient: getQueryClient(),
    persister: localStoragePersister,
    maxAgeMs: 1000 * 60 * 60 * 24, // 1 day
  })
}

export function APIProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() => {
    return createTRPCClient()
  })

  return (
    <QueryClientProvider client={queryClient}>
      <APIReactProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </APIReactProvider>
    </QueryClientProvider>
  )
}

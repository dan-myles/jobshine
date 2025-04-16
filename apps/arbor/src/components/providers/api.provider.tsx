import { useState } from "react"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { isServer, QueryClientProvider } from "@tanstack/react-query"
import { persistQueryClient } from "@tanstack/react-query-persist-client"

import type { QueryClient } from "@tanstack/react-query"
import { APIProvider as APIReactProvider } from "@/lib/api-client"
import { createQueryClient } from "@/lib/query-client"
import { createTRPCClient } from "@/lib/trpc-client"

let queryClientSingleton: QueryClient | undefined = undefined
export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return createQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!queryClientSingleton) queryClientSingleton = createQueryClient()
    return queryClientSingleton
  }
}

if (!isServer) {
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

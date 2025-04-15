import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"

import { AppRouter } from "@jobshine/api"

import { getQueryClient } from "@/components/providers/api.provider"
import { createTRPCClient } from "@/lib/trpc-client"
import { routeTree } from "./routeTree.gen"

const trpc = createTRPCOptionsProxy<AppRouter>({
  client: createTRPCClient(),
  queryClient: getQueryClient(),
})

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    context: {
      auth: undefined,
      api: trpc,
      queryClient: getQueryClient(),
    },
  })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}

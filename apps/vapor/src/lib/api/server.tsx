import "server-only"

import { cache } from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"

import { appRouter, createCaller, createTRPCContext } from "@acme/api"

import type { TRPCQueryOptions } from "@trpc/tanstack-react-query"
import { createQueryClient } from "@/lib/query-client"

// NOTE: Create a stable getter for the query client that will
// return the same client during the same request.
export const getQueryClient = cache(createQueryClient)

export const api = createTRPCOptionsProxy({
  // eslint-disable-next-line @typescript-eslint/await-thenable
  ctx: await createTRPCContext({}),
  router: appRouter,
  queryClient: getQueryClient,
})

// eslint-disable-next-line @typescript-eslint/await-thenable
export const caller = createCaller(await createTRPCContext({}))

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  )
}

// TODO: Fix this horribly unsafe type hack fuckery
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient()
  if (queryOptions.queryKey[1]?.type === "infinite") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    void queryClient.prefetchInfiniteQuery(queryOptions as any)
  } else {
    void queryClient.prefetchQuery(queryOptions)
  }
}

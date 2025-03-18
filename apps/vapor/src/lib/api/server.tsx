import "server-only"

import { cache } from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import {
  createTRPCOptionsProxy,
  TRPCQueryOptions,
} from "@trpc/tanstack-react-query"

import { appRouter, createCaller, createTRPCContext } from "@acme/api"

import { createQueryClient } from "@/lib/query-client"

// NOTE:
// Create a stable getter for the query client that
// will return the same client during the same request.
export const getQueryClient = cache(createQueryClient)

export const api = createTRPCOptionsProxy({
  ctx: await createTRPCContext({}),
  router: appRouter,
  queryClient: getQueryClient,
})

export const caller = createCaller(await createTRPCContext({}))

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  )
}
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient()
  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as any)
  } else {
    void queryClient.prefetchQuery(queryOptions)
  }
}

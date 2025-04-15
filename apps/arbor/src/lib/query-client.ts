import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query"
import SuperJSON from "superjson"

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,

        // When persisting queries, we want to set gcTime to
        // at least 24 hours due to hydration setting it at 5 mins
        gcTime: 1000 * 60 * 60 * 24,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  })

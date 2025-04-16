import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context: { queryClient, api } }) => {
    const auth = await queryClient.fetchQuery({
      ...api.auth.session.queryOptions(),
      staleTime: Infinity,
      gcTime: Infinity,
    })

    return { auth }
  },
})

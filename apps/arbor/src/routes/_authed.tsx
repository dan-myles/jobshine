import { createFileRoute, redirect } from "@tanstack/react-router"

import { authClient as authClient } from "@/lib/auth-client"

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context }) => {
    console.log("FETCHING SESSION")

    const query = await context.queryClient.fetchQuery({
      queryKey: ["session"],
      queryFn: () => authClient.getSession(),
      staleTime: Infinity,
    })

    console.log(query.data)

    // if (session.data === null) {
    //   throw redirect({ to: "/login" })
    // }

    return { auth: query.data }
  },
})

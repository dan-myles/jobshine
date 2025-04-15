import { createFileRoute, redirect } from "@tanstack/react-router"

import { authClient } from "@/lib/auth-client"

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context: { queryClient, api } }) => {
    const session = await queryClient.fetchQuery(
      api.auth.session.queryOptions(),
    )
    console.log("GOT ME A SESH >>>", session)

    // if (session === null) {
    //   throw redirect({ to: "/login" })
    // }

    return { auth: session }
  },
})

import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context: { session } }) => {
    if (!session) {
      return redirect({ to: "/login" })
    }
  },
})

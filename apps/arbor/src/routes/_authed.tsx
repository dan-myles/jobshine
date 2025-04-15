import { createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context: {auth } }) => {
    if (!auth) {
      throw new Error("Auth context is not available")
    }

  },
})

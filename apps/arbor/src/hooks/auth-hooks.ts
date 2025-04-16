import { useQueryClient } from "@tanstack/react-query"
import { useRouteContext, useRouter } from "@tanstack/react-router"

import { useAPI } from "@/lib/api-client"
import { authClient } from "@/lib/auth-client"

export function useAuth() {
  const api = useAPI()
  const router = useRouter()
  const queryClient = useQueryClient()

  async function signInEmail({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    const response = await authClient.signIn.email({
      email,
      password,
    })

    queryClient.invalidateQueries(api.auth.session.queryFilter())
    router.invalidate()
    return response
  }

  async function signOut() {
    const response = await authClient.signOut()
    queryClient.invalidateQueries(api.auth.session.queryFilter())
    router.invalidate()
    return response
  }

  return {
    signOut,
    signInEmail,
  }
}

export function useUser() {
  const { auth } = useRouteContext({
    from: "/_authed",
  })

  return auth?.user
}

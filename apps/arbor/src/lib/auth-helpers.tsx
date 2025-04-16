import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { toast } from "sonner"

import { authClient } from "./auth-client"

export function useAuthCacheAware() {
  const router = useRouter()
  const queryClient = useQueryClient()

  async function logout() {
    await authClient.signOut()
    queryClient.resetQueries({
      queryKey: ["session"],
    })
    router.invalidate()

    toast.success("Logged out successfully!")
    router.navigate({
      to: "/",
    })
  }

  async function login({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    const toastId = toast.loading("Logging in...")

    const { error } = await authClient.signIn.email({
      email,
      password,
    })

    if (error) {
      toast.error("There was an error logging in!", {
        description: error.message,
        id: toastId,
      })

      return
    }

    queryClient.resetQueries({ queryKey: ["session"] })
    toast.success("Welcome back!", {
      id: toastId,
    })
    router.navigate({
      to: "/dashboard",
    })
  }

  return {
    logout,
    login,
  }
}

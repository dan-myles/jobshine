import { createContext } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"

import { useAPI } from "@/lib/api-client"
import { authClient } from "@/lib/auth-client"

interface AuthContext {
  auth: typeof authClient.$Infer.Session | null | undefined
  signUpEmail: (args: {
    email: string
    password: string
    name: string
    callbackUrl?: string
  }) => ReturnType<typeof authClient.signUp.email>
  signInEmail: (args: {
    email: string
    password: string
    callbackUrl?: string
  }) => ReturnType<typeof authClient.signIn.email>
  signOut: () => ReturnType<typeof authClient.signOut>
}

export const AuthProviderContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const api = useAPI()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: session } = useQuery(api.auth.session.queryOptions())

  function signUpEmail(args: {
    email: string
    password: string
    name: string
    callbackUrl?: string
  }) {
    const res = authClient.signUp.email({
      ...args,
    })
    router.invalidate()
    queryClient.invalidateQueries(api.auth.session.queryFilter())
    return res
  }

  function signInEmail(args: {
    email: string
    password: string
    callbackUrl?: string
  }) {
    const res = authClient.signIn.email({
      ...args,
    })
    router.invalidate()
    queryClient.invalidateQueries(api.auth.session.queryFilter())
    return res
  }

  function signOut() {
    const res = authClient.signOut()
    router.invalidate()
    queryClient.invalidateQueries(api.auth.session.queryFilter())
    return res
  }

  return (
    <AuthProviderContext.Provider
      value={{ auth: session ?? null, signUpEmail, signInEmail, signOut }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}

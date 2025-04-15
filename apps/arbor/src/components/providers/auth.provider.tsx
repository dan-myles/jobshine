import { createContext } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

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
  const queryClient = useQueryClient()
  const { data: query } = useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession(),
    staleTime: Infinity,
  })

  function signUpEmail(args: {
    email: string
    password: string
    name: string
    callbackUrl?: string
  }) {
    queryClient.invalidateQueries({
      queryKey: ["session"],
    })
    return authClient.signUp.email({
      ...args,
    })
  }

  function signInEmail(args: {
    email: string
    password: string
    callbackUrl?: string
  }) {
    queryClient.invalidateQueries({
      queryKey: ["session"],
    })
    return authClient.signIn.email({
      ...args,
    })
  }

  function signOut() {
    queryClient.invalidateQueries({
      queryKey: ["session"],
    })
    return authClient.signOut()
  }

  return (
    <AuthProviderContext.Provider
      value={{ auth: query?.data ?? null, signUpEmail, signInEmail, signOut }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}

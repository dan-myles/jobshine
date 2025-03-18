"use client"

import { createContext } from "react"

import { auth } from "@/lib/auth-client"

type User = typeof auth.$Infer.Session.user
type Session = typeof auth.$Infer.Session.session

type AuthContextType = {
  user: User | undefined
  session: Session | undefined
  isSignedIn: boolean
  signIn: typeof auth.signIn
  signUp: typeof auth.signUp
  signOut: typeof auth.signOut
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  session: undefined,
  isSignedIn: false,
  signIn: auth.signIn,
  signUp: auth.signUp,
  signOut: auth.signOut,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data } = auth.useSession()
  const isSignedIn = data?.session ? true : false
  const user = data?.user === undefined ? undefined : data.user
  const session = data?.session === undefined ? undefined : data.session

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isSignedIn,
        signIn: auth.signIn,
        signUp: auth.signUp,
        signOut: auth.signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

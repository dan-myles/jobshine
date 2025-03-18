"use client"

import { createContext, useEffect, useState } from "react"

import { authClient } from "@/lib/auth-client"

type User = typeof authClient.$Infer.Session.user
type Session = typeof authClient.$Infer.Session.session

type AuthContextType = {
  user: User | undefined
  session: Session | undefined
  isSignedIn: boolean
  signIn: typeof authClient.signIn
  signUp: typeof authClient.signUp
  signOut: typeof authClient.signOut
}

export const AuthContext = createContext<AuthContextType>({
  session: undefined,
  user: undefined,
  isSignedIn: false,
  signIn: authClient.signIn,
  signUp: authClient.signUp,
  signOut: authClient.signOut,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [session, setSession] = useState<Session | undefined>(undefined)
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await authClient.getSession()

      if (error) {
        console.error("Error fetching session:", error)
        return
      }

      if (!data) {
        return
      }

      setSession(data.session)
      setUser(data.user)
      setIsSignedIn(true)
    }

    fetchSession()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isSignedIn,
        signIn: authClient.signIn,
        signUp: authClient.signUp,
        signOut: authClient.signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

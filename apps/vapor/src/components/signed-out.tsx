"use client"

import { useAuth } from "@/hooks/use-auth"

type SignedOutProps = {
  children?: React.ReactNode
}

export function SignedOut({ children }: SignedOutProps) {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return null
  }

  return <>{children}</>
}

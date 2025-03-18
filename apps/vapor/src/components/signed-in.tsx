"use client"

import { useAuth } from "@/hooks/use-auth"

type SignedInProps = {
  children?: React.ReactNode
}

export function SignedIn({ children }: SignedInProps) {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return null
  }

  return <>{children}</>
}

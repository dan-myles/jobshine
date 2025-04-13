"use client"

import { auth } from "@/lib/auth-client"

type SignedInProps = {
  children?: React.ReactNode
}

export function SignedIn({ children }: SignedInProps) {
  const { data } = auth.useSession()

  if (!data?.session) {
    return null
  }

  return <>{children}</>
}

"use client"

import { auth } from "@/lib/auth-client"

type SignedOutProps = {
  children?: React.ReactNode
}

export function SignedOut({ children }: SignedOutProps) {
  const { data } = auth.useSession()

  if (!!data?.session) {
    return null
  }

  return <>{children}</>
}

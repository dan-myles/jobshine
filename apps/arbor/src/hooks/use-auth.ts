import { use } from "react"

import { AuthProviderContext } from "@/components/providers/auth.provider"

export function useAuth() {
  const context = use(AuthProviderContext)

  if (context === null)
    throw new Error("useAuth must be used within an AuthProvider")

  return context
}

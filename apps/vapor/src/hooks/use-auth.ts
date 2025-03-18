"use client"

import { use } from "react"

import { AuthContext } from "@/components/providers/auth.provider"

export function useAuth() {
  return use(AuthContext)
}

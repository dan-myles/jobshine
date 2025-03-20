"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth-client"

export default function Page() {
  const { data, error } = auth.useSession()
  console.log(data, error)

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div>
  )
}

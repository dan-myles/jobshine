"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Icons } from "@/components/icons"
import { Mark } from "@/components/mark"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/lib/auth-client"

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await auth.signIn.email({
      email,
      password,
    })

    if (error) {
      toast.error("There was an error signing in.", {
        description: error.message,
      })
    }

    if (!error) {
      router.push("/dashboard")
    }
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Link href="/">
        <Mark />
      </Link>
      <div
        className="dark:bg-background w-full max-w-md rounded-xl shadow-md ring-1 ring-black/5
          dark:transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]
          dark:[border:1px_solid_rgba(255,255,255,.1)]"
      >
        <form onSubmit={handleSubmit} className="p-7 sm:p-11">
          <h1 className="mt-2 text-xl font-medium">Welcome back!</h1>
          <p className="mt-1 text-sm/5 text-gray-600 dark:text-gray-300">
            Sign in to your account to continue.
          </p>
          <div className="mt-8 space-y-3">
            <Label className="text-sm/5 font-medium">Email</Label>
            <Input
              required
              autoFocus
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border border-gray-200 px-[calc(theme(spacing.2)-1px)]
                py-[calc(theme(spacing[1.5])-1px)] text-base/6 shadow ring-1 ring-black/10
                data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black
                sm:text-sm/6"
            />
          </div>
          <div className="mt-8 space-y-3">
            <Label className="text-sm/5 font-medium">Password</Label>
            <Input
              required
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border border-gray-200 px-[calc(theme(spacing.2)-1px)]
                py-[calc(theme(spacing[1.5])-1px)] text-base/6 shadow ring-1 ring-black/10
                data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black
                sm:text-sm/6"
            />
          </div>
          <div className="mt-8">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>

          <div className="mt-8 border-b border-gray-200 dark:border-gray-700/50" />

          <div className="mt-8 flex flex-row items-center justify-center space-x-2">
            <Button variant="ghost" size="sm" className="mt-2 px-12 py-6">
              <Icons.google className="h-6 w-6" />
              Sign in with Google
            </Button>
            <Button variant="ghost" size="sm" className="mt-2 px-12 py-6">
              <Icons.github className="h-6 w-6" />
              Sign in with Github
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}

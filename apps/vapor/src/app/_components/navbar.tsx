"use client"

import Link from "next/link"
import { toast } from "sonner"

import { SignedIn, SignedOut } from "@/components/auth"
import { Mark } from "@/components/mark"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth-client"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex w-full bg-transparent shadow-md backdrop-blur-xl">
      <div className="flex flex-grow items-center justify-between p-4 px-6">
        <div className="flex items-center">
          <Mark />
        </div>

        <div className="text-md hidden w-full items-center justify-center gap-6 font-medium md:flex">
          <Link
            href="/#product"
            className="hover:text-primary transition-colors"
          >
            Product
          </Link>
          <Link href="/#about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </div>

        <SignedOut>
          <div className="text-md flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="text-md flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => {
                toast.success("Logging out...")
                auth.signOut().catch(console.error)
              }}
            >
              Logout
            </Button>
            <Link href="/dashboard">
              <Button variant="default" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        </SignedIn>
      </div>
    </nav>
  )
}

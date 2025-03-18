"use client"

import Link from "next/link"

import { SignedIn } from "@/components/signed-in"
import { SignedOut } from "@/components/signed-out"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-transparent px-6 py-4 shadow-md backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-3xl font-bold">
            Jobshine
          </Link>
        </div>

        <div className="text-md hidden items-center gap-6 font-medium md:flex">
          <Link
            href="/product"
            className="hover:text-primary transition-colors"
          >
            Product
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="/pricing"
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
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Button size="sm" variant="ghost">
              Logout
            </Button>
          </div>
        </SignedIn>
      </div>
    </nav>
  )
}


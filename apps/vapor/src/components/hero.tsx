"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { SignedIn } from "@/components/signed-in"
import { SignedOut } from "@/components/signed-out"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HeroProps = {
  className?: string
}

export function Hero({ className }: HeroProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <motion.h1
        className="text-4xl leading-tight font-bold sm:text-5xl md:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Build amazing apps <br />
        <span className="text-primary">faster than ever</span>
      </motion.h1>

      <motion.p
        className="text-muted-foreground max-w-md text-lg md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Vapor helps you build and deploy serverless applications with ease. Get
        started in minutes with our intuitive platform.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <SignedIn>
          <Link href="/dashboard">
            <Button size="lg" className="rounded-full px-8">
              Dashboard
            </Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <Link href="/signup">
            <Button size="lg" className="rounded-full px-8">
              Get Started
            </Button>
          </Link>
        </SignedOut>
      </motion.div>
    </div>
  )
}


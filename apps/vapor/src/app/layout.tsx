import type { Metadata } from "next"
import { EB_Garamond } from "next/font/google"
import { Toaster } from "sonner"

import { APIProvider } from "@/components/providers/api.provider"
import { cn } from "@/lib/utils"

import "./globals.css"

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Acme App",
  description: "SST NEXT TS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <APIProvider>
        <html lang="en">
          <body
            className={cn(
              garamond.className,
              "border-border bg-background text-foreground antialiased",
            )}
          >
            {children}
          </body>
        </html>
        <Toaster />
      </APIProvider>
  )
}

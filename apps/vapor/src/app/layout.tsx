import type { Metadata } from "next"
import { EB_Garamond } from "next/font/google"
import { Toaster } from "sonner"

import { APIProvider } from "@/components/providers/api.provider"
import { ThemeProvider } from "@/components/providers/theme.provider"
import { cn } from "@/lib/utils"

import "./globals.css"


const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "JobShine",
  description: "SST NEXT TS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          garamond.className,
          "border-border text-foreground bg-background antialiased",
        )}
      >
        <APIProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange={true}
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </APIProvider>
      </body>
    </html>
  )
}

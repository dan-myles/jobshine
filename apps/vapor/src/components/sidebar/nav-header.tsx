"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icons } from "@/components/icons"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function NavHeader() {
  const pathname = usePathname()
  const parts = pathname?.split("/").filter(Boolean)

  const paths = parts?.filter((part) => {
    return (
      !part.includes("http") &&
      !part.includes("/") &&
      !part.includes("localhost") &&
      !part.includes(".com") &&
      part.length > 1
    )
  })

  const crumbs = paths?.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`
    const name = path
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())

    return { name, href }
  })

  return (
    <header
      className="h-[] flex shrink-0 items-center gap-2 border-b p-2 transition-[width,height]
        ease-linear
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]"
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <nav className="p-3">
          <ul className="flex flex-wrap gap-2">
            {crumbs?.map(({ name, href }, index) => (
              <li key={href} className="flex items-center gap-1 pr-5">
                <Link
                  href={href}
                  className="hover:text-accent-foreground text-md hover:underline"
                >
                  {name}
                </Link>
                {index < crumbs.length - 1 && (
                  <Icons.ChevronRight className="mt-0.5 -mr-4 ml-3 h-4 w-4" />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

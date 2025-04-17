import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

import { Icons } from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavSubFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setTheme } = useTheme()
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup {...props} className={className}>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* Theme Toggle */}
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <Icons.Sun className="mt-0.5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Icons.Moon className="absolute mt-0.5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span>Theme</span>
                  </Link>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Icons.Sun className="mt-0.5" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Icons.Moon className="mt-0.5" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Icons.Computer className="mt-0.5" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

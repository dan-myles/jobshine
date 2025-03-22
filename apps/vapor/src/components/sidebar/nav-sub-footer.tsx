"use client"

import * as React from "react"
import Link from "next/link"

import { Icons } from "@/components/icons"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "../theme-toggle"

export function NavSubFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <SidebarGroup {...props} className={className}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Icons.HelpCircle className="mt-0.5" />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <ThemeToggle />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

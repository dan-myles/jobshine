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

export function NavSecondary({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <SidebarGroup {...props} className={className}>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* Settings */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Icons.Settings2 className="mt-0.5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Help */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Icons.HelpCircle className="mt-0.5" />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

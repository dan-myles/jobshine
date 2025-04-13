"use client"

import Link from "next/link"
import { IconCirclePlusFilled } from "@tabler/icons-react"

import { Icons } from "@/components/icons"
import { Separator } from "@/components/ui/separator"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"

export function NavMain({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <SidebarGroup {...props} className={className}>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {/* Generation Link */}
          <Link href="/dashboard/generate">
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Generate New"
                className="bg-primary text-primary-foreground hover:bg-primary/90
                  hover:text-primary-foreground active:bg-primary/90
                  active:text-primary-foreground min-w-8 duration-200 ease-linear"
              >
                <IconCirclePlusFilled />
                <span>Generate New</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>

        <Separator className="my-2" />

        <SidebarMenu>
          <Label className="text-muted-foreground mb-2">Platform</Label>
          {/* Dashboard Link */}
          <Link href="/dashboard">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Dashboard">
                <Icons.CircleGauge className="mt-0.5" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>

          {/* Resumes Link */}
          <Link href="/dashboard/resumes">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Dashboard">
                <Icons.File className="mt-0.5" />
                <span>Resumes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>

          {/* Cover Letters Link */}
          <Link href="/dashboard/cover-letters">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Dashboard">
                <Icons.Mail className="mt-0.5" />
                <span>Cover Letters</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

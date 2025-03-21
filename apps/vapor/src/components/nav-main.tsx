"use client"

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

export function NavMain({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <SidebarGroup {...props} className={className}>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
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
        </SidebarMenu>
        <Separator className="my-2" />
        <SidebarMenu>
          {/* Dashbaord Link */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard">
              <Icons.CircleGauge />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Resumes Link */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard">
              <Icons.CircleGauge />
              <span>Resumes</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Cover Letters Link */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard">
              <Icons.CircleGauge />
              <span>Cover Letters</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

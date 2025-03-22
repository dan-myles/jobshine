import Link from "next/link"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Icons } from "@/components/icons"
import { Label } from "@/components/ui/label"

export function NavSecondary() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <Label className="text-muted-foreground mb-2">Calibrate</Label>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Icons.User className="mt-0.5" />
                <Label>Personal Information</Label>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Icons.Settings2 className="mt-0.5" />
                <Label>Cover Letter Settings</Label>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Icons.Settings className="mt-0.5" />
                <Label>Resume Settings</Label>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

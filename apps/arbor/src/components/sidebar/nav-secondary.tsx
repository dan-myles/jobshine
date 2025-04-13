import Link from "next/link"

import { Icons } from "@/components/icons"
import { Label } from "@/components/ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <Label className="text-muted-foreground mb-2">Calibrate</Label>
          <Link href="/dashboard/personal-information">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Personal Information">
                <Icons.User className="mt-0.5" />
                <span>Personal Information</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>

          <Link href="#">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Cover Letter Settings">
                <Icons.Settings2 className="mt-0.5" />
                <span>Cover Letter Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>

          <Link href="#">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Resume Settings">
                <Icons.Settings className="mt-0.5" />
                <span>Resume Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

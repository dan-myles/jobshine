import { Link } from "@tanstack/react-router"

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
          <Label className="text-muted-foreground mb-2">Settings</Label>
          <Link to="/dashboard/personal-information">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Personal Information">
                <Icons.User className="mt-0.5" />
                <span>Account</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>

          <Link to="/dashboard/resumes">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Personal Information">
                <Icons.CreditCard className="mt-0.5" />
                <span>Billing</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

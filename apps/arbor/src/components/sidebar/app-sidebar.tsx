import { Link } from "@tanstack/react-router"

import { Mark } from "@/components/mark"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient as authClient } from "@/lib/auth-client"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavSubFooter } from "./nav-sub-footer"
import { NavUser } from "./nav-user"

interface AppSidebarProps {
  auth: typeof authClient.$Infer.Session | null
}

export function AppSidebar(props: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" variant="floating">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <Link to="/">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <Mark className="text-2xl" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main */}
      <SidebarContent>
        <NavMain />
        <NavSecondary />
        <NavSubFooter className="mt-auto" />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={props.auth?.user!} />
      </SidebarFooter>
    </Sidebar>
  )
}

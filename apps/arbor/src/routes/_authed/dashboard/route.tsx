import { createFileRoute, Outlet } from "@tanstack/react-router"

import { AppSidebar, NavHeader } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const Route = createFileRoute("/_authed/dashboard")({
  component: Layout,
})

function Layout() {
  const { auth } = Route.useRouteContext()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar auth={auth} />
      <SidebarInset>
        <NavHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

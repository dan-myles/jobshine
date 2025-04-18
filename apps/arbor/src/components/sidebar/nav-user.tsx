import { Link, useRouter } from "@tanstack/react-router"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth, useUser } from "@/hooks/auth-hooks"
import { Icons } from "../icons"

export function NavUser() {
  const user = useUser()
  const router = useRouter()
  const { signOut } = useAuth()
  const { isMobile } = useSidebar()

  async function handleSignOut() {
    const toastId = toast.loading("Signing out...")
    await signOut()
    toast.success("Signed out successfully", {
      id: toastId,
    })
    router.navigate({ to: "/" })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent
                data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                {/* TODO: Add user avatar in better auth schema / implement with google login */}
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="rounded-lg">
                  {!user ? (
                    <Skeleton className="h-3 w-full" />
                  ) : (
                    user.name.slice(0, 3)
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {!user ? <Skeleton className="mb-2 h-3 w-full" /> : user.name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {!user ? <Skeleton className="h-3 w-full" /> : user.email}
                </span>
              </div>
              <Icons.EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* TODO: Add user avatar in better auth schema / implement with google login */}
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">
                    {!user ? (
                      <Skeleton className="h-3 w-full" />
                    ) : (
                      user.name.slice(0, 3)
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {!user ? (
                      <Skeleton className="mb-2 h-3 w-full" />
                    ) : (
                      user.name
                    )}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {!user ? <Skeleton className="h-3 w-full" /> : user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link
              to="/dashboard/account"
              >
              <DropdownMenuItem
                className="cursor-pointer"
              >
                <Icons.UserCircle />
                Account
              </DropdownMenuItem>
              </Link>
              <Link
              to="/dashboard/billing"
              >
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => toast("Coming soon!")}
              >
                <Icons.CreditCard />
                Billing
              </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleSignOut()}
            >
              <Icons.LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

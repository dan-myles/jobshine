"use client"

import { useRouter } from "next/navigation"
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"
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
import { auth } from "@/lib/auth-client"
import { Skeleton } from "../ui/skeleton"

export function NavUser() {
  const router = useRouter()
  const { isMobile } = useSidebar()
  const { data, error, isPending } = auth.useSession()

  if (error) {
    toast.error("There was an error loading your user profile!", {
      description: error.message,
    })
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
                  {isPending && <Skeleton className="h-3 w-full" />}
                  {!isPending && data?.user.name?.slice(0, 3)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {!isPending && data?.user.name}
                  {isPending && <Skeleton className="mb-2 h-3 w-full" />}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {!isPending && data?.user.email}
                  {isPending && <Skeleton className="h-3 w-full" />}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
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
                  {isPending && <Skeleton className="h-3 w-full" />}
                  {!isPending && data?.user.name?.slice(0, 3)}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {!isPending && data?.user.name}
                    {isPending && <Skeleton className="mb-2 h-3 w-full" />}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {!isPending && data?.user.email}
                    {isPending && <Skeleton className="h-3 w-full" />}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                auth.signOut().catch(console.error)
                router.push("/")
              }}
            >
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

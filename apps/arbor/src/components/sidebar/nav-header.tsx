import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function NavHeader() {
  return (
    <header
      className="h-[] flex shrink-0 items-center gap-2 border-b p-2 transition-[width,height]
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]"
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <nav className="p-3">
          <ul className="flex flex-wrap gap-2">
            Dashboard
          </ul>
        </nav>
      </div>
    </header>
  )
}

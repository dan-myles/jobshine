import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router"

import { APIProvider } from "@/components/providers/api.provider"
import { ThemeProvider } from "@/components/providers/theme.provider"
import globals from "@/styles/globals.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: globals,
      },
    ],
  }),
  component: Root,
})

function Root() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="font-garamond antialiased">
        <APIProvider>
          <ThemeProvider defaultTheme="light">
            <Outlet />
          </ThemeProvider>
        </APIProvider>
        <Scripts />
      </body>
    </html>
  )
}

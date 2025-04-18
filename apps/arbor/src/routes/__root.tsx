import { AuthQueryProvider as AuthProvider } from "@daveyplate/better-auth-tanstack"
import { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
  createRootRouteWithContext,
  ErrorComponent,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { TRPCOptionsProxy } from "@trpc/tanstack-react-query"
import { Toaster } from "sonner"

import { AppRouter } from "@jobshine/api"

import { APIProvider } from "@/components/providers/api.provider"
import { ThemeProvider } from "@/components/providers/theme.provider"
import { authClient } from "@/lib/auth-client"
import globals from "@/styles/globals.css?url"

export interface RouterCtx {
  user: typeof authClient.$Infer.Session.user | null | undefined
  session: typeof authClient.$Infer.Session.session | null | undefined
  api: TRPCOptionsProxy<AppRouter>
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterCtx>()({
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
        title: "Jobshine",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: globals,
      },
    ],
  }),
  errorComponent: (error) => <ErrorComponent error={error} />,
  component: Root,
  beforeLoad: async ({ context: { queryClient, api } }) => {
    const auth = await queryClient.fetchQuery({
      ...api.auth.session.queryOptions(),
      staleTime: Infinity,
      gcTime: Infinity,
    })

    return { user: auth?.user, session: auth?.session }
  },
})

function Root() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="font-garamond antialiased">
        <ThemeProvider>
          <APIProvider>
            <AuthProvider>
              {children}
              <Toaster />
              <ReactQueryDevtools buttonPosition="top-right" />
              <TanStackRouterDevtools position="bottom-right" />
            </AuthProvider>
          </APIProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}

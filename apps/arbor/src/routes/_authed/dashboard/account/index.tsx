import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard/account/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/dashboard/account/"!</div>
}

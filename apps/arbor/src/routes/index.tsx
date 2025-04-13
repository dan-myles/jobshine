import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { useAPI } from "@/lib/api-client"

export const Route = createFileRoute("/")({
  component: Page,
})

function Page() {
  const api = useAPI()
  const { data } = useQuery(api.test.hello.queryOptions())

  return (
    <main>
      <h1 className="bg-red-200">Welcome to TanStack Start</h1>
      {/* {data} */}
      URL: {import.meta.env.PUBLIC_BASE_URL}
    </main>
  )
}

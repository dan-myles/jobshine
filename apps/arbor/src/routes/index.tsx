import { createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/")({
  component: Page,
})

function Page() {
  return (
    <main>
      <h1 className="bg-red-200">Welcome to TanStack Start</h1>
      URL: {import.meta.env.PUBLIC_BASE_URL}
    </main>
  )
}

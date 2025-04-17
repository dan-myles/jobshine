import { createFileRoute } from "@tanstack/react-router"

import { ResumeBuilder } from "./-components/resume-builder"

export const Route = createFileRoute(
  "/_authed/dashboard/personal-information/",
)({
  component: Page,
  loader: async ({ context: { queryClient, api } }) => {
    await queryClient.ensureQueryData(api.resume.readLatest.queryOptions())
  },
})

function Page() {
  return (
    <main className="h-full w-full items-center justify-center p-4">
      <ResumeBuilder />
    </main>
  )
}

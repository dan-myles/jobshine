import { createFileRoute } from "@tanstack/react-router"

import { GenerateForm } from "./-components/generate-form"
import { ResumeOptions } from "./-components/resume-options"

export const Route = createFileRoute("/_authed/dashboard/generate/")({
  component: Page,
})

function Page() {
  return (
    <main className="flex h-full w-full flex-col gap-4 p-4 md:flex-row">
      <section className="h-full flex-none md:w-1/3">
        <ResumeOptions />
      </section>
      <section className="flex-grow">
        <GenerateForm />
      </section>
    </main>
  )
}

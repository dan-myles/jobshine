import { api, HydrateClient, prefetch } from "@/lib/api/server"
import { ResumeBuilder } from "./_components/resume-builder"

export default function Page() {
  // prefetch(api.resume.get.queryOptions())

  // TODO: Add a suspense and error boundary while hydrating client
  return (
    <HydrateClient>
      <div className="h-full w-full items-center justify-center p-4">
        <ResumeBuilder />
      </div>
    </HydrateClient>
  )
}

import { GenerateForm } from "./_components/generate-form"
import { ResumeOptions } from "./_components/resume-options"

export default function Page() {
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

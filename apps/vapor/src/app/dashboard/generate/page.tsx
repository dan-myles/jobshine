import { GenerateForm } from "./_components/generate-form"

export default function Page() {
  return (
    <main className="flex h-full w-full flex-col gap-4 p-4 md:flex-row">
      <section className="flex-grow">
        <GenerateForm />
      </section>

      <section
        className="bg-muted/50 flex w-[655px] flex-col items-center justify-center rounded-md
          shadow-md"
      >
        <h2>Your Resume will be generated here.</h2>
      </section>
    </main>
  )
}

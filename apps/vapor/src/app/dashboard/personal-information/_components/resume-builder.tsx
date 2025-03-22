import { ResumeForm } from "./resume-form"

export function ResumeBuilder() {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form Section */}
        <div>
          <ResumeForm />
        </div>

        {/* Preview Section */}
        <div className="h-full">
          <div
            className="bg-muted/30 border-muted flex h-full min-h-[600px] flex-col items-center
              justify-center rounded-lg border p-6"
          >
            <h3 className="text-muted-foreground mb-2 text-xl font-medium">
              Resume Preview
            </h3>
            <p className="text-muted-foreground text-center">
              Your resume preview will appear here as you fill out the form.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

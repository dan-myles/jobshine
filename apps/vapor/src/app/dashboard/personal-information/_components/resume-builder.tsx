"use client"

import { ResumeForm } from "./resume-form"
import { ResumeViewer } from "./resume-viewer"


export function ResumeBuilder() {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ResumeForm />
        <ResumeViewer />
      </div>
    </div>
  )
}

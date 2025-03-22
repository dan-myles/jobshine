"use client"

import dynamic from "next/dynamic"

import { ResumeTemplate_001 } from "@acme/templates"

import { useResumeData } from "@/stores/resume-store"
import { ResumeForm } from "./resume-form"

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)

export function ResumeBuilder() {
  const resumeData = useResumeData()

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form Section */}
        <div>
          <ResumeForm />
        </div>

        {/* Preview Section */}
        <PDFViewer className="sticky top-10 h-full max-h-[88vh] min-h-[88vh] w-full rounded-lg shadow-lg">
          <ResumeTemplate_001 resume={resumeData} />
        </PDFViewer>
      </div>
    </div>
  )
}

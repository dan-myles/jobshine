"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

import { ResumeTemplate_001 } from "@acme/templates"

import { Skeleton } from "@/components/ui/skeleton"
import { useResumeData } from "@/stores/resume-store"

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="bg-muted-foreground/20 border-muted h-full min-h-[88vh] w-full" />
    ),
  },
)

export function ResumeViewer() {
  const resumeData = useResumeData()
  const [key, setKey] = useState(0)

  // Update key when resumeData changes to force PDFViewer remount
  useEffect(() => {
    setKey((prev) => prev + 1)
  }, [resumeData])

  function PDFViewerComponent() {
    return (
      <PDFViewer
        showToolbar={false}
        className="h-full max-h-[88vh] min-h-[88vh] w-full rounded-md bg-gray-600 p-0.5 shadow-lg"
      >
        <ResumeTemplate_001 resume={resumeData} />
      </PDFViewer>
    )
  }

  return (
    <div
      key={key}
      className="sticky top-10 max-h-[88vh] min-h-[88vh] w-full"
    >
      <PDFViewerComponent />
      <div className="text-muted-foreground p-1 text-sm">
        *This is the default template. Other templates are available when
        generating a resume.
      </div>
    </div>
  )
}

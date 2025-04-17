import { use, useEffect, useState } from "react"
import dynamic from "next/dynamic"

import { ResumeTemplate_001 } from "@jobshine/templates"

import { Skeleton } from "@/components/ui/skeleton"
import { ResumeContext } from "./resume-builder"

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
  const { resumeData } = use(ResumeContext)
  const [key, setKey] = useState(0)

  // TODO: Find a way to stop this from re-rendering when the state update is the exact same
  useEffect(() => {
    setKey((prev) => prev + 1)
  }, [resumeData])

  function PDFViewerComponent() {
    return (
      <PDFViewer
        showToolbar={false}
        className="h-full max-h-[88vh] min-h-[88vh] w-full rounded-md bg-gray-600 p-0.5 shadow-lg"
      >
        {resumeData && <ResumeTemplate_001 resume={resumeData} />}
      </PDFViewer>
    )
  }

  return (
    <div key={key} className="sticky top-10 max-h-[88vh] min-h-[88vh] w-full">
      <PDFViewerComponent />
      <div className="text-muted-foreground p-1 text-sm">
        *This is the default template. Other templates are available when
        generating a resume.
      </div>
    </div>
  )
}

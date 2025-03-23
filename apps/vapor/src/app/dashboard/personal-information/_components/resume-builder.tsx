"use client"

import { useQuery } from "@tanstack/react-query"

import { useAPI } from "@/lib/api/client"
import { useResumeData, useUpdateResume } from "@/stores/resume-store"
import { ResumeForm } from "./resume-form"
import { ResumeViewer } from "./resume-viewer"

export function ResumeBuilder() {
  const api = useAPI()
  const { data, isPending } = useQuery(api.resume.get.queryOptions())
  const updateResume = useUpdateResume()
  const resumeData = useResumeData()


  // if (data) {
  //   updateResume(data)
  // }

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {!isPending && data && <ResumeForm resumeData={resumeData} />}
        {!isPending && <ResumeViewer />}
      </div>
    </div>
  )
}

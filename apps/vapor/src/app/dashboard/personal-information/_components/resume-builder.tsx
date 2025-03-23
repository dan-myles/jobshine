"use client"

import { createContext, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { Resume } from "@acme/validators"

import { useAPI } from "@/lib/api/client"
import { ResumeForm } from "./resume-form"
import { ResumeViewer } from "./resume-viewer"

type ResumeContext = {
  resumeData: Resume | undefined
  isPending: boolean
  setResumeData: (resumeData: Resume) => void
}

export const ResumeContext = createContext<ResumeContext>({} as ResumeContext)

export function ResumeBuilder() {
  const api = useAPI()
  const { data, isPending } = useQuery(api.resume.read.queryOptions())
  const [resumeData, setResumeData] = useState<Resume | undefined>(undefined)
  const [isLoading, setisLoading] = useState(true)

  // TODO: Find a way to stop this from re-rendering when the state update is the exact same
  // Also refer to resume-viewer.tsx line 25
  useEffect(() => {
    setResumeData(data as Resume)
    setisLoading(isPending)
  }, [data, isPending])

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ResumeContext.Provider
          value={{ resumeData, isPending: isLoading, setResumeData }}
        >
          {!isLoading && <ResumeForm />}
          {!isLoading && <ResumeViewer />}
        </ResumeContext.Provider>
      </div>
    </div>
  )
}

import { createContext, useEffect, useState } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"

import type { Resume } from "@jobshine/validators"

import { Icons } from "@/components/icons"
import { useAPI } from "@/lib/api-client"
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
  const { data, isPending } = useSuspenseQuery(
    api.resume.readLatest.queryOptions(),
  )
  const [resumeData, setResumeData] = useState<Resume | undefined>(undefined)
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    if (data?.resume) {
      setResumeData(data.resume)
      setisLoading(isPending)
    }
  }, [data, isPending])

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative">
          <div className="bg-primary/20 absolute -inset-1 animate-pulse rounded-full blur-xl"></div>
          <Icons.Spinner className="text-primary h-16 w-16 animate-spin" />
        </div>
      </div>
    )
  }

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

import { z } from "zod"

import { ResumeTemplateIDSchema } from "./resume"

export const resumeGenerateSchema = z.object({
  jobDescription: z.string().min(1, "Please enter a job description."),
  documentType: z.enum(["resume", "cover-letter"]).default("resume"),
  resumeTemplate: ResumeTemplateIDSchema.optional(),
})

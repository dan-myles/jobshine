import { z } from "zod"

import { CoverLetterIDSchema } from "./cover-letter"
import { ResumeTemplateIDSchema } from "./resume"

export const generateSchema = z.object({
  jobDescription: z.string().min(1, "Please enter a job description."),
  documentType: z.enum(["resume", "cover-letter"]).default("resume"),
  resumeTemplate: ResumeTemplateIDSchema,
  coverLetterTemplate: CoverLetterIDSchema,
})

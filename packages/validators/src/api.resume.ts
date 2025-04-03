import { z } from "zod"

import { CoverLetterTemplateIdSchema } from "./cover-letter"
import { ResumeTemplateIdSchema } from "./resume"

export const generateSchema = z.object({
  jobDescription: z.string().min(1, "Please enter a job description."),
  documentType: z.enum(["resume", "cover-letter"]).default("resume"),
  resumeTemplate: ResumeTemplateIdSchema,
  coverLetterTemplate: CoverLetterTemplateIdSchema,
})

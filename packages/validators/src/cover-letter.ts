import { z } from "zod"

export const CoverLetterSchema = z.object({
  senderName: z.string(),
  senderAddress: z.string(),
  senderPhone: z.string(),
  senderEmail: z.string().email(),
  body: z.string(),
})

export const CoverLetterAIGenerationSchema = z.object({
  coverLetter: CoverLetterSchema,
  changes: z.array(z.string()),
})

export const CoverLetterTemplateIdSchema = z.enum(["001"])

export type CoverLetter = z.infer<typeof CoverLetterSchema>
export type CoverLetterId = z.infer<typeof CoverLetterTemplateIdSchema>
export type CoverLetterAIGeneration = z.infer<
  typeof CoverLetterAIGenerationSchema
>

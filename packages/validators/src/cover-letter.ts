import { z } from "zod"

const CoverLetterSchema = z.object({
  senderName: z.string(),
  senderAddress: z.string(),
  senderPhone: z.string(),
  senderEmail: z.string().email(),
  senderWebsite: z.string(),
  body: z.string(),
})

const CoverLetterIDSchema = z.enum(["001"])

type CoverLetter = z.infer<typeof CoverLetterSchema>
type CoverLetterId = z.infer<typeof CoverLetterIDSchema>

export {
  CoverLetterSchema,
  CoverLetterIDSchema,
  type CoverLetter,
  type CoverLetterId,
}

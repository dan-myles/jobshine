import { z } from "zod"

const CoverLetterIDSchema = z.enum(["001"])

type CoverLetterID = z.infer<typeof CoverLetterIDSchema>

export { CoverLetterIDSchema, type CoverLetterID }

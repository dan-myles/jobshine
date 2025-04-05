import { createOpenAI } from "@ai-sdk/openai"
import { TRPCError } from "@trpc/server"
import { generateText } from "ai"

import type { AIGeneration, Resume } from "@acme/validators"
import { AIGenerationSchema } from "@acme/validators"

import { sysPromptResume } from "./sys-prompt-resume"

const openai = createOpenAI({
  compatibility: "strict",
  apiKey: process.env.OPENAI_API_KEY,
})

export async function openai4oMini__generateResume(
  resume: Resume,
  jobDescription: string,
) {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt:
      sysPromptResume +
      `<jobDescription>${jobDescription}</jobDescription>` +
      `<resume>${JSON.stringify(resume)}</resume>`,
  })

  const json = JSON.parse(text ?? "{}") as AIGeneration
  const { data, error } = AIGenerationSchema.safeParse(json)

  if (error) {
    console.error("Error parsing an AI response >>> ", error)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "There was an error parsing the AI response.",
      cause: error,
    })
  }

  return data
}

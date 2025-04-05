import { createDeepSeek } from "@ai-sdk/deepseek"
import { TRPCError } from "@trpc/server"
import { generateText } from "ai"

import type { AIGeneration, Resume } from "@acme/validators"
import { AIGenerationSchema } from "@acme/validators"

import { sysPromptResume } from "./sys-prompt-resume"

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
})

export async function deepseekr1__generateResume(
  resume: Resume,
  jobDescription: string,
) {
  const { text } = await generateText({
    model: deepseek("deepseek-chat"),
    prompt:
      sysPromptResume +
      `<jobDescription>${jobDescription}</jobDescription>` +
      `<resume>${JSON.stringify(resume)}</resume>`,
  })

  const regex = /```json([\s\S]*?)```/g
  const match = regex.exec(text)
  const string = match?.[1]?.trim()
  const json = JSON.parse(string ?? "{}") as AIGeneration
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

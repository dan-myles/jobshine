import { createOpenAI } from "@ai-sdk/openai"
import { TRPCError } from "@trpc/server"
import { generateText } from "ai"

import type {
  CoverLetterAIGeneration,
  Resume,
  ResumeAIGeneration,
} from "@jobshine/validators"
import {
  CoverLetterAIGenerationSchema,
  ResumeAiGenerationSchema,
} from "@jobshine/validators"

import { sysPromptCoverLetter } from "./sys-prompt-cover-letter"
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

  const json = JSON.parse(text ?? "{}") as ResumeAIGeneration
  const { data, error } = ResumeAiGenerationSchema.safeParse(json)

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

export async function openai4oMini__generateCoverLetter(
  resume: Resume,
  jobDescription: string,
) {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt:
      sysPromptCoverLetter +
      `<jobDescription>${jobDescription}</jobDescription>` +
      `<resume>${JSON.stringify(resume)}</resume>`,
  })

  const json = JSON.parse(text ?? "{}") as CoverLetterAIGeneration
  const { data, error } = CoverLetterAIGenerationSchema.safeParse(json)

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

import { z } from "zod"

import { ResumeSchema, TemplateIDSchema } from "@acme/validators"

import type { TRPCRouterRecord } from "@trpc/server"
import { privateProcedure } from "../../trpc"
import { generate } from "./actions"

export const resumeRouter = {
  generate: privateProcedure
    .input(
      z.object({
        resume: ResumeSchema,
        templateID: TemplateIDSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await generate(input.resume, input.templateID, ctx)
    }),
} satisfies TRPCRouterRecord

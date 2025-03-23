import { z } from "zod"

import { Resume, ResumeSchema, TemplateIDSchema } from "@acme/validators"

import type { TRPCRouterRecord } from "@trpc/server"
import { privateProcedure } from "../../trpc"
import { generate, get, update } from "./actions"

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
  get: privateProcedure.query(async ({ ctx }) => {
    return await get(ctx)
  }),
  update: privateProcedure
    .input(
      z.object({
        resume: ResumeSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await update(input.resume, ctx)
    }),
} satisfies TRPCRouterRecord

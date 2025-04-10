import { generateSchema } from "@jobshine/validators"

import type { TRPCRouterRecord } from "@trpc/server"
import { privateProcedure } from "../../trpc"
import { generate } from "./ai.actions"

export const aiRouter = {
  generate: privateProcedure
    .input(generateSchema)
    .mutation(async ({ input, ctx }) => {
      return await generate(
        ctx.auth.user.id,
        input.documentType,
        input.resumeTemplate,
        input.coverLetterTemplate,
        input.jobDescription,
        ctx.db,
      )
    }),
} satisfies TRPCRouterRecord

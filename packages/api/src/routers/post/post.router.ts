import { z } from "zod"

import type { TRPCRouterRecord } from "@trpc/server"
import { publicProcedure } from "../../trpc"

export const postRouter = {
  all: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        response: `Hi ${input.name}, this is TRPC!`,
      }
    }),
} satisfies TRPCRouterRecord

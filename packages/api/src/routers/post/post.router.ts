import type { TRPCRouterRecord } from "@trpc/server"
import { publicProcedure } from "@/trpc"

export const postRouter = {
  all: publicProcedure.query(async () => {
    return {
      response: "Hi!",
    }
  }),
} satisfies TRPCRouterRecord

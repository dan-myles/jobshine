import type { TRPCRouterRecord } from "@trpc/server"

import { publicProcedure } from "../trpc"
import { aiRouter } from "./ai/ai.router"
import { resumeRouter } from "./resume/resume.router"

export const routes = {
  resume: resumeRouter,
  ai: aiRouter,
  test: {
    hello: publicProcedure.query(() => "Hello world!"),
  } satisfies TRPCRouterRecord,
}

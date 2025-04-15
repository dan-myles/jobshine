import { publicProcedure } from "../trpc"
import { aiRouter } from "./ai/ai.router"
import { resumeRouter } from "./resume/resume.router"

export const routes = {
  resume: resumeRouter,
  ai: aiRouter,
  test: {
    run: publicProcedure.query(() => {
      return "Hello from TRPC!"
    }),
  },
}

import { publicProcedure } from "../trpc"
import { aiRouter } from "./ai/ai.router"
import { authRouter } from "./auth/auth.router"
import { resumeRouter } from "./resume/resume.router"

export const routes = {
  ai: aiRouter,
  auth: authRouter,
  resume: resumeRouter,
  test: {
    run: publicProcedure.query(() => {
      return "Hello from TRPC!"
    }),
  },
}

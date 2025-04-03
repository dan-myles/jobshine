import { aiRouter } from "./ai/ai.router"
import { resumeRouter } from "./resume/resume.router"

export const routes = {
  resume: resumeRouter,
  ai: aiRouter,
}

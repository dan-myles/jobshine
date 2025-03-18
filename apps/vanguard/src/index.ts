import { Hono } from "hono"
import { handle } from "hono/aws-lambda"
import { cors } from "hono/cors"

import { auth } from "@acme/auth"

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL
  return `http://localhost:${process.env.PORT ?? 3000}`
}

const app = new Hono()
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", getBaseUrl()],
    credentials: true,
  }),
)
app.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw))

const handler = handle(app)
export { handler }

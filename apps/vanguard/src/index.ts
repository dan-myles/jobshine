import { Hono } from "hono"
import { handle } from "hono/aws-lambda"
import { cors } from "hono/cors"

import { auth } from "@acme/auth"

const app = new Hono()
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      `https://${process.env.BETTER_AUTH_BASE_URL}`,
    ],
    allowMethods: ["*"],
    allowHeaders: ["*"],
    credentials: true,
  }),
)
app.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw))

const handler = handle(app)
export { handler }

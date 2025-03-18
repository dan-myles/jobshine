import { Hono } from "hono"
import { handle } from "hono/aws-lambda"
import { cors } from "hono/cors"

import { auth } from "@acme/auth"
import { getBaseUrl } from "@acme/common"

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

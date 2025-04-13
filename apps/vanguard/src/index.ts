import { Hono } from "hono"
import { handle } from "hono/aws-lambda"
import { cors } from "hono/cors"

import { auth } from "@jobshine/auth"
import { getBaseUrl } from "@jobshine/common"

const app = new Hono()
app.use(
  "*",
  cors({
    origin: [
      getBaseUrl(),
    ],
    allowMethods: ["*"],
    allowHeaders: ["*"],
    credentials: true,
  }),
)
app.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw))

const handler = handle(app)
export { handler }

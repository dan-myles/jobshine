import { Hono } from "hono"
import { handle } from "hono/aws-lambda"

import { auth } from "@acme/auth"

const app = new Hono()
app.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw))

const handler = handle(app)
export { handler }

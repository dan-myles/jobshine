import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda"
import { APIGatewayProxyEvent, APIGatewayProxyHandlerV2 } from "aws-lambda"
import { Resource } from "sst"

import { appRouter, createTRPCContext } from "@acme/api"

/**
 * This is the primary function that trpc uses to start a tRPC API
 * server. It's the "glue" between your express app and your tRPC API.
 * It's main use case is for AWS Lambda and you will have to check the
 * docs for the adapter you use.
 **/
const lambda = awsLambdaRequestHandler({
  router: appRouter,
  createContext: createTRPCContext,
  responseMeta() {
    return {
      headers: {
        "Access-Control-Allow-Origin": getAccessControlAllowOrigin(
          Resource.App.stage,
        ),
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  },
})

export function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL
  return `http://localhost:${process.env.PORT ?? 3000}`
}

function getAccessControlAllowOrigin(stage: string) {
  if (stage !== "production") {
    return "*"
  } else {
    return getBaseUrl()
  }
}

const handler: APIGatewayProxyEvent | APIGatewayProxyHandlerV2 = async (
  event,
  context,
) => {
  if (event.rawPath.startsWith("/api/v1/trpc")) {
    event.rawPath = event.rawPath.slice("/api/v1/trpc".length)
    if (event.rawPath === "") {
      event.rawPath = "/"
    }
  }

  if (event.requestContext.http.path) {
    event.requestContext.http.path = event.rawPath
  }

  return lambda(event, context)
}

export { handler }

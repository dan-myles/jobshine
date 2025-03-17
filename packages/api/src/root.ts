import { routes } from "./routers"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter(routes)

/**
 * This is the primary type definitions that will be exported from this file
 * to be consumed by the tRPC runtime. It should be used with an `infer` type
 * to pre-populate the statically typed router.
 */
export type AppRouter = typeof appRouter

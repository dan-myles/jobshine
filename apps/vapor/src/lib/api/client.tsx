"use client"

import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"
import { createTRPCContext } from "@trpc/tanstack-react-query"

import { type AppRouter } from "@acme/api"

/**
 * Main client-side wrapper for the tRPC API.
 */
export const { useTRPC: useAPI, TRPCProvider: APIProvider } =
  createTRPCContext<AppRouter>()

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>

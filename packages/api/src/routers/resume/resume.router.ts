import { z } from "zod"

import {
  generateSchema,
  ResumeSchema,
} from "@acme/validators"

import type { TRPCRouterRecord } from "@trpc/server"
import { privateProcedure } from "../../trpc"
import { generate } from "./resume.actions"
import { ResumeRepository } from "./resume.repository"

export const resumeRouter = {
  create: privateProcedure
    .input(
      z.object({
        resume: ResumeSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ResumeRepository.upsert(
        ctx.auth.user.id,
        input.resume,
        ctx.db,
      )
    }),
  read: privateProcedure.query(async ({ ctx }) => {
    return await ResumeRepository.read(ctx.auth.user.id, ctx.db)
  }),
  readLatest: privateProcedure.query(async ({ ctx }) => {
    return await ResumeRepository.readLatest(ctx.auth.user.id, ctx.db)
  }),
  update: privateProcedure
    .input(
      z.object({
        resume: ResumeSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ResumeRepository.update(
        ctx.auth.user.id,
        input.resume,
        ctx.db,
      )
    }),
  upsert: privateProcedure
    .input(
      z.object({
        resume: ResumeSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ResumeRepository.upsert(
        ctx.auth.user.id,
        input.resume,
        ctx.db,
      )
    }),
  delete: privateProcedure.mutation(async ({ ctx }) => {
    return await ResumeRepository.delete(ctx.auth.user.id, ctx.db)
  }),
  generate: privateProcedure
    .input(generateSchema)
    .mutation(async ({ input, ctx }) => {
      return await generate(ctx.auth.user.id, input.resumeTemplate!, ctx.db)
    }),
} satisfies TRPCRouterRecord

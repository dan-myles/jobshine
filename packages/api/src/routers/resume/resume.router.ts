import ReactPDF from "@react-pdf/renderer"
import { z } from "zod"

import { ResumeTemplate_001 } from "@acme/templates"
import { ResumeSchema, TemplateIDSchema } from "@acme/validators"

import type { TRPCRouterRecord } from "@trpc/server"
import { privateProcedure } from "../../trpc"
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
    console.log("READING LATEST RESUME >>>")
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
  delete: privateProcedure.mutation(async ({ ctx }) => {
    return await ResumeRepository.delete(ctx.auth.user.id, ctx.db)
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
  generate: privateProcedure
    .input(
      z.object({
        resume: ResumeSchema,
        templateID: TemplateIDSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await ReactPDF.renderToFile(
        ResumeTemplate_001({ resume: input.resume }),
        input.templateID,
      )
    }),
} satisfies TRPCRouterRecord

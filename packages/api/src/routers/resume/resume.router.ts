import { z } from "zod"

import { Resume, ResumeSchema } from "@acme/validators"

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
    const resume = await ResumeRepository.read(ctx.auth.user.id, ctx.db)

    if (!resume) {
      return {
        fullName: "",
        location: "",
        email: "",
        phone: "",
        summary: "",
        websites: [],
        skills: [],
        experience: [],
        education: [],
        projects: [],
      } satisfies Resume
    }

    return resume
  }),
  readLatest: privateProcedure.query(async ({ ctx }) => {
    const resume = await ResumeRepository.readLatest(ctx.auth.user.id, ctx.db)

    if (!resume) {
      return {
        resume: {
          fullName: "",
          location: "",
          email: "",
          phone: "",
          summary: "",
          websites: [],
          skills: [],
          experience: [],
          education: [],
          projects: [],
        } as Resume,
      }
    }

    return resume
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
} satisfies TRPCRouterRecord

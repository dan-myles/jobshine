import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

import type { DB } from "@acme/db/client"
import type { Resume } from "@acme/validators"
import {
  resume,
  resumeEducation,
  resumeExperience,
  resumeExperienceBullet,
  resumeProject,
  resumeProjectBullet,
  resumeSkill,
  resumeWebsite,
} from "@acme/db/schema"

export const ResumeRepository = {
  async create(data: Resume, userId: string, db: DB) {
    const inserted = await db
      .insert(resume)
      .values({
        userId: userId,
        fullName: data.fullName,
        location: data.location,
        email: data.email,
        phone: data.phone,
        summary: data.summary,
      })
      .returning()
      .catch((err) => {
        console.error("Error inserting resume:", err)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create resume!",
          cause: err,
        })
      })

    const id = inserted?.at(0)?.id
    if (!inserted || !id) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to create resume!",
      })
    }

    await Promise.all([
      Promise.all(
        data.websites.map(async (website, index) => {
          return db
            .insert(resumeWebsite)
            .values({
              resumeId: id,
              index: index,
              url: website,
            })
            .catch((err) => {
              console.error("Error inserting resumeWebsite:", err)
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Failed to create resumeWebsite!",
                cause: err,
              })
            })
        }),
      ),

      Promise.all(
        data.skills.map(async (skill, index) => {
          return db
            .insert(resumeSkill)
            .values({ resumeId: id, index: index, skill })
            .catch((err) => {
              console.error("Error inserting resumeSkill:", err)
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Failed to create resumeSkill!",
                cause: err,
              })
            })
        }),
      ),

      Promise.all(
        data.education.map(async (education, index) => {
          return db
            .insert(resumeEducation)
            .values({
              resumeId: id,
              index: index,
              school: education.school,
              degree: education.degree,
              field: education.field,
              from: education.from,
              to: education.to,
              gpa: education.gpa ?? "",
            })
            .catch((err) => {
              console.error("Error inserting resumeEducation:", err)
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Failed to create resumeEducation!",
                cause: err,
              })
            })
        }),
      ),

      Promise.all(
        data.experience.map(async (experience, index) => {
          const inserted = await db
            .insert(resumeExperience)
            .values({
              resumeId: id,
              index: index,
              company: experience.company,
              title: experience.title,
              from: experience.from,
              to: experience.to,
              location: experience.location,
            })
            .returning({ id: resumeExperience.id })
            .catch((err) => {
              console.error("Error inserting resumeExperience:", err)
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Failed to create resumeExperience!",
                cause: err,
              })
            })

          const experienceId = inserted?.at(0)?.id
          if (!inserted || !experienceId) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Failed to create resumeExperience!",
            })
          }

          return Promise.all(
            experience.bullets.map(async (bullet, index) => {
              return db
                .insert(resumeExperienceBullet)
                .values({
                  resumeExperienceId: experienceId,
                  index: index,
                  bullet,
                })
                .catch((err) => {
                  console.error("Error inserting resumeExperienceBullet:", err)
                  throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to create resumeExperienceBullet!",
                    cause: err,
                  })
                })
            }),
          )
        }),
      ),

      Promise.all(
        data.projects.map(async (project, index) => {
          const inserted = await db
            .insert(resumeProject)
            .values({
              resumeId: id,
              index: index,
              name: project.name,
              link: project.link ?? "",
            })
            .returning({ id: resumeProject.id })
            .catch((err) => {
              console.error("Error inserting resumeProject:", err)
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Failed to create resumeProject!",
                cause: err,
              })
            })

          const projectId = inserted?.at(0)?.id
          if (!inserted || !projectId) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Failed to create resumeProject!",
            })
          }

          return Promise.all(
            project.bullets.map(async (bullet, index) => {
              return db
                .insert(resumeProjectBullet)
                .values({
                  resumeProjectId: projectId,
                  index: index,
                  bullet,
                })
                .catch((err) => {
                  console.error("Error inserting resumeProjectBullet:", err)
                  throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to create resumeProjectBullet!",
                    cause: err,
                  })
                })
            }),
          )
        }),
      ),
    ])

    return inserted.at(0)
  },

  async read(id: string, db: DB) {
    const found = await db
      .select()
      .from(resume)
      .where(eq(resume.id, id))
      .leftJoin(resumeWebsite, eq(resume.id, resumeWebsite.resumeId))
      .leftJoin(resumeSkill, eq(resume.id, resumeSkill.resumeId))
      .leftJoin(resumeEducation, eq(resume.id, resumeEducation.resumeId))
      .leftJoin(resumeExperience, eq(resume.id, resumeExperience.resumeId))
      .limit(1)
      .catch((err) => {
        console.error("Error reading resume:", err)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to read resume",
          cause: err,
        })
      })

    return found.at(0) || null
  },

  async update(id: string, data: Resume, db: DB) {
    const updated = await db
      .update(resume)
      .set(data)
      .where(eq(resume.id, id))
      .returning()
      .catch((err) => {
        console.error("Error updating resume:", err)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update resume",
          cause: err,
        })
      })

    return updated.at(0) || null
  },

  async delete(id: string, db: DB) {
    const deleted = await db
      .delete(resume)
      .where(eq(resume.id, id))
      .returning()
      .catch((err) => {
        console.error("Error deleting resume:", err)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete resume",
          cause: err,
        })
      })

    return deleted
  },

  async upsert(data: Resume, userId: string, db: DB) {
    const existing = await db
      .select()
      .from(resume)
      .where(eq(resume.userId, userId))
      .limit(1)
      .catch((err) => {
        console.error("Error upserting resume:", err)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upsert resume",
          cause: err,
        })
      })
      .then((res) => res.at(0))

    return existing
      ? this.update(existing.id, data, db)
      : this.create(data, userId, db)
  },
}

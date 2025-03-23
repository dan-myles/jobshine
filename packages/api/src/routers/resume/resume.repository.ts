import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

import type { DB } from "@acme/db/client"
import type { Bullet, Resume } from "@acme/validators"
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
  async create(userId: string, data: Resume, db: DB) {
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
        data.websites.map(async (website) => {
          return db
            .insert(resumeWebsite)
            .values({
              resumeId: id,
              index: website.index,
              url: website.url,
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
        data.skills.map(async (skill) => {
          return db
            .insert(resumeSkill)
            .values({ resumeId: id, index: skill.index, skill: skill.skill })
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
            experience.bullets.map(async (bullet) => {
              return db
                .insert(resumeExperienceBullet)
                .values({
                  resumeExperienceId: experienceId,
                  index: bullet.index,
                  bullet: bullet.bullet,
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
            project.bullets.map(async (bullet) => {
              return db
                .insert(resumeProjectBullet)
                .values({
                  resumeProjectId: projectId,
                  index: bullet.index,
                  bullet: bullet.bullet,
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

  // TODO: Uncombine correlated queries and Promise.all them
  async read(userId: string, db: DB) {
    const found = await db
      .select()
      .from(resume)
      .where(eq(resume.userId, userId))
      .limit(1)
      .catch(console.error)
      .then((res) => res?.at(0))

    if (!found) {
      throw new TRPCError({ code: "NOT_FOUND" })
    }

    const websites = await db
      .select()
      .from(resumeWebsite)
      .where(eq(resumeWebsite.resumeId, found.id))
      .then((res) =>
        res.map((row) => ({
          id: row.id,
          index: row.index,
          url: row.url,
        })),
      )
      .catch(console.error)
      .then((res) => (!res ? [] : res))

    const skills = await db
      .select()
      .from(resumeSkill)
      .where(eq(resumeSkill.resumeId, found.id))
      .then((res) =>
        res.map((row) => ({
          id: row.id,
          index: row.index,
          skill: row.skill,
        })),
      )
      .catch(console.error)
      .then((res) => (!res ? [] : res))

    const education = await db
      .select()
      .from(resumeEducation)
      .where(eq(resumeEducation.resumeId, found.id))
      .then((res) =>
        res.map((row) => ({
          id: row.id,
          index: row.index,
          school: row.school,
          degree: row.degree,
          field: row.field,
          from: row.from,
          to: row.to,
          gpa: row.gpa,
        })),
      )
      .catch(console.error)
      .then((res) => (!res ? [] : res))

    const experience = await db
      .select()
      .from(resumeExperience)
      .where(eq(resumeExperience.resumeId, found.id))
      .then((res) =>
        res.map((row) => ({
          id: row.id,
          index: row.index,
          company: row.company,
          title: row.title,
          from: row.from,
          to: row.to,
          location: row.location,
          bullets: [] as Bullet[],
        })),
      )
      .catch(console.error)
      .then((res) => (!res ? [] : res))

    for (const experienceItem of experience) {
      const experienceBullets = await db
        .select()
        .from(resumeExperienceBullet)
        .where(eq(resumeExperienceBullet.resumeExperienceId, experienceItem.id))
        .then((res) =>
          res.map((row) => ({ index: row.index, bullet: row.bullet })),
        )
        .catch(console.error)
        .then((res) => (!res ? [] : res))

      experienceItem.bullets = experienceBullets
    }

    const projects = await db
      .select()
      .from(resumeProject)
      .where(eq(resumeProject.resumeId, found.id))
      .then((res) =>
        res.map((row) => ({
          id: row.id,
          index: row.index,
          name: row.name,
          link: row.link,
          bullets: [] as Bullet[],
        })),
      )
      .catch(console.error)
      .then((res) => (!res ? [] : res))

    for (const project of projects) {
      const projectBullets = await db
        .select()
        .from(resumeProjectBullet)
        .where(eq(resumeProjectBullet.resumeProjectId, project.id))
        .then((res) =>
          res.map((row) => ({ index: row.index, bullet: row.bullet })),
        )
        .catch(console.error)
        .then((res) => (!res ? [] : res))

      project.bullets = projectBullets
    }

    return {
      fullName: found.fullName,
      location: found.location,
      email: found.email,
      phone: found.phone,
      summary: found.summary,
      websites: websites.map((website) => ({
        index: website.index,
        url: website.url,
      })),
      skills: skills.map((skill) => ({
        index: skill.index,
        skill: skill.skill,
      })),
      education: education.map((education) => ({
        index: education.index,
        school: education.school,
        degree: education.degree,
        field: education.field,
        from: education.from,
        to: education.to,
        gpa: education.gpa,
      })),
      experience: experience.map((experience) => ({
        index: experience.index,
        company: experience.company,
        title: experience.title,
        from: experience.from,
        to: experience.to,
        location: experience.location,
        bullets: experience.bullets.map((b) => ({
          index: b.index,
          bullet: b.bullet,
        })),
      })),
      projects: projects.map((project) => ({
        index: project.index,
        name: project.name,
        link: project.link,
        bullets: project.bullets.map((b) => ({
          index: b.index,
          bullet: b.bullet,
        })),
      })),
    } as Resume
  },

  async update(userId: string, data: Resume, db: DB) {
    const updated = await db
      .update(resume)
      .set(data)
      .where(eq(resume.userId, userId))
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

  async delete(userId: string, db: DB) {
    const deleted = await db
      .delete(resume)
      .where(eq(resume.userId, userId))
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

  async upsert( userId: string, data: Resume,  db: DB) {
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
      ? this.update(userId, data, db)
      : this.create(userId, data, db)
  },
}

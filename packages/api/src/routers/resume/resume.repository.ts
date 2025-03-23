import { eq, sql } from "drizzle-orm"

import type { DB } from "@acme/db/client"
import type { Resume } from "@acme/validators"
import { resume } from "@acme/db/schema"

export const ResumeRepository = {
  async create(userId: string, data: Resume, db: DB) {
    return await db.insert(resume).values({
      userId: userId,
      resume: data,
    })
  },

  async read(userId: string, db: DB) {
    return await db.select().from(resume).where(eq(resume.userId, userId))
  },

  async readLatest(userId: string, db: DB) {
    return await db
      .select()
      .from(resume)
      .where(eq(resume.userId, userId))
      .orderBy(sql`${resume.created_at} desc`)
      .limit(1)
      .then((res) => res.at(0))
  },

  async update(userId: string, data: Resume, db: DB) {
    return await db
      .update(resume)
      .set({
        resume: data,
      })
      .where(eq(resume.userId, userId))
  },

  async delete(userId: string, db: DB) {
    return await db.delete(resume).where(eq(resume.userId, userId))
  },

  async upsert(userId: string, data: Resume, db: DB) {
    const existing = await db
      .select()
      .from(resume)
      .where(eq(resume.userId, userId))
      .limit(1)

    if (existing.length > 0) {
      return await this.update(userId, data, db)
    } else {
      return await this.create(userId, data, db)
    }
  },
}

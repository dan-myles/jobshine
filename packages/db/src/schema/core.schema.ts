import { createId } from "@paralleldrive/cuid2"
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core"

import { user } from "./auth.schema"

export const post = pgTable("post", {
  id: text("id").primaryKey().$defaultFn(createId),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
})

export const resume = pgTable("resume", {
  id: text("id").primaryKey().$defaultFn(createId),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  summary: text("summary").notNull(),
})

export const resumeWebsite = pgTable("resume_website", {
  id: text("id").primaryKey().$defaultFn(createId),
  resumeId: text("resume_id")
    .notNull()
    .references(() => resume.id, { onDelete: "cascade" }),
  index: integer("index").notNull(),
  url: text("url").notNull(),
})

export const resumeSkill = pgTable("resume_skill", {
  id: text("id").primaryKey().$defaultFn(createId),
  resumeId: text("resume_id")
    .notNull()
    .references(() => resume.id, { onDelete: "cascade" }),
  index: integer("index").notNull(),
  skill: text("skill").notNull(),
})

export const resumeEducation = pgTable("resume_education", {
  id: text("id").primaryKey().$defaultFn(createId),
  resumeId: text("resume_id")
    .notNull()
    .references(() => resume.id, { onDelete: "cascade" }),
  index: integer("index").notNull(),
  school: text("school").notNull(),
  degree: text("degree").notNull(),
  field: text("field").notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  gpa: text("gpa").notNull(),
})

export const resumeExperience = pgTable("resume_experience", {
  id: text("id").primaryKey().$defaultFn(createId),
  resumeId: text("resume_id")
    .notNull()
    .references(() => resume.id, { onDelete: "cascade" }),
  index: integer("index").notNull(),
  company: text("company").notNull(),
  title: text("title").notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  location: text("location").notNull(),
})

export const resumeExperienceBullet = pgTable("resume_experience_bullet", {
  id: text("id").primaryKey().$defaultFn(createId),
  resumeExperienceId: text("resume_experience_id")
    .notNull()
    .references(() => resumeExperience.id, { onDelete: "cascade" }),
  index: integer("index").notNull(),
  bullet: text("bullet").notNull(),
})

export const resumeProject = pgTable("resume_project", {
  id: text("id").primaryKey().$defaultFn(createId),
  resumeId: text("resume_id")
    .notNull()
    .references(() => resume.id, { onDelete: "cascade" }),
  index: integer("index").notNull(),
  name: text("name").notNull(),
  link: text("link").notNull(),
})

export const resumeProjectBullet = pgTable("resume_project_bullet", {
  id: text("id").primaryKey().$defaultFn(createId),
  resumeProjectId: text("resume_project_id")
    .notNull()
    .references(() => resumeProject.id, { onDelete: "cascade" }),
  index: integer("index").notNull(),
  bullet: text("bullet").notNull(),
})

import { z } from "zod"

/*
 * Schemas
 * Used for generating resumes.
 */
export const BulletSchema = z.object({
  index: z.number(),
  bullet: z.string(),
})

export const SkillSchema = z.object({
  index: z.number(),
  skill: z.string(),
})

export const WebsiteSchema = z.object({
  index: z.number(),
  url: z.string(),
})

export const ProjectSchema = z.object({
  index: z.number(),
  name: z.string(),
  link: z.string(),
  bullets: BulletSchema.array(),
})

export const EducationSchema = z.object({
  index: z.number(),
  school: z.string(),
  degree: z.string(),
  field: z.string(),
  from: z.string(),
  to: z.string(),
  gpa: z.string(),
})

export const ExperienceSchema = z.object({
  index: z.number(),
  company: z.string(),
  title: z.string(),
  from: z.string(),
  to: z.string(),
  location: z.string(),
  bullets: BulletSchema.array(),
})

export const ResumeSchema = z.object({
  fullName: z.string(),
  location: z.string(),
  email: z.string(),
  phone: z.string(),
  summary: z.string(),
  websites: WebsiteSchema.array(),
  skills: SkillSchema.array(),
  experience: ExperienceSchema.array(),
  education: EducationSchema.array(),
  projects: ProjectSchema.array(),
})

export const ResumeTemplateIdSchema = z.enum(["001"])

export type Skill = z.infer<typeof SkillSchema>
export type Website = z.infer<typeof WebsiteSchema>
export type Bullet = z.infer<typeof BulletSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Education = z.infer<typeof EducationSchema>
export type Experience = z.infer<typeof ExperienceSchema>
export type Resume = z.infer<typeof ResumeSchema>
export type ResumeTemplateId = z.infer<typeof ResumeTemplateIdSchema>

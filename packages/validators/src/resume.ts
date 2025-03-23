import { z } from "zod"

/*
 * Schemas
 * Used for generating resumes.
 */
const BulletSchema = z.object({
  index: z.number(),
  bullet: z.string(),
})

const SkillSchema = z.object({
  index: z.number(),
  skill: z.string(),
})

const WebsiteSchema = z.object({
  index: z.number(),
  url: z.string(),
})

const ProjectSchema = z.object({
  index: z.number(),
  name: z.string(),
  link: z.string(),
  bullets: BulletSchema.array(),
})

const EducationSchema = z.object({
  index: z.number(),
  school: z.string(),
  degree: z.string(),
  field: z.string(),
  from: z.string(),
  to: z.string(),
  gpa: z.string(),
})

const ExperienceSchema = z.object({
  index: z.number(),
  company: z.string(),
  title: z.string(),
  from: z.string(),
  to: z.string(),
  location: z.string(),
  bullets: BulletSchema.array(),
})

const ResumeSchema = z.object({
  fullName: z.string(),
  location: z.string(),
  email: z.string().email(),
  phone: z.string(),
  summary: z.string(),
  websites: WebsiteSchema.array(),
  skills: SkillSchema.array(),
  experience: ExperienceSchema.array(),
  education: EducationSchema.array(),
  projects: ProjectSchema.array(),
})

const TemplateIDSchema = z.enum(["001"])

type Skill = z.infer<typeof SkillSchema>
type Website = z.infer<typeof WebsiteSchema>
type Bullet = z.infer<typeof BulletSchema>
type Project = z.infer<typeof ProjectSchema>
type Education = z.infer<typeof EducationSchema>
type Experience = z.infer<typeof ExperienceSchema>
type Resume = z.infer<typeof ResumeSchema>
type TemplateID = z.infer<typeof TemplateIDSchema>

export {
  ProjectSchema,
  EducationSchema,
  ExperienceSchema,
  ResumeSchema,
  TemplateIDSchema,
  type Skill,
  type Website,
  type Bullet,
  type Project,
  type Education,
  type Experience,
  type Resume,
  type TemplateID,
}

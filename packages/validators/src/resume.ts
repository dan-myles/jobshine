import { z } from "zod"

/*
 * Schemas
 * Used for generating resumes.
 */
const ProjectSchema = z.object({
  name: z.string(),
  bullets: z.string().array(),
  link: z.string(),
})

const EducationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  field: z.string(),
  from: z.string(),
  to: z.string(),
  gpa: z.string(),
})

const ExperienceSchema = z.object({
  company: z.string(),
  title: z.string(),
  from: z.string(),
  to: z.string(),
  location: z.string(),
  bullets: z.string().array(),
})

const ResumeSchema = z.object({
  fullName: z.string(),
  location: z.string(),
  email: z.string().email(),
  phone: z.string(),
  websites: z.string().array(),
  summary: z.string(),
  skills: z.string().array(),
  experience: ExperienceSchema.array(),
  education: EducationSchema.array(),
  projects: ProjectSchema.array(),
})

const TemplateIDSchema = z.enum(["001"])

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
  type Project,
  type Education,
  type Experience,
  type Resume,
  type TemplateID,
}

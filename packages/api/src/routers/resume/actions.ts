import ReactPDF from "@react-pdf/renderer"
import { TRPCError } from "@trpc/server"

import type { Resume, TemplateID } from "@acme/validators"
import { ResumeTemplate_001 } from "@acme/templates"

import type { TRPCContext } from "../../trpc"
import { ResumeRepository } from "./resume.repository"

const resume: Resume = {
  fullName: "John Smith",
  location: "Whoville, Kansas",
  email: "john@gmail.com",
  phone: "(111) 222 - 3344",
  websites: ["https://github.com/john", "https://linkedin.com/in/john"],
  summary:
    "Dedicated software engineer with 3+ years of experience developing web applications using modern JavaScript frameworks. Passionate about creating efficient, scalable, and user-friendly solutions. Strong problem-solving skills and experience working in agile environments.",
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "Next.js",
    "Firebase",
    "D3.js",
    "Git",
    "Docker",
    "AWS",
    "CI/CD",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "Redis",
    "Elasticsearch",
    "Kafka",
  ],
  experience: [
    {
      company: "Tech Company Inc.",
      title: "Software Engineer",
      from: "Jan 2021",
      to: "Present",
      location: "San Francisco, CA",
      bullets: [
        "Implemented responsive UI components with React and TypeScript. Implemented responsive UI components with React and TypeScript. Implemented responsive UI components with React and TypeScript.",
        "Collaborated with cross-functional teams to deliver features on time",
        "Optimized database queries resulting in 40% faster load times",
      ],
    },
    {
      company: "Startup Co.",
      title: "Software Engineering Intern",
      from: "May 2020",
      to: "Aug 2020",
      location: "Boston, MA",
      bullets: [
        "Built a data visualization dashboard using React and D3.js",
        "Participated in daily stand-ups and sprint planning",
        "Implemented user authentication system using Firebase",
      ],
    },
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      from: "2018",
      to: "2022",
      gpa: "3.8/4.0",
    },
  ],
  projects: [
    {
      name: "E-commerce Platform",
      bullets: [
        "Implemented product catalog, shopping cart, and payment processing",
        "Utilized Redux for state management and responsive design principles",
      ],
      link: "https://github.com/john/ecommerce",
    },
    {
      name: "Personal Portfolio Website",
      bullets: [
        "Designed and developed a responsive portfolio website",
        "Implemented dark/light mode and animations using Framer Motion",
        "Integrated a contact form with serverless functions",
      ],
      link: "",
    },
  ],
}

export async function update(resume: Resume, ctx: TRPCContext) {
  if (!ctx.auth) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  console.log("UPDATING TO DB!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  return await ResumeRepository.upsert(resume, ctx.auth.user.id, ctx.db)
}

export async function get(ctx: TRPCContext) {
  console.log("HELLO!")
  if (!ctx.auth) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const data = await ResumeRepository.read("gem11tbmxjemhybbxeyu7r5y", ctx.db)
  if (!data) {
    throw new TRPCError({ code: "NOT_FOUND" })
  }
  console.log(data)

  return resume
}

export async function generate(
  resume: Resume,
  templateID: TemplateID,
  ctx: TRPCContext,
) {
  switch (templateID) {
    case "001":
      return await generate_001(resume, ctx)
    default:
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid template ID",
      })
  }
}

async function generate_001(resume: Resume, ctx: TRPCContext) {
  try {
    await ReactPDF.renderToFile(ResumeTemplate_001({ resume }), "001.pdf")
    console.log("SAVED AT:  >>> ", process.cwd())
  } catch (error) {
    console.log(error)
  }
}

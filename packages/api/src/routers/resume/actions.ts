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
  websites: [
    { index: 0, url: "https://github.com/john" },
    { index: 1, url: "https://linkedin.com/in/john" }
  ],
  summary:
    "Dedicated software engineer with 3+ years of experience developing web applications using modern JavaScript frameworks. Passionate about creating efficient, scalable, and user-friendly solutions. Strong problem-solving skills and experience working in agile environments.",
  skills: [
    { index: 0, skill: "TypeScript" },
    { index: 1, skill: "React" },
    { index: 2, skill: "Node.js" },
    { index: 3, skill: "Express" },
    { index: 4, skill: "Next.js" },
    { index: 5, skill: "Firebase" },
    { index: 6, skill: "D3.js" },
    { index: 7, skill: "Git" },
    { index: 8, skill: "Docker" },
    { index: 9, skill: "AWS" },
    { index: 10, skill: "CI/CD" },
    { index: 11, skill: "MongoDB" },
    { index: 12, skill: "PostgreSQL" },
    { index: 13, skill: "MySQL" },
    { index: 14, skill: "SQLite" },
    { index: 15, skill: "Redis" },
    { index: 16, skill: "Elasticsearch" },
    { index: 17, skill: "Kafka" }
  ],
  experience: [
    {
      index: 0,
      company: "Tech Company Inc.",
      title: "Software Engineer",
      from: "Jan 2021",
      to: "Present",
      location: "San Francisco, CA",
      bullets: [
        {
          index: 0,
          bullet: "Implemented responsive UI components with React and TypeScript. Implemented responsive UI components with React and TypeScript. Implemented responsive UI components with React and TypeScript."
        },
        {
          index: 1,
          bullet: "Collaborated with cross-functional teams to deliver features on time"
        },
        {
          index: 2,
          bullet: "Optimized database queries resulting in 40% faster load times"
        }
      ],
    },
    {
      index: 1,
      company: "Startup Co.",
      title: "Software Engineering Intern",
      from: "May 2020",
      to: "Aug 2020",
      location: "Boston, MA",
      bullets: [
        {
          index: 0,
          bullet: "Built a data visualization dashboard using React and D3.js"
        },
        {
          index: 1,
          bullet: "Participated in daily stand-ups and sprint planning"
        },
        {
          index: 2,
          bullet: "Implemented user authentication system using Firebase"
        }
      ],
    },
  ],
  education: [
    {
      index: 0,
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
      index: 0,
      name: "E-commerce Platform",
      bullets: [
        {
          index: 0,
          bullet: "Implemented product catalog, shopping cart, and payment processing"
        },
        {
          index: 1,
          bullet: "Utilized Redux for state management and responsive design principles"
        }
      ],
      link: "https://github.com/john/ecommerce",
    },
    {
      index: 1,
      name: "Personal Portfolio Website",
      bullets: [
        {
          index: 0,
          bullet: "Designed and developed a responsive portfolio website"
        },
        {
          index: 1,
          bullet: "Implemented dark/light mode and animations using Framer Motion"
        },
        {
          index: 2,
          bullet: "Integrated a contact form with serverless functions"
        }
      ],
      link: "",
    },
  ],
};


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

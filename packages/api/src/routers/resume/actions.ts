import ReactPDF from "@react-pdf/renderer"
import { TRPCError } from "@trpc/server"

import type { Resume, TemplateID } from "@acme/validators"

import type { TRPCContext } from "../../trpc"
import { ResumeTemplate_001 } from "../../templates/template-001"

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

import fs from "node:fs"
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { createId } from "@paralleldrive/cuid2"
import ReactPDF from "@react-pdf/renderer"
import { TRPCError } from "@trpc/server"
import { Resource } from "sst"

import type { DB } from "@jobshine/db/client"
import type { DocumentType } from "@jobshine/db/schema"
import type {
  CoverLetter,
  CoverLetterId,
  Resume,
  ResumeTemplateId,
} from "@jobshine/validators"
import { CoverLetterTemplate_001, ResumeTemplate_001 } from "@jobshine/templates"
import { ResumeSchema } from "@jobshine/validators"

import { FileRepository } from "../file/file.repostiory"
import { ResumeRepository } from "../resume/resume.repository"
import { deepseekR1__generateResume } from "./model.deepseek-r1"
import {
  openai4oMini__generateCoverLetter,
  openai4oMini__generateResume,
} from "./model.openai-4o-mini"

export async function generate(
  userId: string,
  documentType: DocumentType,
  resumeTemplateId: ResumeTemplateId,
  coverLetterTemplateId: CoverLetterId,
  jobDescription: string,
  db: DB,
) {
  const data = await ResumeRepository.readLatest(userId, db)
  if (!data?.resume) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "No resume data found for user.",
    })
  }

  const parse = ResumeSchema.safeParse(data.resume)
  if (!parse.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "There was an error parsing user resume data.",
    })
  }

  switch (documentType) {
    case "resume":
      return await resume(
        userId,
        parse.data,
        resumeTemplateId,
        jobDescription,
        db,
      )
    case "cover-letter":
      return await coverLetter(
        userId,
        parse.data,
        coverLetterTemplateId,
        jobDescription,
        db,
      )
    default:
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid document type.",
      })
  }
}

async function coverLetter(
  userId: string,
  resume: Resume,
  coverLetterTemplateId: CoverLetterId,
  jobDescription: string,
  db: DB,
) {
  const { coverLetter: generated } = await openai4oMini__generateCoverLetter(
    resume,
    jobDescription,
  )

  let doc: React.JSX.Element | undefined = undefined

  switch (coverLetterTemplateId) {
    case "001":
      doc = CoverLetterTemplate_001({ coverLetter: generated })
      break
    default:
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid resume template ID.",
      })
  }

  await ReactPDF.renderToFile(doc, "doc.pdf")
  const file = fs.readFileSync("doc.pdf")
  const url = await s3(userId, file, "cover-letter", db)
  return { url }
}

async function resume(
  userId: string,
  resume: Resume,
  resumeTemplateId: ResumeTemplateId,
  jobDescription: string,
  db: DB,
) {
  const { resume: generated } = await openai4oMini__generateResume(
    resume,
    jobDescription,
  )

  let doc: React.JSX.Element | undefined = undefined

  switch (resumeTemplateId) {
    case "001":
      doc = ResumeTemplate_001({ resume: generated })
      break
    default:
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid resume template ID.",
      })
  }

  await ReactPDF.renderToFile(doc, "doc.pdf")
  const file = fs.readFileSync("doc.pdf")
  const url = await s3(userId, file, "resume", db)
  return { url }
}

async function s3(
  userId: string,
  file: Buffer<ArrayBufferLike>,
  documentType: DocumentType,
  db: DB,
) {
  const fileId = createId()
  const fileName = `${fileId}.pdf`

  try {
    const s3Client = new S3Client({})
    const key = `${documentType}s/${userId}/${fileName}`

    const command = new PutObjectCommand({
      Bucket: Resource.AcmeResumeBucket.name,
      Key: key,
      Body: file,
      ContentType: "application/pdf",
    })

    await s3Client.send(command)
    const downloadCommand = new GetObjectCommand({
      Bucket: Resource.AcmeResumeBucket.name,
      Key: key,
    })
    const downloadUrl = await getSignedUrl(s3Client, downloadCommand, {
      expiresIn: 3600,
    })
    fs.unlinkSync("doc.pdf")

    await FileRepository.create(
      userId,
      fileId,
      fileName,
      Resource.AcmeResumeBucket.name,
      key,
      `https://${Resource.AcmeResumeBucket.name}.s3.amazonaws.com/${key}`,
      documentType,
      "application/pdf",
      file.length,
      "SYSTEM",
      db,
    )

    console.log(
      `Saved ${documentType} for user=${userId} @ https://${Resource.AcmeResumeBucket.name}.s3.amazonaws.com/${key}`,
    )

    return downloadUrl
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error uploading file to S3:", error.message)
    }

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload resume to S3",
    })
  }
}

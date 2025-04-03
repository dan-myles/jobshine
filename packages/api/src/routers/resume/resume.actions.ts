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

import type { DB } from "@acme/db/client"
import type { Resume, ResumeTemplateId } from "@acme/validators"
import { ResumeTemplate_001 } from "@acme/templates"
import { ResumeSchema } from "@acme/validators"

import { FileRepository } from "../file/file.repostiory"
import { ResumeRepository } from "./resume.repository"

export async function generate(
  userId: string,
  templateId: ResumeTemplateId,
  db: DB,
) {
  const data = await ResumeRepository.readLatest(userId, db)
  if (!data || !data.resume) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "No resume data found for user.",
    })
  }

  const resume = ResumeSchema.safeParse(data.resume)
  if (!resume.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "There was an error parsing user resume data.",
    })
  }

  switch (templateId) {
    case "001":
      return await generate_001(userId, resume.data, db)
    default:
      throw new Error("Invalid template ID")
  }
}

async function generate_001(userId: string, resume: Resume, db: DB) {
  const fileId = createId()
  const fileName = `${fileId}.pdf`
  const doc = ResumeTemplate_001({ resume })
  await ReactPDF.renderToFile(doc, fileName)
  const file = fs.readFileSync(fileName)

  try {
    const s3Client = new S3Client({})
    const key = `resumes/${userId}/${fileName}`

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
    fs.unlinkSync(fileName)

    await FileRepository.create(
      userId,
      fileId,
      fileName,
      Resource.AcmeResumeBucket.name,
      key,
      `https://${Resource.AcmeResumeBucket.name}.s3.amazonaws.com/${key}`,
      "application/pdf",
      file.length,
      "SYSTEM",
      db,
    )

    console.log(
      `Generated PDF Resume for user=${userId} @ https://${Resource.AcmeResumeBucket.name}.s3.amazonaws.com/${key}`,
    )

    return {
      url: downloadUrl,
    }
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

import type { DB } from "@acme/db/client"
import type { DocumentType } from "@acme/db/schema"
import { and, desc, eq } from "@acme/db"
import { file } from "@acme/db/schema"

export const FileRepository = {
  async create(
    userId: string,
    fileId: string,
    fileName: string,
    bucketName: string,
    s3Key: string,
    s3Url: string,
    documentType: DocumentType,
    contentType: string,
    sizeBytes: number,
    createdBy: string,
    db: DB,
  ) {
    return await db.insert(file).values({
      id: fileId,
      userId: userId,
      fileName: fileName,
      bucketName: bucketName,
      s3Key: s3Key,
      s3Url: s3Url,
      documentType: documentType,
      contentType: contentType,
      sizeBytes: sizeBytes,
      createdBy: createdBy,
    })
  },

  async read(fileId: string, userId: string, db: DB) {
    return await db
      .select()
      .from(file)
      .where(and(eq(file.id, fileId), eq(file.userId, userId)))
      .limit(1)
      .then((res) => res.at(0))
  },

  async readLatest(userId: string, limit = 10, db: DB) {
    return await db
      .select()
      .from(file)
      .where(eq(file.userId, userId))
      .orderBy(desc(file.created_at))
      .limit(limit)
  },

  async update(
    fileId: string,
    userId: string,
    updateData: Partial<{
      fileName: string
      s3Url: string
      contentType: string
      sizeBytes: number
      isPublic: boolean
      accessLevel: string
      downloadCount: number
      lastAccessedAt: Date
      metadata: Record<string, unknown>
    }>,
    db: DB,
  ) {
    return await db
      .update(file)
      .set(updateData)
      .where(and(eq(file.id, fileId), eq(file.userId, userId)))
  },

  async delete(fileId: string, userId: string, db: DB) {
    return await db
      .delete(file)
      .where(and(eq(file.id, fileId), eq(file.userId, userId)))
  },

  async incrementDownloadCount(fileId: string, userId: string, db: DB) {
    const fileRecord = await this.read(fileId, userId, db)
    if (!fileRecord) return null

    const currentCount = fileRecord.downloadCount ?? 0

    return await this.update(
      fileId,
      userId,
      {
        downloadCount: currentCount + 1,
        lastAccessedAt: new Date(),
      },
      db,
    )
  },
}

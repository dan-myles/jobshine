import { createId } from "@paralleldrive/cuid2"
import { sql } from "drizzle-orm"
import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { singlestoreEnum } from "drizzle-orm/singlestore-core"

import type { Resume as ResumeType } from "@jobshine/validators"

import { user } from "./auth.schema"

export const resume = pgTable("resume", {
  id: text("id").primaryKey().$defaultFn(createId),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  resume: jsonb("resume").$type<ResumeType>().notNull(),

  // Timestamps
  created_at: timestamp({ withTimezone: true, mode: "string" })
    .default(sql`(now() AT TIME ZONE 'utc'::text)`)
    .notNull(),
  updated_at: timestamp({ withTimezone: true, mode: "string" })
    .default(sql`(now() AT TIME ZONE 'utc'::text)`)
    .notNull()
    .$onUpdate(() => sql`(now() AT TIME ZONE 'utc'::text)`),
})

export type DocumentType = "resume" | "cover-letter"

export const file = pgTable("file", {
  id: text("id").primaryKey().$defaultFn(createId),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  // S3 specific information
  fileName: text("file_name").notNull(),
  bucketName: text("bucket_name").notNull(),
  s3Key: text("s3_key").notNull(),
  s3Url: text("s3_url").notNull(),

  // File Metadata
  documentType: text("document_type").$type<DocumentType>().notNull(),
  contentType: text("content_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  createdBy: text("created_by").notNull(),
  downloadCount: integer("download_count").default(0),

  // Timestamps
  created_at: timestamp({ withTimezone: true, mode: "string" })
    .default(sql`(now() AT TIME ZONE 'utc'::text)`)
    .notNull(),
  updated_at: timestamp({ withTimezone: true, mode: "string" })
    .default(sql`(now() AT TIME ZONE 'utc'::text)`)
    .notNull()
    .$onUpdate(() => sql`(now() AT TIME ZONE 'utc'::text)`),
})

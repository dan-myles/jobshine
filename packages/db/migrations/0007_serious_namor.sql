ALTER TABLE "file" ALTER COLUMN "lastDownloadedAt" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "file" ALTER COLUMN "lastDownloadedAt" SET NOT NULL;
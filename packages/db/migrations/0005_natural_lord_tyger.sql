CREATE TABLE "file" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"file_name" text NOT NULL,
	"bucket_name" text NOT NULL,
	"s3_key" text NOT NULL,
	"s3_url" text NOT NULL,
	"content_type" text NOT NULL,
	"size_bytes" integer,
	"created_by" text NOT NULL,
	"download_count" integer DEFAULT 0,
	"lastDownloadedAt" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
	"expiresAt" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "file" ADD CONSTRAINT "file_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
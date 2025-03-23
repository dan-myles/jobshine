DROP TABLE "post" CASCADE;--> statement-breakpoint
DROP TABLE "resume_education" CASCADE;--> statement-breakpoint
DROP TABLE "resume_experience" CASCADE;--> statement-breakpoint
DROP TABLE "resume_experience_bullet" CASCADE;--> statement-breakpoint
DROP TABLE "resume_project" CASCADE;--> statement-breakpoint
DROP TABLE "resume_project_bullet" CASCADE;--> statement-breakpoint
DROP TABLE "resume_skill" CASCADE;--> statement-breakpoint
DROP TABLE "resume_website" CASCADE;--> statement-breakpoint
ALTER TABLE "resume" ADD COLUMN "resume" jsonb;--> statement-breakpoint
ALTER TABLE "resume" ADD COLUMN "created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "resume" ADD COLUMN "updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "resume" DROP COLUMN "full_name";--> statement-breakpoint
ALTER TABLE "resume" DROP COLUMN "location";--> statement-breakpoint
ALTER TABLE "resume" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "resume" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "resume" DROP COLUMN "summary";
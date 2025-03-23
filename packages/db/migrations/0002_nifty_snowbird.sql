ALTER TABLE "resume_education" RENAME COLUMN "index" TO "order";--> statement-breakpoint
ALTER TABLE "resume_experience" RENAME COLUMN "index" TO "order";--> statement-breakpoint
ALTER TABLE "resume_experience_bullet" RENAME COLUMN "index" TO "order";--> statement-breakpoint
ALTER TABLE "resume_project" RENAME COLUMN "index" TO "order";--> statement-breakpoint
ALTER TABLE "resume_project_bullet" RENAME COLUMN "index" TO "order";--> statement-breakpoint
ALTER TABLE "resume_skill" RENAME COLUMN "index" TO "order";--> statement-breakpoint
ALTER TABLE "resume_website" RENAME COLUMN "index" TO "order";--> statement-breakpoint
ALTER TABLE "resume_education" ALTER COLUMN "gpa" SET DATA TYPE text;
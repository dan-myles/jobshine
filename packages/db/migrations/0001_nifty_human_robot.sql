CREATE TABLE "resume" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"full_name" text NOT NULL,
	"location" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"summary" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resume_education" (
	"id" text PRIMARY KEY NOT NULL,
	"resume_id" text NOT NULL,
	"index" integer NOT NULL,
	"school" text NOT NULL,
	"degree" text NOT NULL,
	"field" text NOT NULL,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"gpa" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resume_experience" (
	"id" text PRIMARY KEY NOT NULL,
	"resume_id" text NOT NULL,
	"index" integer NOT NULL,
	"company" text NOT NULL,
	"title" text NOT NULL,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"location" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resume_experience_bullet" (
	"id" text PRIMARY KEY NOT NULL,
	"resume_experience_id" text NOT NULL,
	"index" integer NOT NULL,
	"bullet" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resume_project" (
	"id" text PRIMARY KEY NOT NULL,
	"resume_id" text NOT NULL,
	"index" integer NOT NULL,
	"name" text NOT NULL,
	"link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resume_project_bullet" (
	"id" text PRIMARY KEY NOT NULL,
	"resume_project_id" text NOT NULL,
	"index" integer NOT NULL,
	"bullet" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resume_skill" (
	"id" text PRIMARY KEY NOT NULL,
	"resume_id" text NOT NULL,
	"index" integer NOT NULL,
	"skill" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resume_website" (
	"id" text PRIMARY KEY NOT NULL,
	"resume_id" text NOT NULL,
	"index" integer NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "resume" ADD CONSTRAINT "resume_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resume_education" ADD CONSTRAINT "resume_education_resume_id_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resume_experience" ADD CONSTRAINT "resume_experience_resume_id_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resume_experience_bullet" ADD CONSTRAINT "resume_experience_bullet_resume_experience_id_resume_experience_id_fk" FOREIGN KEY ("resume_experience_id") REFERENCES "public"."resume_experience"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resume_project" ADD CONSTRAINT "resume_project_resume_id_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resume_project_bullet" ADD CONSTRAINT "resume_project_bullet_resume_project_id_resume_project_id_fk" FOREIGN KEY ("resume_project_id") REFERENCES "public"."resume_project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resume_skill" ADD CONSTRAINT "resume_skill_resume_id_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resume_website" ADD CONSTRAINT "resume_website_resume_id_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;
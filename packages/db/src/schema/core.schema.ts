import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, varchar } from "drizzle-orm/pg-core"

export const post = pgTable("post", {
  id: text("id").primaryKey().$defaultFn(createId),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
})

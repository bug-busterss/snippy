import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";

export const snips = pgTable("snips", {
  id: serial("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  title: text("title").default("Untitled Snip"),
  code: text("code"),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
  slug: varchar("slug", { length: 72 }).notNull(),
});

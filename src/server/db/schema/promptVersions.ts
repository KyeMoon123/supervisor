import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { prompts } from "./prompts";
import { user } from "./auth-schema";

export const promptVersions = pgTable(
  "prompt_versions",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    promptId: uuid("prompt_id")
      .notNull()
      .references(() => prompts.id, { onDelete: "cascade" }),
    versionNumber: integer("version_number").notNull(),
    body: text("body").notNull(),
    compiledBody: text("compiled_body"),
    changeSummary: text("change_summary"),
    createdBy: text("created_by").references(() => user.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    metadata: jsonb("metadata").default({}),
  },
  (pv) => [
    {
      name: "uniqPromptVersion",
      columns: [pv.promptId, pv.versionNumber],
      unique: true,
    },
    index("idx_prompt_versions_prompt").on(pv.promptId, pv.versionNumber),
  ]
);

export const promptVersionsRelations = relations(promptVersions, ({ one }) => ({
  prompt: one(prompts, {
    fields: [promptVersions.promptId],
    references: [prompts.id],
  }),
  creator: one(user, {
    fields: [promptVersions.createdBy],
    references: [user.id],
  }),
}));

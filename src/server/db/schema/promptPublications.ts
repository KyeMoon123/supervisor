import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { prompts } from "./prompts";
import { promptVersions } from "./promptVersions";
import { user } from "./auth-schema";

export const promptPublications = pgTable(
  "prompt_publications",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    promptId: uuid("prompt_id")
      .notNull()
      .references(() => prompts.id, { onDelete: "cascade" }),
    publishedVersionId: uuid("published_version_id")
      .notNull()
      .references(() => promptVersions.id, { onDelete: "restrict" }),
    publishedBy: text("published_by").references(() => user.id),
    publishedAt: timestamp("published_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    notes: text("notes"),
    metadata: jsonb("metadata").default({}),
  },
  (pp) => [
    index("idx_prompt_publications_prompt").on(pp.promptId, pp.publishedAt),
  ]
);

export const promptPublicationsRelations = relations(
  promptPublications,
  ({ one }) => ({
    prompt: one(prompts, {
      fields: [promptPublications.promptId],
      references: [prompts.id],
    }),
    publishedVersion: one(promptVersions, {
      fields: [promptPublications.publishedVersionId],
      references: [promptVersions.id],
    }),
    publisher: one(user, {
      fields: [promptPublications.publishedBy],
      references: [user.id],
    }),
  })
);

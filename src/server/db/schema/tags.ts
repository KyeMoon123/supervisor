import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { workspaces } from "./workspaces";
import { prompts } from "./prompts";

export const tags = pgTable(
  "tags",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    name: varchar("name").notNull(),
  },
  (t) => [
    {
      name: "uniqWorkspaceName",
      columns: [t.workspaceId, t.name],
      unique: true,
    },
  ]
);

export const tagsRelations = relations(tags, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [tags.workspaceId],
    references: [workspaces.id],
  }),
}));

export const promptTags = pgTable(
  "prompt_tags",
  {
    promptId: uuid("prompt_id")
      .notNull()
      .references(() => prompts.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (pt) => [
    {
      name: "pk",
      columns: [pt.promptId, pt.tagId],
      primaryKey: true,
    },
  ]
);

export const promptTagsRelations = relations(promptTags, ({ one }) => ({
  prompt: one(prompts, {
    fields: [promptTags.promptId],
    references: [prompts.id],
  }),
  tag: one(tags, {
    fields: [promptTags.tagId],
    references: [tags.id],
  }),
}));

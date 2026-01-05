import { relations, sql } from "drizzle-orm";
import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { workspaces } from "./workspaces";
import { z } from "zod";

export const PromptCategoryEnum = pgEnum("category", [
  "prompt",
  "template",
  "snippet",
]);

export const PromptCategorySchema = z.enum(PromptCategoryEnum.enumValues);
export const PromptCategorySchemaArray = z.array(PromptCategorySchema);
export type TPromptCategory = z.infer<typeof PromptCategorySchema>;

export const prompts = pgTable(
  "prompts",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    title: text("title"),
    key: text("key"),
    description: text("description"),
    body: jsonb("body"),
    tags: text("tags").array(),
    category: PromptCategoryEnum("category"),
    createdBy: text("created_by").references(() => user.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (pr) => [
    {
      name: "uniqWorkspaceKey",
      columns: [pr.workspaceId, pr.key],
      unique: true,
    },
  ]
);

export const promptsRelations = relations(prompts, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [prompts.workspaceId],
    references: [workspaces.id],
  }),
  creator: one(user, {
    fields: [prompts.createdBy],
    references: [user.id],
  }),
}));

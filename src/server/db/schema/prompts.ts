import { relations, sql } from "drizzle-orm";
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { tagAssignments } from "./tagAssignments";
import { workspaces } from "./workspaces";

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

export const promptsRelations = relations(prompts, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [prompts.workspaceId],
    references: [workspaces.id],
  }),
  creator: one(user, {
    fields: [prompts.createdBy],
    references: [user.id],
  }),
  tagAssignments: many(tagAssignments),
}));

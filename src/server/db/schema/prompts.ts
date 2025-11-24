import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { workspaces } from "./workspaces";
import { user } from "./auth-schema";
import { folders } from "./folder";
import { promptBlocks } from "./promptBlocks";
import { tagAssignments } from "./tagAssignments";

export const prompts = pgTable(
  "prompts",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    folderId: uuid("folder_id").references(() => folders.id, {
      onDelete: "cascade",
    }),
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
  folder: one(folders, {
    fields: [prompts.folderId],
    references: [folders.id],
  }),
  creator: one(user, {
    fields: [prompts.createdBy],
    references: [user.id],
  }),
  promptBlocks: many(promptBlocks),
  tagAssignments: many(tagAssignments),
}));

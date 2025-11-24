import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { workspaces } from "./workspaces";
import { promptBlocks } from "./promptBlocks";
import { relations, sql } from "drizzle-orm";
import { user } from "./auth-schema";
import { tagAssignments } from "./tagAssignments";

export const blocks = pgTable("blocks", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  title: text("title").notNull(),
  type: text("type"), // "Role", "Persona", "Style", etc.
  body: jsonb("body"),
  createdBy: text("created_by").references(() => user.id),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const blocksRelations = relations(blocks, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [blocks.workspaceId],
    references: [workspaces.id],
  }),
  promptBlocks: many(promptBlocks),
  creator: one(user, {
    fields: [blocks.createdBy],
    references: [user.id],
  }),
  tagAssignments: many(tagAssignments),
}));

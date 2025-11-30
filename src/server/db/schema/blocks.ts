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
import { tagAssignments } from "./tagAssignments";
import { workspaces } from "./workspaces";

export const BlockCategory = pgEnum("category", [
  "expert",
  "persona",
  "style",
  "context",
  "rules",
  "output_format",
  "examples",
  "template",
  "snippet",
  "misc",
]);

export const blocks = pgTable("blocks", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  title: text("title").notNull(),
  category: BlockCategory("category"),
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
  creator: one(user, {
    fields: [blocks.createdBy],
    references: [user.id],
  }),
  tagAssignments: many(tagAssignments),
}));

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

export const BlockCategoryEnum = pgEnum("category", [
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

export const BlockCategorySchema = z.enum(BlockCategoryEnum.enumValues);
export const BlockCategorySchemaArray = z.array(BlockCategorySchema);
export type TBlockCategory = z.infer<typeof BlockCategorySchema>;

export const blocks = pgTable("blocks", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  title: text("title").notNull(),
  category: BlockCategoryEnum("category"),
  body: jsonb("body"),
  tags: text("tags").array(),
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
}));

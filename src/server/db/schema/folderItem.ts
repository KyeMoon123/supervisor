import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { prompts } from "./prompts";
import { folders } from "./folder";
import { blocks } from "./blocks";

export const EntityType = pgEnum("entity_type", ["prompt", "block", "folder"]);

export const folderItems = pgTable("folder_items", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  entity_type: EntityType("entity_type").notNull(),
  entity_id: uuid("entity_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const folderItemsRelations = relations(folderItems, ({ one, many }) => ({
  prompt: one(prompts, {
    fields: [folderItems.entity_id],
    references: [prompts.id],
  }),
  block: one(blocks, {
    fields: [folderItems.entity_id],
    references: [blocks.id],
  }),
  folder: one(folders, {
    fields: [folderItems.entity_id],
    references: [folders.id],
  }),
}));

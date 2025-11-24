import { pgTable, uuid } from "drizzle-orm/pg-core";
import { tags } from "./tags";
import { prompts } from "./prompts";
import { blocks } from "./blocks";
import { relations, sql } from "drizzle-orm";

export const tagAssignments = pgTable("tag_assignments", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  tagId: uuid("tag_id").references(() => tags.id),
  promptId: uuid("prompt_id").references(() => prompts.id),
  blockId: uuid("block_id").references(() => blocks.id),
});

export const tagAssignmentsRelations = relations(tagAssignments, ({ one }) => ({
  tag: one(tags, {
    fields: [tagAssignments.tagId],
    references: [tags.id],
  }),
  prompt: one(prompts, {
    fields: [tagAssignments.promptId],
    references: [prompts.id],
  }),
  block: one(blocks, {
    fields: [tagAssignments.blockId],
    references: [blocks.id],
  }),
}));

import { pgTable, uuid } from "drizzle-orm/pg-core";
import { tags } from "./tags";
import { prompts } from "./prompts";
import { blocks } from "./blocks";

export const tagAssignments = pgTable("tag_assignments", {
  id: uuid("id").primaryKey(),
  tagId: uuid("tag_id").references(() => tags.id),
  promptId: uuid("prompt_id").references(() => prompts.id),
  blockId: uuid("block_id").references(() => blocks.id),
});

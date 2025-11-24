import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { prompts } from "./prompts";
import { blocks } from "./blocks";
import { relations } from "drizzle-orm";

export const promptBlocks = pgTable("prompt_blocks", {
  id: uuid("id").primaryKey(),
  promptId: uuid("prompt_id")
    .references(() => prompts.id)
    .notNull(),
  blockId: uuid("block_id")
    .references(() => blocks.id)
    .notNull(),
  inlineText: text("inline_text"),
  isLinked: boolean("is_linked").default(true),
  position: integer("position").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const promptBlocksRelations = relations(promptBlocks, ({ one }) => ({
  prompt: one(prompts, {
    fields: [promptBlocks.promptId],
    references: [prompts.id],
  }),
  block: one(blocks, {
    fields: [promptBlocks.blockId],
    references: [blocks.id],
  }),
}));

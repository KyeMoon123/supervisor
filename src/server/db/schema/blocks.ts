import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { workspaces } from "./workspaces";

export const blocks = pgTable("blocks", {
  id: uuid("id").primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  title: text("title").notNull(),
  category: text("category"), // "Role", "Persona", "Style", etc.
  body: text("body").notNull(), // content of the block
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

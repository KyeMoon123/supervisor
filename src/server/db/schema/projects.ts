import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { workspaces } from "./workspaces";
import { user } from "./auth-schema";

export const projects = pgTable(
  "projects",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    createdBy: text("created_by").references(() => user.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    metadata: jsonb("metadata").default({}),
  },
  (t) => [
    {
      name: "uniqWorkspaceName",
      columns: [t.workspaceId, t.name],
      unique: true,
    },
  ]
);

export const projectsRelations = relations(projects, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [projects.workspaceId],
    references: [workspaces.id],
  }),
  creator: one(user, {
    fields: [projects.createdBy],
    references: [user.id],
  }),
}));

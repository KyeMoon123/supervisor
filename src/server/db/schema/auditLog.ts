import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { workspaces } from "./workspaces";
import { user } from "./auth-schema";

export const auditLog = pgTable(
  "audit_log",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    workspaceId: uuid("workspace_id").references(() => workspaces.id),
    userId: text("user_id").references(() => user.id),
    entityType: text("entity_type").notNull(),
    entityId: uuid("entity_id"),
    action: text("action").notNull(),
    payload: jsonb("payload"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (al) => [index("idx_audit_workspace").on(al.workspaceId, al.createdAt)]
);

export const auditLogRelations = relations(auditLog, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [auditLog.workspaceId],
    references: [workspaces.id],
  }),
  user: one(user, {
    fields: [auditLog.userId],
    references: [user.id],
  }),
}));

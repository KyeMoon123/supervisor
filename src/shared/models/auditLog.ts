import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { auditLog } from "@/server/db/schema/auditLog";

export type AuditLog = InferSelectModel<typeof auditLog>;
export type NewAuditLog = InferInsertModel<typeof auditLog>;

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { workspaceMembers } from "@/db/schema/workspaceMembers";

export type WorkspaceMember = InferSelectModel<typeof workspaceMembers>;
export type NewWorkspaceMember = InferInsertModel<typeof workspaceMembers>;

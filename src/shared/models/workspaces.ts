import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { workspaces } from "@/db/schema/workspaces";

export type Workspace = InferSelectModel<typeof workspaces>;
export type NewWorkspace = InferInsertModel<typeof workspaces>;

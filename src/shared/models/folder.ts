import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { folders } from "@/server/db/schema/folder";

export type Folder = InferSelectModel<typeof folders>;
export type NewFolder = InferInsertModel<typeof folders>;

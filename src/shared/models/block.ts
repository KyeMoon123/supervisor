import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { blocks } from "@/db/schema/blocks";

export type Block = InferSelectModel<typeof blocks>;
export type NewBlock = InferInsertModel<typeof blocks>;

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { promptVersions } from "@/db/schema/promptVersions";

export type PromptVersion = InferSelectModel<typeof promptVersions>;
export type NewPromptVersion = InferInsertModel<typeof promptVersions>;

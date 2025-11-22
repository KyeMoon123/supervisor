import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { promptPublications } from "@/db/schema/promptPublications";

export type PromptPublication = InferSelectModel<typeof promptPublications>;
export type NewPromptPublication = InferInsertModel<typeof promptPublications>;

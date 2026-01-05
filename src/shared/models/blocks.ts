import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { prompts } from "@/db/schema/prompts";

export type Prompt = InferSelectModel<typeof prompts>;
export type NewPrompt = InferInsertModel<typeof prompts>;

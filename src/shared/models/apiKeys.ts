import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { apiKeys } from "@/server/db/schema/apiKeys";

export type ApiKey = InferSelectModel<typeof apiKeys>;
export type NewApiKey = InferInsertModel<typeof apiKeys>;

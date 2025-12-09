import type { InferSelectModel } from "drizzle-orm";
import type { blocks } from "@/server/db/schema/blocks";
import { z } from "zod";
import { BlockCategorySchema } from "@/server/db/schema/blocks";

export const UpdateBlockBodyInput = z.object({
  id: z.string(),
  body: z.unknown(),
});

export const UpdateBlockInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  category: BlockCategorySchema.optional(),
  tags: z.array(z.string()).optional(),
});
export type UpdateBlockInput = z.infer<typeof UpdateBlockInput>;

export interface BlockDetailsDto extends InferSelectModel<typeof blocks> {}

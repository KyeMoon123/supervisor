import type { InferSelectModel } from "drizzle-orm";
import type { blocks } from "@/server/db/schema/blocks";
import type { tagAssignments } from "@/server/db/schema/tagAssignments";
import { z } from "zod";

export const UpdateBlockBodyInput = z.object({
  id: z.string(),
  body: z.unknown(),
});

export const UpdateBlockInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
});
export type UpdateBlockInput = z.infer<typeof UpdateBlockInput>;

export interface BlockDetailsDto extends InferSelectModel<typeof blocks> {
  tagAssignments: (InferSelectModel<typeof tagAssignments> & {
    tag: {
      id: string;
      workspaceId: string;
      name: string;
    };
  })[];
}

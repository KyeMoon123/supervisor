import { z } from "zod";

export type AiAction =
  | "draft"
  | "edit_selection"
  | "rewrite"
  | "summarise"
  | "review";

export const AiStreamRequestSchema = z.object({
  action: z.enum(["draft", "edit_selection", "rewrite", "summarise", "review"]),
  prompt: z.string(),
  context: z.string().optional(),
  selection: z.string().optional(),
});

export type AiStreamRequest = z.infer<typeof AiStreamRequestSchema>;

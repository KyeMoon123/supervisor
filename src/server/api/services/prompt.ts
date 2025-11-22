import { db } from "@/server/db";
import { prompts } from "@/server/db/schema/prompts";
import { and, eq } from "drizzle-orm";

export const PromptService = {
  createPrompt,
  getPrompts,
};

async function createPrompt(prompt: typeof prompts.$inferInsert) {
  const [newPrompt] = await db.insert(prompts).values(prompt).returning();
  return newPrompt;
}

interface GetPromptsParams {
  workspaceId: string;
  userId: string;
}
async function getPrompts({ workspaceId, userId }: GetPromptsParams) {
  const promptsData = await db.query.prompts.findMany({
    where: and(
      eq(prompts.workspaceId, workspaceId),
      eq(prompts.createdBy, userId)
    ),
  });
  return promptsData;
}

import { db } from "@/server/db";
import { prompts } from "@/server/db/schema/prompts";
import { and, eq } from "drizzle-orm";
import type { PromptDetailsDto } from "../api/routers/prompt";

export const PromptService = {
  createPrompt,
  getPrompts,
  getPromptDetails,
  updatePromptBody,
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

async function getPromptDetails({
  id,
}: {
  id: string;
}): Promise<PromptDetailsDto> {
  const response = await db.query.prompts.findFirst({
    where: eq(prompts.id, id),
    with: {
      promptBlocks: {
        with: {
          block: true,
        },
      },
      tagAssignments: {
        with: {
          tag: true,
        },
      },
    },
  });

  if (!response) {
    throw new Error("Prompt not found");
  }

  return response;
}

async function updatePromptBody({ id, body }: { id: string; body: unknown }) {
  const [updatedPrompt] = await db
    .update(prompts)
    .set({ body: body })
    .where(eq(prompts.id, id))
    .returning();
  return updatedPrompt;
}

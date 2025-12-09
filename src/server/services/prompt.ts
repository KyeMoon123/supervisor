import { db } from "@/server/db";
import { prompts, type TPromptCategory } from "@/server/db/schema/prompts";
import { and, eq } from "drizzle-orm";
import type { PromptDetailsDto } from "../api/routers/prompt";
import { isEmpty, pickDefined } from "@/shared/utils/utils";
import type { Prompt } from "@/shared/models/prompts";
import { TRPCError } from "@trpc/server";

export const PromptService = {
  createPrompt,
  getPrompts,
  getPromptDetails,
  updatePromptBody,
  updatePrompt,
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

async function updatePrompt({
  id,
  prompt,
}: {
  id: string;
  prompt: Partial<Prompt>;
}) {
  const updateData = pickDefined(prompt);
  if (isEmpty(updateData)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "No data to update" });
  }
  const updatedPrompt = await db
    .update(prompts)
    .set(updateData)
    .where(eq(prompts.id, id))
    .returning();
  if (!updatedPrompt) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Failed to update prompt",
    });
  }
  return updatedPrompt;
}

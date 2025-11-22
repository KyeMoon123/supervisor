import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { PromptService } from "../services/prompt";
import { nanoid } from "nanoid";

export const promptRouter = createTRPCRouter({
  /**
   * Get all prompts for the current user
   * @returns {Promise<prompts[]>}
   */
  getPrompts: protectedProcedure.query(async ({ ctx }) => {
    return await PromptService.getPrompts({
      workspaceId: ctx.user.workspaceId,
      userId: ctx.user.id,
    });
  }),
  /**
   * Create a new prompt for the current user
   * @param input - The input object containing the prompt name and description
   * @returns {Promise<prompt>}
   */
  createPrompt: protectedProcedure.mutation(async ({ ctx, input }) => {
    const key = nanoid(4).toLowerCase();
    return await PromptService.createPrompt({
      name: `Untitled Prompt - ${key}`,
      workspaceId: ctx.user.workspaceId,
      createdBy: ctx.user.id,
      key: `untitled-prompt-${key}`,
    });
  }),
});

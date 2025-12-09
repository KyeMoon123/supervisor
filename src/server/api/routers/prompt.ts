import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { PromptService } from "../../services/prompt";
import { nanoid } from "nanoid";
import {
  PromptCategoryEnum,
  PromptCategorySchema,
  type prompts,
} from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

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
      title: `Untitled Prompt - ${key}`,
      workspaceId: ctx.user.workspaceId,
      createdBy: ctx.user.id,
      key: `untitled-prompt-${key}`,
    });
  }),

  getPrompt: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await PromptService.getPromptDetails({
        id: input.id,
        // userId: ctx.user.id,
        // workspaceId: ctx.user.workspaceId,
      });
    }),

  updatePromptBody: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        body: z.unknown(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await PromptService.updatePromptBody({
        id: input.id,
        body: input.body,
      });
    }),

  updatePrompt: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        category: PromptCategorySchema.optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await PromptService.updatePrompt({
        id: input.id,
        prompt: {
          title: input.title,
          description: input.description,
          category: input.category,
          tags: input.tags,
        },
      });
    }),
});

export interface PromptDetailsDto extends InferSelectModel<typeof prompts> {}

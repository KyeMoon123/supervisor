import { z } from "zod";
import { TagsService } from "../../services/tags";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const tagsRouter = createTRPCRouter({
  /**
   * Get all tags for the current workspace
   * @returns {Promise<tags[]>}
   */
  getTags: protectedProcedure.query(async ({ ctx }) => {
    return await TagsService.getTags({
      workspaceId: ctx.user.workspaceId,
    });
  }),

  /**
   * Create a new tag for the current workspace
   * @param input - The input object containing tag name
   * @returns {Promise<tags>}
   */
  createTag: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await TagsService.createTag({
        workspaceId: ctx.user.workspaceId,
        name: input.name,
      });
    }),
});

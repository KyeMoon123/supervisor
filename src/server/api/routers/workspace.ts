import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { WorkspaceService } from "../../services/workspace";

export const workspaceRouter = createTRPCRouter({
  /**
   * Get all projects for the current user
   * @returns {Promise<projects[]>}
   */
  getUserWorkspaces: protectedProcedure.query(async ({ ctx }) => {
    return await WorkspaceService.getUserWorkspaces(ctx.user.id);
  }),

  /**
   * Create a new folder for the current user
   * @param input - The input object containing the project name and description
   * @returns {Promise<project>}
   */
  createWorkspace: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await WorkspaceService.createWorkspace({
        name: input.name,
        userId: ctx.user.id,
      });
    }),
});

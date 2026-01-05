import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { FolderService } from "../../services/folder";
import { z } from "zod";
import { FolderRepository } from "../../repository/folder";

export const folderRouter = createTRPCRouter({
  /**
   * Get all projects for the current user
   * @returns {Promise<projects[]>}
   */
  getFolders: protectedProcedure.query(async ({ ctx }) => {
    return await FolderService.getFolders({
      workspaceId: ctx.user.workspaceId,
      userId: ctx.user.id,
    });
  }),

  /**
   * Create a new folder for the current user
   * @param input - The input object containing the project name and description
   * @returns {Promise<project>}
   */
  createFolder: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await FolderRepository.createFolder({
        ...input,
        workspaceId: ctx.user.workspaceId,
        createdBy: ctx.user.id,
      });
    }),
});

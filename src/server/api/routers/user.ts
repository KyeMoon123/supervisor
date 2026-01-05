import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { UserService } from "../../services/user";

export const userRouter = createTRPCRouter({
  /**
   * Get the current user
   * @returns {Promise<user>}
   */
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),

  /**
   * Create a new folder for the current user
   * @param input - The input object containing the project name and description
   * @returns {Promise<project>}
   */
  updateUserWorkspace: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await UserService.updateUserWorkspace(
        ctx.user.id,
        input.workspaceId
      );
    }),
});

import type { BlockDetailsDto } from "@/shared/api-interface/blocks";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export type { BlockDetailsDto };

export const blocksRouter = createTRPCRouter({
  /**
   * Get all blocks for the current user
   * @returns {Promise<blocks[]>}
   */
  seedDatabase: protectedProcedure.query(async ({ ctx }) => {
    const systemTags = [
      {
        name: "System",
        color: "blue",
      },
    ];
  }),
});

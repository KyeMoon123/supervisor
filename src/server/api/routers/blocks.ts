import {
  UpdateBlockBodyInput,
  UpdateBlockInput,
} from "@/shared/api-interface/blocks";
import type { BlockDetailsDto } from "@/shared/api-interface/blocks";
import { nanoid } from "nanoid";
import { z } from "zod";
import { BlocksService } from "../../services/blocks.service";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export type { BlockDetailsDto };

export const blocksRouter = createTRPCRouter({
  /**
   * Get all blocks for the current user
   * @returns {Promise<blocks[]>}
   */
  getBlocks: protectedProcedure.query(async ({ ctx }) => {
    return await BlocksService.getBlocks({
      workspaceId: ctx.user.workspaceId,
      userId: ctx.user.id,
    });
  }),

  /**
   * Create a new block for the current user
   * @param input - The input object containing block details
   * @returns {Promise<blocks>}
   */
  createBlock: protectedProcedure.mutation(async ({ ctx }) => {
    const key = nanoid(4).toLowerCase();
    return await BlocksService.createBlock({
      title: `Untitled Block - ${key}`,
      workspaceId: ctx.user.workspaceId,
      createdBy: ctx.user.id,
    });
  }),

  /**
   * Get block details by ID
   * @returns {Promise<BlockDetailsDto>}
   */
  getBlock: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await BlocksService.getBlockDetails({
        id: input.id,
      });
    }),

  /**
   * Update block body - Optimised to not do any other checks to increase performance
   * @returns {Promise<blocks>}
   */
  updateBlockBody: protectedProcedure
    .input(UpdateBlockBodyInput)
    .mutation(async ({ ctx, input }) => {
      return await BlocksService.updateBlockBody({
        id: input.id,
        body: input.body,
      });
    }),

  updateBlock: protectedProcedure
    .input(UpdateBlockInput)
    .mutation(async ({ ctx, input }) => {
      return await BlocksService.updateBlock(input);
    }),
});

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { folders } from "@/server/db/schema/folder";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(folders).values({
        name: input.name,
        workspaceId: "1",
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.folders.findFirst({
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });

    return post ?? null;
  }),
});

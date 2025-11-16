import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { cases } from "@/server/db/schema/cases";

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
      await ctx.db.insert(cases).values({
        name: input.name,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.cases.findFirst({
      orderBy: (cases, { desc }) => [desc(cases.createdAt)],
    });

    return post ?? null;
  }),
});

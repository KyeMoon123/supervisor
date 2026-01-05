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
});

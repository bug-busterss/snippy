import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const snip = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        code: z.string(),
        language: z.string(),
        slug: z.string(),
        visibility: z.string(),
      }),
    )
    .mutation(({ input }) => {
      return {};
    }),
});

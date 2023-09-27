import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const snip = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        code: z.string(),
        language: z.string(),
        slug: z.string(),
        visibility: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { title, code: content, language, slug, visibility } = input;
      const snip = await db.snips.create({
        data: {
          title,
          content,
          slug,
          language,
          visibility,
        },
      });

      return snip;
    }),
});

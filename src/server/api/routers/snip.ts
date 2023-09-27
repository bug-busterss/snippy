import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { snips } from "@/server/db/schema";

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
      const jod = await db
        .insert(snips)
        .values({
          slug: input.slug,
          title: input.title,
          code: input.code,
          language: input.language,
          visibility: input.visibility,
        })
        .returning({
          id: snips.id,
        });

      return jod;
    }),
});

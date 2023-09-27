import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const snip = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({ title: z.string(), code: z.string(), slug: z.string().url() }),
    )
    .query(({ input }) => {
      if (input.slug === "error") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Enter Valid Slug",
        });
      }
      return {};
    }),
});

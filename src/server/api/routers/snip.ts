import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { input } from "@nextui-org/react";

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
      const slugExists = await db.snips.findFirst({
        where: {
          slug,
        },
      });

      if (!content) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Content is required",
        });
      }
      if (!language) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Language is required",
        });
      }
      if (!slug) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Slug is required",
        });
      }
      if (/\s/g.test(slug))
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Slug cannot start with whitespace",
        });
      if (slugExists)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Slug already exists",
        });

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
  getAll: publicProcedure
    .input(
      z.object({
        language: z.string().nullable(),
      }),
    )
    .query(async ({ input }) => {
      //Fetching public Snips Based on Language
      if (input.language) {
        const data = await db.snips.findMany({
          where: {
            visibility: "public",
            language: input.language,
          },
        });

        if (!data)
          throw new TRPCError({ code: "NOT_FOUND", message: "No Data" });

        return data;
      }
      //Fetch All Public Snips
      const data = await db.snips.findMany({
        where: {
          visibility: "public",
        },
      });
      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No Data",
        });
      }
      return data;
    }),
  getOne: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const data = await db.snips.findUnique({
        where: {
          slug: input.slug,
        },
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND", message: "No Data" });
    }),
});

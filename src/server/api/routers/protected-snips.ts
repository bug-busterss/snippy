import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { Visibility } from "@prisma/client";
import { nanoid } from "nanoid";

export const protectedSnip = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        code: z.string(),
        language: z.string(),
        slug: z.string(),
        visibility: z.nativeEnum(Visibility).default("public"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
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
      return await db.snips.create({
        data: {
          title,
          content,
          slug: slug.trim() === "" ? nanoid(7) : slug,
          language,
          visibility,
          userId: ctx.user.id,
        },
      });
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        language: z.string().nullable(),
      }),
    )
    .query(async ({ input, ctx }) => {
      //Fetching public Snips Based on Language
      if (input.language) {
        const data = await db.snips.findMany({
          where: {
            language: input.language,
            userId: ctx.user.id,
          },
        });

        if (!data)
          throw new TRPCError({ code: "NOT_FOUND", message: "No Data" });

        return data;
      }
      //Fetch All Snips from user
      const data = await db.snips.findMany({
        where: {
          userId: ctx.user.id,
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
  getOne: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const data = await db.snips.findUnique({
        where: {
          slug: input.slug,
          id: ctx.user.id,
        },
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND", message: "No Data" });
    }),
});

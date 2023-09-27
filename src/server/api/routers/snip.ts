import { z } from "zod";
import { nanoid } from "nanoid";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { Visibility } from "@prisma/client";

export const snip = createTRPCRouter({
  createAnon: publicProcedure
    .input(
      z.object({
        title: z.string(),
        code: z.string(),
        language: z.string(),
        slug: z.string(),
        visibility: z.nativeEnum(Visibility).default("public"),
      }),
    )
    .mutation(async ({ input }) => {
      const { title, code: content, language, slug, visibility } = input;
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

      return await db.snips.create({
        data: {
          title,
          content,
          slug: nanoid(),
          language,
          visibility,
        },
      });
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
          visibility: "public",
        },
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND", message: "No Data" });
    }),
});

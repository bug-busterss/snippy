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
        visibility: z.nativeEnum(Visibility).default("public"),
      }),
    )
    .mutation(async ({ input }) => {
      const { title, code: content, language, visibility } = input;
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

      return await db.snips.create({
        data: {
          title,
          content,
          slug: nanoid(7),
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
  getHomepage: publicProcedure.query(async ({ ctx }) => {
    const snips = await ctx.db.snips.findMany({
      take: 6,
      where: { visibility: "public" },
      select: { title: true, createdAt: true, language: true },
    });

    return snips;
  }),
  getOne: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.snips.findUnique({
        where: {
          slug: input.slug,
        },
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND", message: "No Data" });
      if (!ctx.user && data.visibility === "private") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this snip",
        });
      }
      // if (ctx.user && data.userId !== ctx.user.id) {
      //   throw new TRPCError({
      //     code: "UNAUTHORIZED",
      //     message: "You are not authorized to view this snip",
      //   });
      // }

      return data;
    }),
});

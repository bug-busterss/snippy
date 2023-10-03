import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const commentsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        snipId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { content, snipId } = input;
      const snip = await ctx.db.snips.findUnique({
        where: {
          id: snipId,
        },
      });
      if (!snip) {
        throw new Error("Snip not found");
      }
      const comment = await ctx.db.comments.create({
        data: {
          content,
          snipId,
          userId: ctx.user.id,
        },
      });
      return comment;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { commentId } = input;

      const comment = await ctx.db.comments.findUnique({
        where: {
          id: commentId,
        },
      });

      if (!comment) {
        throw new Error("Comment not found");
      }

      const snip = await ctx.db.snips.findUnique({
        where: {
          id: comment.snipId,
        },
      });

      if (!snip) {
        throw new Error("Snip not found");
      }

      if (comment.userId !== ctx.user.id || snip.userId !== ctx.user.id) {
        throw new Error("Unauthorized");
      }
      await ctx.db.comments.delete({
        where: {
          id: commentId,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        commentId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { content, commentId } = input;

      //Basic No Data Input Errors
      if (!content) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing content",
        });
      }
      if (!commentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing commentId",
        });
      }

      //Check if comment exists
      const comment = await ctx.db.comments.findUnique({
        where: {
          id: commentId,
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      //Check if user owns comment
      if (comment.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      // Update comment
      const updatedComment = await ctx.db.comments.update({
        data: {
          content,
          updatedAt: new Date(),
        },
        where: {
          id: commentId,
        },
      });

      // Check if comment was updated
      if (!updatedComment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }
      return updatedComment;
    }),
  view: publicProcedure
    .input(
      z.object({
        snipId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { snipId } = input;

      // Check if snip exists
      const snip = await ctx.db.snips.findUnique({
        where: {
          id: snipId,
        },
      });

      if (!snip) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Snip not found",
        });
      }

      // Return comments
      return await ctx.db.comments.findMany({
        where: {
          snipId,
        },
      });
    }),
});

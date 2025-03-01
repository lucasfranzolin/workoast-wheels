import { TRPCError } from "@trpc/server";
import { prisma } from "../../../prisma/client";
import { procedure } from "../../trpc";
import { getSchema } from "./get.schema";

export const getProcedure = procedure
  .input(getSchema)
  .meta({ description: "Retrieves details of a specific reservation by ID." })
  .query(async ({ input }) => {
    try {
      const reservation = await prisma.reservation.findFirst({
        where: {
          id: { equals: input.id },
        },
        include: {
          vehicle: true,
        },
      });

      if (!reservation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reservation not found",
        });
      }

      return reservation;
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching reservation details",
      });
    }
  });

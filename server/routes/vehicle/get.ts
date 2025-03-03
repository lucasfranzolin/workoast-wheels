import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../prisma/client";
import { procedure } from "../../trpc";

export const getProcedure = procedure
  .input(z.object({ id: z.string().describe("The ID of the vehicle.") }))
  .meta({ description: "Retrieves details of a specific vehicle by ID." })
  .query(async ({ input }) => {
    try {
      const vehicle = await prisma.vehicle.findFirst({
        where: {
          id: { equals: input.id },
        },
      });

      if (!vehicle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Vehicle not found",
        });
      }

      return vehicle;
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching vehicle details",
      });
    }
  });

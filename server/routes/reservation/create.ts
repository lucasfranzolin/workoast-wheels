import { TRPCError } from "@trpc/server";
import { prisma } from "../../../prisma/client";
import { procedure } from "../../trpc";
import {
  calculateTotalPrice,
  validateReservationAndGetVehicle,
} from "../../utils";
import { createSchema } from "./create.schema";

export const createProcedure = procedure
  .input(createSchema)
  .meta({ description: "Creates a new reservation for a vehicle." })
  .mutation(async ({ input }) => {
    try {
      const { vehicle, start, end } =
        await validateReservationAndGetVehicle(input);

      const { totalPriceCents } = calculateTotalPrice(
        start,
        end,
        vehicle.hourly_rate_cents,
      );

      return prisma.reservation.create({
        data: {
          vehicle_id: vehicle.id,
          start_time: start,
          end_time: end,
          total_price_cents: totalPriceCents,
        },
      });
    } catch (error) {
      console.error("Error reserving vehicle:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while reserving the vehicle",
      });
    }
  });

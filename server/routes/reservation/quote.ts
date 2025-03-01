import { TRPCError } from "@trpc/server";
import { procedure } from "../../trpc";
import {
  calculateTotalPrice,
  validateReservationAndGetVehicle,
} from "../../utils";
import { quoteSchema } from "./quote.schema";

export const quoteProcedure = procedure
  .input(quoteSchema)
  .meta({
    description:
      "Quotes the total price for a reservation based on vehicle and time.",
  })
  .query(async ({ input }) => {
    try {
      const { vehicle, start, end } =
        await validateReservationAndGetVehicle(input);
      return calculateTotalPrice(start, end, vehicle.hourly_rate_cents);
    } catch (error) {
      console.error("Error quoting vehicle:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while quoting the vehicle",
      });
    }
  });

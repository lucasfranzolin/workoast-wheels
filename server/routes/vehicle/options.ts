import { TRPCError } from "@trpc/server";
import { prisma } from "../../../prisma/client";
import { procedure } from "../../trpc";

export const optionsProcedure = procedure
  .meta({ description: "Fetches available vehicle options." })
  .query(async () => {
    try {
      const vehicles = await prisma.vehicle.findMany({
        select: {
          make: true,
          classification: true,
          max_passengers: true,
        },
        distinct: ["make", "classification", "max_passengers"],
      });

      const uniqueMakes = [...new Set(vehicles.map((v) => v.make))].sort();
      const uniqueClassifications = [
        ...new Set(vehicles.map((v) => v.classification)),
      ].sort();
      const uniquePassengerCounts = [
        ...new Set(vehicles.map((v) => v.max_passengers)),
      ].sort((a, b) => a - b);

      return {
        makes: uniqueMakes,
        classifications: uniqueClassifications,
        passengerCounts: uniquePassengerCounts,
      };
    } catch (error) {
      console.error("Error fetching vehicle options:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching vehicle options",
      });
    }
  });

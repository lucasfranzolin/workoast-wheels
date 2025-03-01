import { TRPCError } from "@trpc/server";
import { prisma } from "../../../prisma/client";
import { procedure } from "../../trpc";
import { parseAndValidateTimeRange } from "../../utils";
import { searchSchema } from "./search.schema";

export const searchProcedure = procedure
  .input(searchSchema)
  .meta({ description: "Searches for available vehicles based on criteria." })
  .query(async ({ input }) => {
    try {
      const {
        startTime,
        endTime,
        page,
        limit,
        passengerCount,
        classification,
        make,
        priceMin,
        priceMax,
      } = input;

      const parsedPage = page;
      const parsedLimit = limit;
      const parsedPriceMin = priceMin;
      const parsedPriceMax =
        priceMax === 100 ? Number.MAX_SAFE_INTEGER : priceMax;
      const parsedPassengerCount = passengerCount;

      const classifications = classification || [];
      const makes = make || [];

      const { start, end } = parseAndValidateTimeRange(startTime, endTime);

      const baseWhereClause = {
        reservations: {
          none: {
            OR: [
              { start_time: { lte: end }, end_time: { gt: start } },
              { start_time: { lt: end }, end_time: { gte: start } },
            ],
          },
        },
        max_passengers: {
          gte: parsedPassengerCount,
        },
        ...(classifications.length > 0 && {
          classification: { in: classifications },
        }),
        ...(makes.length > 0 && { make: { in: makes } }),
        hourly_rate_cents: {
          gte: parsedPriceMin * 100,
          lte: parsedPriceMax * 100,
        },
      };

      const availableVehicles = await prisma.vehicle.findMany({
        where: baseWhereClause,
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.vehicle.count({
        where: baseWhereClause,
      });

      const totalPages = Math.ceil(totalCount / parsedLimit);

      return {
        vehicles: availableVehicles,
        pagination: {
          currentPage: parsedPage,
          totalPages: totalPages,
          totalItems: totalCount,
          itemsPerPage: parsedLimit,
        },
      };
    } catch (error) {
      console.error("Error searching for vehicles:", error);
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while searching for vehicles",
      });
    }
  });

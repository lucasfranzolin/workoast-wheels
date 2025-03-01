import { z } from "zod";

export const searchSchema = z.object({
  page: z.number().default(1).describe("The page number for pagination."),
  limit: z.number().default(10).describe("The number of results per page."),
  startTime: z.string().describe("The start time for the reservation."),
  endTime: z.string().describe("The end time for the reservation."),
  passengerCount: z
    .number()
    .default(1)
    .describe("The minimum passenger count."),
  make: z
    .array(z.string())
    .optional()
    .describe("Optional array of vehicle makes."),
  classification: z
    .array(z.string())
    .optional()
    .describe("Optional array of classifications."),
  priceMin: z.number().default(0).describe("The minimum hourly price."),
  priceMax: z
    .number()
    .default(100)
    .describe(
      "The maximum hourly price. When set to 100 or more, there is no maximum.",
    ),
});

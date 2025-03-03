import { z } from "zod";

export const quoteSchema = z.object({
  vehicleId: z.string().describe("The ID of the vehicle."),
  startTime: z.string().describe("The start time of the reservation."),
  endTime: z.string().describe("The end time of the reservation."),
});

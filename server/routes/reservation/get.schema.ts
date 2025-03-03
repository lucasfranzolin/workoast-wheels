import { z } from "zod";

export const getSchema = z.object({
  id: z.string().describe("The ID of the reservation."),
});

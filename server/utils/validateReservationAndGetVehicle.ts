import { TRPCError } from "@trpc/server";
import { prisma } from "../../prisma/client";
import { parseAndValidateTimeRange } from "./parseAndValidateTimeRange";

export const validateReservationAndGetVehicle = async (input: {
  vehicleId: string;
  startTime: string;
  endTime: string;
}) => {
  const { vehicleId, startTime, endTime } = input;
  const { start, end } = parseAndValidateTimeRange(startTime, endTime);

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
  });

  if (!vehicle) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Vehicle not found",
    });
  }

  return { vehicle, start, end };
};

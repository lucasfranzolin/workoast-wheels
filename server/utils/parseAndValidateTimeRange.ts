import { TRPCError } from "@trpc/server";

export const parseAndValidateTimeRange = (
  startTime: string,
  endTime: string,
) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (
    start.toString() === "Invalid Date" ||
    end.toString() === "Invalid Date"
  ) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid date format. Please use ISO 8601 format.",
    });
  }

  if (end <= start) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "end_time must be after start_time",
    });
  }
  return { start, end };
};

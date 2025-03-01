export const calculateTotalPrice = (
  start: Date,
  end: Date,
  hourlyRateCents: number,
) => {
  const durationInHours =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60) || 0;
  return {
    totalPriceCents: hourlyRateCents * durationInHours,
    hourlyRateCents,
    durationInHours,
  };
};

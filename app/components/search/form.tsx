import { z } from "zod";

export const formSchema = z.object({
  startDate: z.date(),
  startTime: z.string(),
  endDate: z.date(),
  endTime: z.string(),
  price: z.tuple([z.number(), z.number()]),
  minPassengers: z.number().int().nonnegative(),
  make: z.array(z.string()),
  classification: z.array(z.string()),
  page: z.number().int().nonnegative(),
});

export type FormValues = z.infer<typeof formSchema>;

export const combineDateTime = (date: Date, time: string) => {
  const [hours, minutes] = time.split(":");
  const combinedDate = new Date(date);
  combinedDate.setHours(parseInt(hours), parseInt(minutes));
  return combinedDate;
};

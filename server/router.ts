import { reservationRouter } from "./routes/reservation/index.ts";
import { vehicleRouter } from "./routes/vehicle/index.ts";
import { router } from "./trpc.ts";

export const appRouter = router({
  vehicles: vehicleRouter,
  reservations: reservationRouter,
});

export type AppRouter = typeof appRouter;

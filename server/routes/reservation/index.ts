import { router } from "../../trpc";
import { createProcedure } from "./create";
import { getProcedure } from "./get";
import { quoteProcedure } from "./quote";

export const reservationRouter = router({
  get: getProcedure,
  quote: quoteProcedure,
  create: createProcedure,
});

import { router } from "../../trpc";
import { getProcedure } from "./get";
import { optionsProcedure } from "./options";
import { searchProcedure } from "./search";

export const vehicleRouter = router({
  search: searchProcedure,
  options: optionsProcedure,
  get: getProcedure,
});

import { combineDateTime, FormValues } from "@/components/search/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Pagination, trpc } from "@/trpc.ts";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VehicleCard } from "./VehicleCard";

function PaginationButtons({ data }: { data: Pagination }) {
  const form = useFormContext<FormValues>();
  const page = form.watch("page");

  return (
    <div className="flex justify-center mt-6">
      <Button
        variant="link"
        onClick={() => form.setValue("page", page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        variant="link"
        onClick={() => form.setValue("page", page + 1)}
        disabled={page === data.totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export function VehicleList() {
  const navigate = useNavigate();

  const form = useFormContext<FormValues>();
  const startDate = form.watch("startDate");
  const startTime = form.watch("startTime");
  const endDate = form.watch("endDate");
  const endTime = form.watch("endTime");
  const minPassengers = form.watch("minPassengers");
  const classification = form.watch("classification");
  const make = form.watch("make");
  const price = form.watch("price");
  const page = form.watch("page");

  const startDateTime = useMemo(
    () => combineDateTime(startDate, startTime),
    [startDate, startTime],
  );
  const endDateTime = useMemo(
    () => combineDateTime(endDate, endTime),
    [endDate, endTime],
  );

  const [searchResponse] = trpc.vehicles.search.useSuspenseQuery(
    {
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      page: Number(page),
      passengerCount: Number(minPassengers),
      classification: classification,
      make: make,
      priceMin: price[0],
      priceMax: price[1],
    },
    {
      keepPreviousData: true,
    },
  );

  if (searchResponse.vehicles.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-muted-foreground">
          No vehicles found. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {searchResponse.vehicles.map((vehicle) => {
          const bookNowParams = new URLSearchParams({
            id: vehicle.id,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
          });
          return (
            <VehicleCard
              key={vehicle.id}
              {...vehicle}
              onReserve={() => {
                navigate({
                  pathname: "review",
                  search: bookNowParams.toString(),
                });
              }}
            />
          );
        })}
      </div>
      <PaginationButtons data={searchResponse.pagination} />
    </div>
  );
}

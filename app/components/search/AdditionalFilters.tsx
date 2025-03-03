import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/expansions/counter";
import { DualRangeSlider } from "@/components/ui/expansions/dual-range-slider";
import {
  MultipleSelector,
  Option as MultipleSelectorOption,
} from "@/components/ui/expansions/multi-selector";
import { Label } from "@/components/ui/label";
import { trpc } from "@/trpc";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./form";

function stringValuesToOption(values: string[]): MultipleSelectorOption[] {
  return values.map((value) => ({
    value,
    label: value,
  }));
}

const EmptyIndicator = () => (
  <p className="text-center text-sm text-muted-foreground">no results found.</p>
);

export function AdditionalFilters() {
  const { data } = trpc.vehicles.options.useQuery();

  const form = useFormContext<FormValues>();

  const priceMin = form.watch("price.0");
  const priceMax = form.watch("price.1");
  const minPassengers = form.watch("minPassengers");
  const classification = form.watch("classification");
  const make = form.watch("make");

  const handleChangeHourlyPriceRange = ([newMin, newMax]: number[]) => {
    if (newMin > newMax) {
      form.setValue("price.0", newMax);
      form.setValue("price.1", newMin);
    } else {
      form.setValue("price.0", newMin);
      form.setValue("price.1", newMax);
    }
  };

  return (
    <div className="div flex flex-col space-y-6 pt-12 md:pt-0">
      <div className="flex flex-col space-y-8">
        <Label>Price Range</Label>
        <DualRangeSlider
          label={(value) => value}
          value={[priceMin, priceMax]}
          onValueChange={handleChangeHourlyPriceRange}
          min={10}
          max={100}
          step={1}
          prefix="$"
        />
      </div>
      <Counter
        label="Minimum passengers"
        min={0}
        max={data ? Math.max(...data.passengerCounts) : undefined}
        value={minPassengers}
        onChange={(value) => form.setValue("minPassengers", value)}
      />
      <div>
        <Label>Classifications</Label>
        <MultipleSelector
          value={stringValuesToOption(classification)}
          onChange={(options) =>
            form.setValue(
              "classification",
              options.map((opt) => opt.value),
            )
          }
          options={stringValuesToOption(data?.classifications ?? [])}
          emptyIndicator={<EmptyIndicator />}
        />
      </div>
      <div>
        <Label>Manufacturers</Label>
        <MultipleSelector
          value={stringValuesToOption(make)}
          onChange={(options) =>
            form.setValue(
              "make",
              options.map((opt) => opt.value),
            )
          }
          options={stringValuesToOption(data?.makes ?? [])}
          emptyIndicator={<EmptyIndicator />}
        />
      </div>
      <Button onClick={() => form.reset()}>Reset</Button>
    </div>
  );
}

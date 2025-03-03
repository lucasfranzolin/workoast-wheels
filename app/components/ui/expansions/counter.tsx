import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

interface CounterProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export function Counter({
  label,
  value,
  min = 0,
  max = 10,
  onChange,
  className = "",
}: CounterProps) {
  const increment = () => {
    if (value < max) {
      const newValue = value + 1;
      onChange?.(newValue);
    }
  };

  const decrement = () => {
    if (value > min) {
      const newValue = value - 1;
      onChange?.(newValue);
    }
  };

  const id = `${label.toLowerCase().replace(/\s+/g, "-")}-counter`;

  return (
    <div className={className}>
      <Label htmlFor={id} className="text-foreground">
        {label}
      </Label>
      <div className="flex space-x-1 items-center mt-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background border-input hover:bg-accent hover:text-accent-foreground"
          onClick={decrement}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div
          className="min-w-8 text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <span id={id}>{value}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background border-input hover:bg-accent hover:text-accent-foreground"
          onClick={increment}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

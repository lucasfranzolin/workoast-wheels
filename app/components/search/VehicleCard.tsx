import type { RouterOutputs } from "@/trpc";
import { Calendar, DoorOpen, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type VehicleCardProps =
  RouterOutputs["vehicles"]["search"]["vehicles"][number] & {
    onReserve?: (id: string) => void;
  };

export function VehicleCard({
  id,
  make,
  model,
  year,
  doors,
  max_passengers,
  classification,
  thumbnail_url,
  hourly_rate_cents,
  onReserve,
}: VehicleCardProps) {
  const handleReserve = () => {
    if (onReserve) {
      onReserve(id);
    }
  };

  const hourlyRate = (hourly_rate_cents / 100).toFixed(2);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden p-3">
        <img
          src={thumbnail_url || "/placeholder.svg?height=200&width=300"}
          alt={`${make} ${model}`}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">
            {make} {model}
          </CardTitle>
          <Badge variant="outline" className="ml-2">
            {classification}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              ${hourlyRate}
              <span className="text-sm font-normal text-muted-foreground">
                /hr
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{max_passengers} passengers</span>
            </div>
            <div className="flex items-center gap-1">
              <DoorOpen className="h-4 w-4" />
              <span>{doors} doors</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleReserve}>
          Reserve now
        </Button>
      </CardFooter>
    </Card>
  );
}

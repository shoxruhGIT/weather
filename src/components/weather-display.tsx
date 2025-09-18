import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Droplets, Gauge, Thermometer, Wind } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import type { WeatherData } from "../lib/weather-api";

interface WeatherDisplayProps {
  weatherData?: WeatherData;
  isLoading: boolean;
  error?: string | null;
  unit: "celsius" | "fahrenheit";
}

const WeatherDisplay = ({
  weatherData,
  isLoading,
  error,
  unit,
}: WeatherDisplayProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-12 w-24" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const temp = weatherData?.temperature!;

  const temperature =
    unit === "fahrenheit"
      ? Math.round((temp * 9) / 5 + 32)
      : weatherData?.temperature;
  const tempUnit = unit === "fahrenheit" ? "°F" : "°C";

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-lg sm:text-xl">
              {weatherData?.city}, {weatherData?.country}
            </span>
            <Badge variant="secondary" className="w-fit">
              {weatherData?.description}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`}
              alt={weatherData?.description}
            />
            <div className="text-center sm:text-right">
              <div className="text-4xl sm:text-5xl font-bold text-primary">
                {temperature}
                {tempUnit}
              </div>
              <div className="text-sm text-muted-foreground">
                Feels like {temperature}
                {tempUnit}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card className="p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Humidity
                  </div>
                  <div className="font-semibold text-sm sm:text-base">
                    {weatherData?.humidity}%
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-green-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Wind
                  </div>
                  <div className="font-semibold text-sm sm:text-base">
                    {weatherData?.windSpeed} km/h
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-purple-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Pressure
                  </div>
                  <div className="font-semibold text-sm sm:text-base">
                    {weatherData?.pressure} hPa
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-red-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Updated
                  </div>
                  <div className="font-semibold text-xs sm:text-sm">
                    {new Date(temp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDisplay;

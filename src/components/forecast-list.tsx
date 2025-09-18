"use client";

import { Droplets, Wind } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Card, CardContent, CardTitle } from "./ui/card";
import type { ForecastData } from "../lib/weather-api";
import Loader from "./loader";

interface ForecastListProps {
  forecast?: ForecastData[];
  isLoading: boolean;
  error?: string | null;
  unit: "celsius" | "fahrenheit";
}

const ForecastList = ({ forecast, isLoading, unit }: ForecastListProps) => {
  if (isLoading) {
    return <Loader />;
  }

  if (!forecast || forecast.length === 0) {
    return (
      <Alert>
        <AlertDescription>No forecast data available</AlertDescription>
      </Alert>
    );
  }

  const convertTemp = (temp: number) =>
    unit === "fahrenheit" ? Math.round((temp * 9) / 5 + 32) : temp;

  const tempUnit = unit === "fahrenheit" ? "°F" : "°C";

  return (
    <div className="space-y-4">
      <CardTitle>5-Day Forecast</CardTitle>
      <div className="grid gap-3 forecast-grid">
        {forecast.map((day, index) => (
          <Card
            key={day.date}
            className="transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.description}
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-sm sm:text-base">
                      {index === 0
                        ? "Today"
                        : new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground capitalize truncate">
                      {day.description}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <Droplets className="h-3 w-3 flex-shrink-0" />
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <Wind className="h-3 w-3 flex-shrink-0" />
                      <span>{day.windSpeed}km/h</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm sm:text-base">
                      {convertTemp(day.temperature.max)}
                      {tempUnit}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {convertTemp(day.temperature.min)}
                      {tempUnit}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;

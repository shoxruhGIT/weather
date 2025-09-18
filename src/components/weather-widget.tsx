import {  Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import CitySelector from "./city-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import WeatherDisplay from "./weather-display";
import { useWeatherData } from "../hook/use-weather-data";
import ForecastList from "./forecast-list";
import DataVisualization from "./data-vizualation";
import { useState } from "react";
import SettingsPanel from "./settings-panel";
import { ThemeToggle } from "../server/theme-provider";

const WeatherWidget = () => {
  const { weatherData, isLoading, error, unit, refreshData } = useWeatherData();

  const [showSetting, setShowSetting] = useState(false);

  return (
    <section className="w-full max-w-[800px] mx-auto weather-widget">
      <Card className="w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-2xl font-bold text-primary">
              Weather Dashboard
            </CardTitle>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                size={"icon"}
                variant={"ghost"}
                className="w-8 h-8 cursor-pointer"
                onClick={() => setShowSetting(true)}
              >
                <Settings />
              </Button>
            </div>
          </div>
          <CitySelector />
        </CardHeader>
        <CardContent>
          {showSetting && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <SettingsPanel
                unit={unit}
                onRefresh={refreshData}
                onClose={() => setShowSetting(false)}
              />
            </div>
          )}
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="current" className="text-sm cursor-pointer">
                Current Weather
              </TabsTrigger>
              <TabsTrigger value="forecast" className="text-sm cursor-pointer">
                Forecast
              </TabsTrigger>
              <TabsTrigger
                value="statistics"
                className="text-sm cursor-pointer"
              >
                Statistics
              </TabsTrigger>
            </TabsList>
            <div className="">
              <TabsContent value="current">
                <WeatherDisplay
                  weatherData={weatherData?.current}
                  isLoading={isLoading}
                  error={error}
                  unit={unit}
                />
              </TabsContent>
              <TabsContent value="forecast">
                <ForecastList
                  forecast={weatherData?.forecast}
                  isLoading={isLoading}
                  error={error}
                  unit={unit}
                />
              </TabsContent>
              <TabsContent value="statistics">
                <DataVisualization />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default WeatherWidget;

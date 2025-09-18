import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { RefreshCw, Thermometer, X } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useWeatherData } from "../hook/use-weather-data";

interface SettingsPanelProps {
  unit: "celsius" | "fahrenheit";
  onRefresh: () => void;
  onClose: () => void;
}

const SettingsPanel = ({ unit, onRefresh, onClose }: SettingsPanelProps) => {
  const { dispatch } = useWeatherData();

  return (
    <Card className="border-accent/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Settings</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 cursor-pointer"
          >
            <X className="h-4 w-4 " />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            <Label htmlFor="unit-toggle">Temperature Unit</Label>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">°C</span>
            <Switch
              id="unit-toggle"
              className="cursor-pointer"
              checked={unit === "fahrenheit"}
              onCheckedChange={() => {
                dispatch({ type: "TOGGLE_UNIT" });
              }}
            />
            <span className="text-sm text-muted-foreground">°F</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Refresh Data</Label>
          <Button variant="outline" size="sm" onClick={onRefresh} className="cursor-pointer">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;

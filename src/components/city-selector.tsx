import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "../lib/utils";
import { useWeatherData } from "../hook/use-weather-data";

const CitySelector = () => {
  const cities = ["London", "New York", "Tokyo", "Sydney", "Cairo"];
  const { dispatch, city, isLoading } = useWeatherData();

  const [open, setOpen] = useState(false);
  

  return (
    <div className="flex items-center gap-2">
      <MapPin className="w-4 h-4" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant={"outline"}
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between bg-transparent cursor-pointer"
            disabled={isLoading}
          >
            {city}
            <ChevronsUpDown className="w-4 h-4 cursor-pointer" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search cities" />
            <CommandList>
              <CommandEmpty>No cities found</CommandEmpty>
              <CommandGroup>
                {cities.map((cty, idx) => (
                  <CommandItem
                    key={idx}
                    value={city}
                    onSelect={() =>
                      dispatch({ type: "CHANGE_CITY", payload: cty })
                    }
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        city === cty ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {cty}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CitySelector;

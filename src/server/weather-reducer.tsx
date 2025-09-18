import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { WeatherAction } from "./types";
import type { WeatherResponse } from "../lib/weather-api";

 interface WeatherState {
  weatherData: WeatherResponse | [];
  isLoading: boolean;
  error: string | null;
  unit: "celsius" | "fahrenheit";
  city: string;
}

export const weatherReducer = (
  state: WeatherState,
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case "FETCH_WEATHER":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "FETCH_WEATHER_SUCCESS":
      return {
        ...state,
        weatherData: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_WEATHER_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CHANGE_CITY":
      return {
        ...state,
        city: action.payload,
        error: null,
      };
    case "TOGGLE_UNIT":
      return {
        ...state,
        unit: state.unit === "celsius" ? "fahrenheit" : "celsius",
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const WeatherContext = createContext<{
  state: WeatherState;
  dispatch: React.Dispatch<WeatherAction>;
} | null>(null);

const initialState: WeatherState = {
  weatherData: [],
  isLoading: false,
  error: null,
  unit: "celsius",
  city: "Sydney",
};

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);

  return context;
};

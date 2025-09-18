import type { WeatherResponse } from "../lib/weather-api";

export type WeatherAction =
  | { type: "FETCH_WEATHER" }
  | { type: "FETCH_WEATHER_SUCCESS"; payload: WeatherResponse }
  | { type: "FETCH_WEATHER_ERROR"; payload: any }
  | { type: "CHANGE_CITY"; payload: string }
  | { type: "TOGGLE_UNIT" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" };

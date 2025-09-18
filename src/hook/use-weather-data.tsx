import { useCallback, useEffect } from "react";
import { fetchWeatherData, type WeatherResponse } from "../lib/weather-api";
import { useWeather } from "../server/weather-reducer";

export const useWeatherData = () => {
  const { state, dispatch } = useWeather();

  const fetchWeather = useCallback(async () => {
    try {
      dispatch({ type: "FETCH_WEATHER" });
      const data = await fetchWeatherData(state.city);
      dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: data });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to fetch";
      dispatch({ type: "FETCH_WEATHER_ERROR", payload: errMsg });
    }
  }, [state.city, dispatch]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    ...state,
    dispatch,
    weatherData: state.weatherData,
    isLoading: state.isLoading,
    error: state.error,
    unit: state.unit,
  };
};

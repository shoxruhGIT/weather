// Real OpenWeatherMap API service
export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  icon: string;
  timestamp: number;
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
    avg: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastData[];
}

const API_KEY = "9c53ebe02251296d3e778beec1e3dab0";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Throttling utility - max 1 call per 5 seconds
let lastApiCall = 0;
const API_THROTTLE_DELAY = 5000;

export const throttleApiCall = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    const now = Date.now();
    const timeSinceLastCall = now - lastApiCall;

    if (timeSinceLastCall < API_THROTTLE_DELAY) {
      const waitTime = API_THROTTLE_DELAY - timeSinceLastCall;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    lastApiCall = Date.now();
    return fn(...args);
  };
};

const mapWeatherIcon = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
    "01d": "sunny",
    "01n": "sunny",
    "02d": "partly-cloudy",
    "02n": "partly-cloudy",
    "03d": "cloudy",
    "03n": "cloudy",
    "04d": "cloudy",
    "04n": "cloudy",
    "09d": "rainy",
    "09n": "rainy",
    "10d": "rainy",
    "10n": "rainy",
    "11d": "thunderstorm",
    "11n": "thunderstorm",
    "13d": "snowy",
    "13n": "snowy",
    "50d": "foggy",
    "50n": "foggy",
  };
  return iconMap[iconCode] || "partly-cloudy";
};

const transformForecastData = (forecastList: any[]): ForecastData[] => {
  // Group forecast data by date
  const dailyData: Record<string, any[]> = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  // Transform to our format
  return Object.entries(dailyData)
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((item) => item.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      const avgTemp = Math.round(
        temps.reduce((sum, temp) => sum + temp, 0) / temps.length
      );

      // Use the most common weather condition for the day
      const weatherCounts: Record<string, number> = {};
      items.forEach((item) => {
        const weather = item.weather[0].main;
        weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
      });
      const mostCommonWeather = Object.entries(weatherCounts).reduce((a, b) =>
        weatherCounts[a[0]] > weatherCounts[b[0]] ? a : b
      )[0];

      const representativeItem =
        items.find((item) => item.weather[0].main === mostCommonWeather) ||
        items[0];

      return {
        date,
        temperature: {
          min: Math.round(minTemp),
          max: Math.round(maxTemp),
          avg: avgTemp,
        },
        description: representativeItem.weather[0].description,
        icon: mapWeatherIcon(representativeItem.weather[0].icon),
        humidity: representativeItem.main.humidity,
        windSpeed: Math.round(representativeItem.wind.speed * 3.6), // Convert m/s to km/h
      };
    });
};

const fetchWeatherDataInternal = async (
  city: string
): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found`);
      } else if (response.status === 401) {
        throw new Error("Invalid API key");
      } else {
        throw new Error(`Weather data unavailable (${response.status})`);
      }
    }

    const data = await response.json();

    // Transform current weather data
    const currentWeather = data.list[0];
    const current: WeatherData = {
      city: data.city.name,
      country: data.city.country,
      temperature: Math.round(currentWeather.main.temp),
      description: currentWeather.weather[0].description,
      humidity: currentWeather.main.humidity,
      windSpeed: Math.round(currentWeather.wind.speed * 3.6), // Convert m/s to km/h
      pressure: currentWeather.main.pressure,
      icon: mapWeatherIcon(currentWeather.weather[0].icon),
      timestamp: Date.now(),
    };

    // Transform forecast data
    const forecast = transformForecastData(data.list);

    return {
      current,
      forecast,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch weather data");
  }
};

// Throttled API call
export const fetchWeatherData = throttleApiCall(fetchWeatherDataInternal);

// Available cities
export const AVAILABLE_CITIES = [
  "London",
  "New York",
  "Tokyo",
  "Sydney",
  "Cairo",
];

// Temperature conversion utilities
export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9) / 5 + 32);
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

// Data transformation utilities
export const calculateDailyAverages = (forecast: ForecastData[]) => {
  return forecast.map((day) => ({
    ...day,
    temperature: {
      ...day.temperature,
      avg: Math.round((day.temperature.min + day.temperature.max) / 2),
    },
  }));
};

export const findTemperatureStats = (forecast: ForecastData[]) => {
  const allTemps = forecast.flatMap((day) => [
    day.temperature.min,
    day.temperature.max,
  ]);
  return {
    min: Math.min(...allTemps),
    max: Math.max(...allTemps),
    average: Math.round(
      allTemps.reduce((sum, temp) => sum + temp, 0) / allTemps.length
    ),
  };
};

// Custom sorting utility
export const sortWeatherDataByDate = (forecast: ForecastData[]) => {
  return [...forecast].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

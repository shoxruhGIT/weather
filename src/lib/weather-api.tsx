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

const forecastWeatherData = (forecast: any[]): ForecastData[] => {
  const dailyData: Record<string, any[]> = {};

  forecast.forEach((item) => {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];

    if (!dailyData[date]) {
      dailyData[date] = [];
    }

    dailyData[date].push(item);
  });

  return Object.entries(dailyData)
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((item) => item.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      const avgTemp = Math.round(
        temps.reduce((sum, temp) => sum + temp, 0) / temps.length
      );

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
        icon: representativeItem.weather[0].icon,
        humidity: representativeItem.main.humidity,
        windSpeed: Math.round(representativeItem.wind.speed * 3.6), // Convert m/s to km/h
      };
    });
};

export const fetchWeatherData = async (
  city: string
): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    const currentWeather = data.list[0];
    const current: WeatherData = {
      city: data.city.name,
      country: data.city.country,
      temperature: Math.round(currentWeather.main.temp),
      description: currentWeather.weather[0].description,
      humidity: currentWeather.main.humidity,
      windSpeed: Math.round(currentWeather.wind.speed * 3.6),
      pressure: currentWeather.main.pressure,
      icon: currentWeather.weather[0].icon,
      timestamp: Date.now(),
    };

    const forecast = forecastWeatherData(data.list);

    return {
      current,
      forecast,
    };
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};

export const sortWeatherDataByDate = (forecast: ForecastData[]) => {
  return [...forecast].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
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

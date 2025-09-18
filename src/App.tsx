import WeatherWidget from "./components/weather-widget";

export default function Home() {
  return (
    <main className="min-h-screen p-4 flex items-center justify-center">
      <WeatherWidget />
    </main>
  );
}

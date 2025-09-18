# Weather Dashboard Widget

A comprehensive React-based weather dashboard widget built with Next.js, TypeScript, and Tailwind CSS. This application demonstrates advanced frontend development skills including component architecture, state management, data visualization, and responsive design.

## Features

### Core Functionality
- **Multi-city Weather Data**: Support for 5 cities (London, New York, Tokyo, Sydney, Cairo)
- **Real-time Weather Display**: Current conditions with temperature, humidity, wind speed, and pressure
- **5-Day Forecast**: Detailed daily forecasts with min/max temperatures
- **Interactive Data Visualization**: Custom SVG temperature charts with trend analysis
- **Temperature Unit Conversion**: Toggle between Celsius and Fahrenheit
- **Dark/Light Theme**: Complete theme system with smooth transitions

### Technical Features
- **Custom State Management**: Reducer pattern with specific actions (FETCH_WEATHER, CHANGE_CITY, TOGGLE_UNIT, SET_ERROR, CLEAR_ERROR)
- **API Throttling**: Maximum 1 API call per 5 seconds
- **Debounced Search**: 300ms delay for city search input
- **Form Validation**: Comprehensive validation for city search with specific error messages
- **Responsive Design**: 800px desktop width, fully mobile-optimized
- **Performance Optimized**: Efficient rendering and state updates

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd weather-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Architecture

### Component Structure
```
components/
├── weather-widget.tsx # Main container component
├── city-selector.tsx # Dropdown with search functionality
├── weather-display.tsx # Current weather display
├── forecast-list.tsx # 5-day forecast cards
├── data-visualization.tsx # Statistics and charts container
├── weather-icon.tsx # Weather condition icons
├── settings-panel.tsx # Configuration options
```

### Custom Hooks
- **`useWeatherData`**: Manages all weather data fetching, state, and transformations
- **`useTheme`**: Handles dark/light theme switching with system preference detection

### Utility Functions
- **Temperature Conversion**: `celsiusToFahrenheit`, `fahrenheitToCelsius`
- **Data Transformation**: `calculateDailyAverages`, `findTemperatureStats`, `sortWeatherDataByDate`
- **Performance**: `throttleApiCall`, `debounce`, `debounceSearch`
- **Validation**: `validateCityName`, `validateSearchInput`, `sanitizeCityName`

### State Management
The application uses a reducer pattern with the following actions:
- `FETCH_WEATHER`: Initiate weather data fetching
- `FETCH_WEATHER_SUCCESS`: Handle successful API response
- `FETCH_WEATHER_ERROR`: Handle API errors
- `CHANGE_CITY`: Switch to different city
- `TOGGLE_UNIT`: Switch between Celsius/Fahrenheit
- `SET_ERROR`: Set custom error message
- `CLEAR_ERROR`: Clear error state

## Design System

### Color Palette
- **Light Theme**: Background `#f8f9fa`, Text `#212529`, Accent `#0d6efd`
- **Dark Theme**: Background `#212529`, Text `#f8f9fa`, Accent `#0d6efd`

### Typography
- **Primary Font**: Geist Sans for headings and UI elements
- **Secondary Font**: Geist Mono for monospace content

### Responsive Breakpoints
- **Desktop**: 800px fixed width with centered layout
- **Tablet**: Responsive grid layouts with optimized spacing
- **Mobile**: Single-column layout with touch-friendly interactions

## Performance Optimizations

1. **API Throttling**: Prevents excessive API calls with 5-second minimum intervals
2. **Debounced Search**: Reduces search API calls with 300ms delay
3. **Efficient Re-renders**: Optimized component updates with proper dependency arrays
4. **Lazy Loading**: Components load only when needed
5. **Memory Management**: Proper cleanup of timers and event listeners


### Key Test Areas
- `useWeatherData` hook functionality
- Temperature conversion accuracy
- Debounce function behavior
- Component rendering states (loading, error, success)
- API error handling
- Theme switching functionality


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- OpenWeatherMap API for weather data structure reference
- Radix UI for accessible component primitives
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography

# 🌤️ Weather Dashboard

A modern, responsive weather dashboard web application that fetches real-time weather data for any city worldwide. Built with vanilla HTML, CSS, and JavaScript as part of learning JavaScript fundamentals, DOM manipulation, and API integration.

![Weather Dashboard Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=Weather+Dashboard)

## ✨ Features

- **🔍 City Search**: Enter any city name to get current weather conditions
- **🌡️ Real-time Data**: Fetches live weather data using the Open-Meteo API
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **💾 Persistent Storage**: Remembers your last searched city using localStorage
- **⏳ Loading States**: Visual feedback while data is being fetched
- **⚠️ Error Handling**: User-friendly error messages for invalid cities or network issues
- **🎨 Modern UI**: Glassmorphism design with smooth animations

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript (ES6+)** - Async/await, Fetch API, DOM manipulation
- **[Open-Meteo API](https://open-meteo.com/)** - Free weather data (no API key required!)

## 📚 JavaScript Concepts Demonstrated

| Concept | Usage in Project |
|---------|-----------------|
| Variables (`const`, `let`) | API URLs, DOM elements, weather data |
| Functions | `fetchWeather()`, `displayWeather()`, `showError()` |
| Objects | Weather code mapping, API responses |
| Arrays | API results handling |
| Conditionals | Error checking, weather icon selection |
| DOM Selection | `getElementById()`, `querySelector()` |
| Event Handling | Form submit, button click |
| Class Toggling | Show/hide loading, error, results states |
| `async`/`await` | Fetching data from APIs |
| `fetch()` API | HTTP requests to Open-Meteo |
| JSON Handling | Parsing API responses |
| `localStorage` | Persisting last searched city |
| Error Handling | Try/catch blocks, user-friendly messages |

## 🚀 Getting Started

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Open in browser**
   
   Simply open `index.html` in your web browser:
   - Double-click the file, OR
   - Right-click → Open with → Choose your browser, OR
   - Use a local server (recommended for development):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (npx)
     npx serve
     ```

3. **Start searching!**
   
   Enter a city name and click "Search" to see the weather.

### Deploy to GitHub Pages

1. Push your code to a GitHub repository
2. Go to **Settings** → **Pages**
3. Under "Source", select **main** branch and **/ (root)**
4. Click **Save**
5. Your site will be live at `https://YOUR_USERNAME.github.io/weather-dashboard/`

## 📁 Project Structure

```
weather-dashboard/
├── index.html      # Main HTML structure
├── style.css       # Styling with CSS custom properties
├── script.js       # JavaScript logic and API integration
└── README.md       # Project documentation (this file)
```

## 🌐 API Reference

This project uses the [Open-Meteo API](https://open-meteo.com/), a free and open-source weather API.

### Endpoints Used

1. **Geocoding API** - Converts city names to coordinates
   ```
   https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1
   ```

2. **Weather API** - Fetches current weather data
   ```
   https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m
   ```

## 📸 Screenshots

### Desktop View
*Modern glassmorphism design with animated background*

### Mobile View  
*Fully responsive layout for smaller screens*

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Font: [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts
- Weather emoji icons from Unicode

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ as part of learning JavaScript and web development

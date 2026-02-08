 
 
// DOM Element Selection
 
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');
const weatherResults = document.getElementById('weather-results');
const lastSearchedEl = document.getElementById('last-searched');
const lastCitySpan = document.getElementById('last-city');

// Weather display elements
const cityNameEl = document.getElementById('city-name');
const weatherConditionEl = document.getElementById('weather-condition');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const windSpeedEl = document.getElementById('wind-speed');
const humidityEl = document.getElementById('humidity');
const feelsLikeEl = document.getElementById('feels-like');

 
// API Configuration
 
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
 
// Weather Code Mapping
 
// Maps Open-Meteo weather codes to descriptions and icons
const weatherCodeMap = {
    0: { description: 'Clear sky', icon: '☀️' },
    1: { description: 'Mainly clear', icon: '🌤️' },
    2: { description: 'Partly cloudy', icon: '⛅' },
    3: { description: 'Overcast', icon: '☁️' },
    45: { description: 'Foggy', icon: '🌫️' },
    48: { description: 'Depositing rime fog', icon: '🌫️' },
    51: { description: 'Light drizzle', icon: '🌧️' },
    53: { description: 'Moderate drizzle', icon: '🌧️' },
    55: { description: 'Dense drizzle', icon: '🌧️' },
    56: { description: 'Light freezing drizzle', icon: '🌨️' },
    57: { description: 'Dense freezing drizzle', icon: '🌨️' },
    61: { description: 'Slight rain', icon: '🌧️' },
    63: { description: 'Moderate rain', icon: '🌧️' },
    65: { description: 'Heavy rain', icon: '🌧️' },
    66: { description: 'Light freezing rain', icon: '🌨️' },
    67: { description: 'Heavy freezing rain', icon: '🌨️' },
    71: { description: 'Slight snow fall', icon: '🌨️' },
    73: { description: 'Moderate snow fall', icon: '🌨️' },
    75: { description: 'Heavy snow fall', icon: '❄️' },
    77: { description: 'Snow grains', icon: '🌨️' },
    80: { description: 'Slight rain showers', icon: '🌦️' },
    81: { description: 'Moderate rain showers', icon: '🌦️' },
    82: { description: 'Violent rain showers', icon: '⛈️' },
    85: { description: 'Slight snow showers', icon: '🌨️' },
    86: { description: 'Heavy snow showers', icon: '❄️' },
    95: { description: 'Thunderstorm', icon: '⛈️' },
    96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
    99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' }
};

 
/**
 * Shows an element by removing the 'hidden' class
 * @param {HTMLElement} element - The element to show
 */
function showElement(element) {
    element.classList.remove('hidden');
}

/**
 * Hides an element by adding the 'hidden' class
 * @param {HTMLElement} element - The element to hide
 */
function hideElement(element) {
    element.classList.add('hidden');
}

/**
 * Clears all result states (loading, error, weather)
 */
function clearAllStates() {
    hideElement(loadingEl);
    hideElement(errorEl);
    hideElement(weatherResults);
}

/**
 * Shows the loading state
 */
function showLoading() {
    clearAllStates();
    showElement(loadingEl);
}

/**
 * Shows an error message
 * @param {string} message - The error message to display
 */
function showError(message) {
    clearAllStates();
    errorMessage.textContent = message;
    showElement(errorEl);
}

/**
 * Gets weather info from weather code
 * @param {number} code - Weather code from API
 * @returns {Object} Object with description and icon
 */
function getWeatherInfo(code) {
    return weatherCodeMap[code] || { description: 'Unknown', icon: '🌡️' };
}

 
// localStorage Functions
 

/**
 * Saves the last searched city to localStorage
 * @param {string} cityName - The city name to save
 */
function saveLastCity(cityName) {
    try {
        localStorage.setItem('weatherDashboard_lastCity', cityName);
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

/**
 * Gets the last searched city from localStorage
 * @returns {string|null} The last searched city or null
 */
function getLastCity() {
    try {
        return localStorage.getItem('weatherDashboard_lastCity');
    } catch (error) {
        console.warn('Could not read from localStorage:', error);
        return null;
    }
}

/**
 * Updates the "last searched" display
 * @param {string} cityName - The city name to display
 */
function updateLastSearchedDisplay(cityName) {
    if (cityName) {
        lastCitySpan.textContent = cityName;
        showElement(lastSearchedEl);
    }
}
 
// API Functions
 

/**
 * Fetches coordinates for a city name using Geocoding API
 * @param {string} cityName - The city to search for
 * @returns {Promise<Object>} Location data with lat, lon, and name
 * @throws {Error} If city is not found
 */
async function getCoordinates(cityName) {
    const url = `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Failed to connect to geocoding service');
    }
    
    const data = await response.json();
    
    // Check if any results were found
    if (!data.results || data.results.length === 0) {
        throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
    }
    
    const location = data.results[0];
    
    return {
        lat: location.latitude,
        lon: location.longitude,
        name: location.name,
        country: location.country || ''
    };
}

/**
 * Fetches weather data for given coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
async function getWeatherData(lat, lon) {
    const url = `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    if (!data.current) {
        throw new Error('Weather data not available');
    }
    
    return data.current;
}

/**
 * Main function to fetch and display weather for a city
 * @param {string} cityName - The city to get weather for
 */
async function fetchWeather(cityName) {
    // Validate input
    if (!cityName || cityName.trim() === '') {
        showError('Please enter a city name');
        return;
    }
    
    // Clean the city name
    const cleanCityName = cityName.trim();
    
    // Show loading state
    showLoading();
    
    try {
        // Step 1: Get coordinates from city name
        const location = await getCoordinates(cleanCityName);
        
        // Step 2: Get weather data using coordinates
        const weatherData = await getWeatherData(location.lat, location.lon);
        
        // Step 3: Display the weather
        displayWeather(location, weatherData);
        
        // Step 4: Save to localStorage
        const displayName = location.country 
            ? `${location.name}, ${location.country}` 
            : location.name;
        saveLastCity(displayName);
        updateLastSearchedDisplay(displayName);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message || 'Something went wrong. Please try again.');
    }
}

/**
 * Displays weather data in the UI
 * @param {Object} location - Location information
 * @param {Object} weatherData - Current weather data
 */
function displayWeather(location, weatherData) {
    clearAllStates();
    
    // Get weather info from code
    const weatherInfo = getWeatherInfo(weatherData.weather_code);
    
    // Format display name with country if available
    const displayName = location.country 
        ? `${location.name}, ${location.country}` 
        : location.name;
    
    // Update DOM elements
    cityNameEl.textContent = displayName;
    weatherConditionEl.textContent = weatherInfo.description;
    weatherIconEl.textContent = weatherInfo.icon;
    temperatureEl.textContent = Math.round(weatherData.temperature_2m);
    windSpeedEl.textContent = `${weatherData.wind_speed_10m} km/h`;
    humidityEl.textContent = `${weatherData.relative_humidity_2m}%`;
    feelsLikeEl.textContent = `${Math.round(weatherData.apparent_temperature)}°C`;
    
    // Show the weather card
    showElement(weatherResults);
}

 
/**
 * Handles form submission
 * @param {Event} event - The submit event
 */
function handleFormSubmit(event) {
    // Prevent default form submission (page reload)
    event.preventDefault();
    
    // Get the city name from input
    const cityName = cityInput.value;
    
    // Fetch weather for the city
    fetchWeather(cityName);
}

/**
 * Handles retry button click
 */
function handleRetry() {
    const cityName = cityInput.value;
    if (cityName) {
        fetchWeather(cityName);
    } else {
        hideElement(errorEl);
        cityInput.focus();
    }
}
 
searchForm.addEventListener('submit', handleFormSubmit);

// Retry button
retryBtn.addEventListener('click', handleRetry);

 
function init() {
    // Check for last searched city in localStorage
    const lastCity = getLastCity();
    
    if (lastCity) {
        // Show the last city in the "last searched" display
        updateLastSearchedDisplay(lastCity);
        
        // Optionally pre-fill the input with the last city
        cityInput.value = lastCity;
        
        // Automatically fetch weather for the last city
        fetchWeather(lastCity);
    }
    
    // Focus the search input for better UX
    cityInput.focus();
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);

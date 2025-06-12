export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
export const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY || '';

if (!GOOGLE_MAPS_API_KEY) {
  console.warn('Google Maps API key is not set. Please set REACT_APP_GOOGLE_MAPS_API_KEY in your environment variables.');
}

if (!NASA_API_KEY) {
  console.warn('NASA API key is not set. Please set REACT_APP_NASA_API_KEY in your environment variables.');
} 
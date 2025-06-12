import { NASA_API_KEY } from './apiKey';

// Debug logging
console.log('API Key available:', !!NASA_API_KEY);
console.log('API Key length:', NASA_API_KEY?.length);

if (!NASA_API_KEY) {
    console.error('API key is not defined.');
}

export const API_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

export const getApiUrl = (endpoint: string) => {
    const url = `${API_BASE_URL}${endpoint}?api_key=${NASA_API_KEY}`;
    console.log('Generated URL:', url);
    return url;
};

export const fetchNeoData = async (startDate: string, endDate: string) => {
    const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`
    );
    if (!response.ok) {
        throw new Error('Failed to fetch NEO data');
    }
    return response.json();
};

export { NASA_API_KEY } from './apiKey'; 
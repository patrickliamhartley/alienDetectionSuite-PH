import { API_KEY } from './apiKey';

// Debug logging
console.log('API Key available:', !!API_KEY);
console.log('API Key length:', API_KEY?.length);

if (!API_KEY) {
    console.error('API key is not defined.');
}

export const API_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

export const getApiUrl = (endpoint: string) => {
    const url = `${API_BASE_URL}${endpoint}?api_key=${API_KEY}`;
    console.log('Generated URL:', url);
    return url;
};

export const fetchNeoData = async (startDate: string, endDate: string, apiKey: string) => {
    const response = await fetch(`${API_BASE_URL}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`);
    if (!response.ok) {
        throw new Error('Failed to fetch NEO data');
    }
    return response.json();
};

export { API_KEY } from './apiKey'; 
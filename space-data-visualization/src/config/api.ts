import { API_KEY } from './apiKey';

// Debug logging
console.log('API Key available:', !!API_KEY);
console.log('API Key length:', API_KEY?.length);

if (!API_KEY) {
    console.error('API key is not defined.');
}

export const API_BASE_URL = 'https://api.nasa.gov';

export const getApiUrl = (endpoint: string) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('Generated URL:', url);
    return url;
}; 
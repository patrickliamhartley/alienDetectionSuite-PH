import { useState, useCallback } from 'react';
import { getApiUrl } from '../config/api';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useApi<T>() {
    const [state, setState] = useState<ApiResponse<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const fetchData = useCallback(async (endpoint: string) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        try {
            const url = getApiUrl(endpoint);
            console.log('Making request to:', url);
            
            const response = await fetch(url);
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            
            const data = await response.json();
            setState({ data, loading: false, error: null });
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            console.error('API Error:', errorMessage);
            setState({ data: null, loading: false, error: new Error(errorMessage) });
            throw error;
        }
    }, []);

    return {
        ...state,
        fetchData,
    };
} 
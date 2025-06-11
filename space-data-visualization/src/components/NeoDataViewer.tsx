import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { useApi } from '../hooks/useApi';

interface NeoData {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }>;
}

export const NeoDataViewer: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { data, loading, error, fetchData } = useApi<NeoData>();

  const handleDateChange = async (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      // Using the DEMO_KEY for testing
      await fetchData('/neo/rest/v1/neo/3542519?api_key=DEMO_KEY');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            NASA NEO Data Viewer
          </Typography>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            sx={{ width: '100%', mb: 2 }}
          />
        </Paper>

        {loading && (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Paper elevation={3} sx={{ p: 3, bgcolor: '#ffebee' }}>
            <Typography color="error">Error: {error.message}</Typography>
          </Paper>
        )}

        {data && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Asteroid Details
            </Typography>
            <Typography>
              <strong>Name:</strong> {data.name}
            </Typography>
            <Typography>
              <strong>ID:</strong> {data.id}
            </Typography>
            <Typography>
              <strong>Absolute Magnitude:</strong> {data.absolute_magnitude_h}
            </Typography>
            <Typography>
              <strong>Estimated Diameter:</strong>{' '}
              {data.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} -{' '}
              {data.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
            </Typography>
            <Typography>
              <strong>Potentially Hazardous:</strong>{' '}
              {data.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
              Close Approach Data
            </Typography>
            {data.close_approach_data.map((approach, index) => (
              <Paper key={index} sx={{ p: 2, mb: 1, bgcolor: '#f5f5f5' }}>
                <Typography>
                  <strong>Date:</strong> {approach.close_approach_date}
                </Typography>
                <Typography>
                  <strong>Relative Velocity:</strong>{' '}
                  {parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(2)} km/h
                </Typography>
                <Typography>
                  <strong>Miss Distance:</strong>{' '}
                  {parseFloat(approach.miss_distance.kilometers).toFixed(2)} km
                </Typography>
              </Paper>
            ))}
          </Paper>
        )}
      </Box>
    </LocalizationProvider>
  );
}; 
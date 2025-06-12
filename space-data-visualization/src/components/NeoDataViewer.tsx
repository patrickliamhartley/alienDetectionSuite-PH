import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Alert, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import NeoVisualization from './NeoVisualization';
import { fetchNeoData } from '../config/api';
import TerminalLoading from './TerminalLoading';

const NeoDataViewer: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      const formattedEndDate = format(endDate, 'yyyy-MM-dd');
      const result = await fetchNeoData(formattedStartDate, formattedEndDate);
      setData(result);
    } catch (err) {
      setError('Failed to fetch NEO data. Please check your API key configuration.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper 
        sx={{ 
          p: 2, 
          mb: 2, 
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid var(--terminal-green)',
          boxShadow: '0 0 10px var(--terminal-glow)'
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: 'var(--terminal-green)',
            fontFamily: 'Courier New, monospace',
            textShadow: '0 0 5px var(--terminal-glow)'
          }}
        >
          MOTHERSHIP TRACKING SYSTEM
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'var(--terminal-green)',
            mb: 2,
            fontFamily: 'Courier New, monospace'
          }}
        >
          Select date range to analyze mothership movement patterns
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              sx={{
                '& .MuiInputBase-root': {
                  color: 'var(--terminal-green)',
                  fontFamily: 'Courier New, monospace'
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--terminal-green)'
                }
              }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              sx={{
                '& .MuiInputBase-root': {
                  color: 'var(--terminal-green)',
                  fontFamily: 'Courier New, monospace'
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--terminal-green)'
                }
              }}
            />
          </Box>
          <Button 
            variant="contained" 
            onClick={handleSearch}
            sx={{
              backgroundColor: 'transparent',
              border: '1px solid var(--terminal-green)',
              color: 'var(--terminal-green)',
              fontFamily: 'Courier New, monospace',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                boxShadow: '0 0 10px var(--terminal-glow)'
              }
            }}
          >
            INITIALIZE TRACKING
          </Button>
        </LocalizationProvider>
      </Paper>

      {loading && <TerminalLoading />}

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'var(--terminal-green)',
            border: '1px solid var(--terminal-green)',
            '& .MuiAlert-icon': {
              color: 'var(--terminal-green)'
            }
          }}
        >
          {error}
        </Alert>
      )}

      {data && <NeoVisualization data={data} />}
    </Box>
  );
};

export default NeoDataViewer; 
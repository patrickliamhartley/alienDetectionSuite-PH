import React from 'react';
import { Box, Typography } from '@mui/material';

const RetroTitle: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      py: 1,
      fontFamily: 'Courier New, monospace',
      color: '#00ff00',
      textShadow: '0 0 10px #00ff00',
      animation: 'glow 2s ease-in-out infinite alternate'
    }}>
      <Typography 
        variant="h5" 
        sx={{
          fontFamily: 'Courier New, monospace',
          fontWeight: 'bold',
          letterSpacing: '1px',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          width: '100%'
        }}
      >
      
      PATRICK'S ALIEN DETECTION SYSTEM 
  

      </Typography>
      <Typography 
        variant="caption" 
        sx={{
          fontFamily: 'Courier New, monospace',
          mt: 1,
          opacity: 0.8,
          animation: 'blink 2s infinite',
          display: 'block',
          textAlign: 'center',
          width: '100%'
        }}
      >
        [ SYSTEM STATUS: ONLINE ]
      </Typography>
    </Box>
  );
};

export default RetroTitle; 
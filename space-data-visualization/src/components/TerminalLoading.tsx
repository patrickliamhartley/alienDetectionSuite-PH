import React from 'react';
import { Box } from '@mui/material';

const TerminalLoading: React.FC = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      my: 4,
      fontFamily: 'Courier New, monospace',
      color: '#00ff00',
      textShadow: '0 0 10px #00ff00',
      animation: 'blink 1s step-end infinite'
    }}>
      <Box sx={{ 
        position: 'relative',
        '&::before': {
          content: '">"',
          position: 'absolute',
          left: '-20px',
          animation: 'blink 1s step-end infinite'
        }
      }}>
        INITIALIZING LOCAL ALIEN DETECTION SYSTEM
        <Box sx={{ 
          display: 'inline-block',
          width: '10px',
          height: '20px',
          backgroundColor: '#00ff00',
          marginLeft: '5px',
          animation: 'blink 1s step-end infinite',
          boxShadow: '0 0 10px #00ff00'
        }} />
      </Box>
    </Box>
  );
};

export default TerminalLoading; 
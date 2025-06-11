import React from 'react';
import './App.css';
import { NeoDataViewer } from './components/NeoDataViewer';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <NeoDataViewer />
      </div>
    </ThemeProvider>
  );
}

export default App;

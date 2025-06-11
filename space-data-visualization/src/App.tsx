import React from 'react';
import './App.css';
import NeoDataViewer from './components/NeoDataViewer';
import LocalAlienDetection from './components/LocalAlienDetection';
import { CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Space Data Visualization
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Solar System
            </Button>
            <Button color="inherit" component={Link} to="/local-alien-detection">
              Local Alien Detection
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/" element={<NeoDataViewer />} />
            <Route path="/local-alien-detection" element={<LocalAlienDetection />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

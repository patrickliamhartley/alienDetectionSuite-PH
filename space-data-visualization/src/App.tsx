import React from 'react';
import './App.css';
import NeoDataViewer from './components/NeoDataViewer';
import LocalAlienDetection from './components/LocalAlienDetection';
import NeoVisualization from './components/NeoVisualization';
import { CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Space Data Visualization
            </Typography>
            <Button color="inherit" component={Link} to="/nearbyaliens">
              Local Detection
            </Button>
            <Button color="inherit" component={Link} to="/motherships">
              Mothership Detection
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Box sx={{ mt: 4 }}>
            <Routes>
              <Route path="/nearbyaliens" element={<LocalAlienDetection />} />
              <Route path="/motherships" element={<NeoDataViewer />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

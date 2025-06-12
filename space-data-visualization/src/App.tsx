import React from 'react';
import './App.css';
import './styles/terminalTheme.css';
import NeoDataViewer from './components/NeoDataViewer';
import LocalAlienDetection from './components/LocalAlienDetection';
import RetroTitle from './components/RetroTitle';
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
              <RetroTitle />
            </Typography>
            <Button color="inherit" component={Link} to="/nearbyaliens">
              Local Alien Detection
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

import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../config/apiKey';

interface AlienShip {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  attributes: {
    speed: number;
    size: string;
    color: string;
  };
}

const LocalAlienDetection: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alienShips, setAlienShips] = useState<AlienShip[]>([]);
  const [selectedShip, setSelectedShip] = useState<AlienShip | null>(null);

  let interalShipVariance = 0.3;
  let numberOfShips = 10;

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
          generateAlienShips(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError('Failed to retrieve your location. Defaulting to Area 51.');
          setLocation({ latitude: 37.235, longitude: -115.8111 }); // Area 51 coordinates
          setLoading(false);
          generateAlienShips(37.235, -115.8111);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Defaulting to Area 51.');
      setLocation({ latitude: 37.235, longitude: -115.8111 }); // Area 51 coordinates
      setLoading(false);
      generateAlienShips(37.235, -115.8111);
    }
  }, []);

  const generateAlienShips = (userLat: number, userLng: number) => {
    const ships: AlienShip[] = [];
    for (let i = 0; i < numberOfShips; i++) {
      const ship: AlienShip = {
        id: i,
        latitude: userLat + (Math.random() - 0.5) * interalShipVariance,
        longitude: userLng + (Math.random() - 0.5) * interalShipVariance,
        name: `Alien Ship ${i + 1}`,
        attributes: {
          speed: Math.floor(Math.random() * 100),
          size: ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)],
          color: ['Red', 'Blue', 'Green'][Math.floor(Math.random() * 3)],
        },
      };
      ships.push(ship);
    }
    setAlienShips(ships);
  };

  const handleShipClick = (ship: AlienShip) => {
    setSelectedShip(ship);
  };

  const handleCloseDialog = () => {
    setSelectedShip(null);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '450px',
  };

  const center = location ? { lat: location.latitude, lng: location.longitude } : { lat: 37.235, lng: -115.8111 };

  const alienShipIcon = (color: string) => ({
    url: 'https://pic.onlinewebfonts.com/thumbnails/icons_10168.svg'
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Local Alien Detection
      </Typography>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {location && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Your current location: {location.latitude}, {location.longitude}
          </Typography>
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
              {alienShips.map((ship) => (
                <Marker
                  key={ship.id}
                  position={{ lat: ship.latitude, lng: ship.longitude }}
                  icon={alienShipIcon(ship.attributes.color)}
                  onClick={() => handleShipClick(ship)}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </Box>
      )}
      <Dialog open={!!selectedShip} onClose={handleCloseDialog}>
        {selectedShip && (
          <>
            <DialogTitle>{selectedShip.name}</DialogTitle>
            <DialogContent>
              <Typography>Speed: {selectedShip.attributes.speed}</Typography>
              <Typography>Size: {selectedShip.attributes.size}</Typography>
              <Typography>Color: {selectedShip.attributes.color}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default LocalAlienDetection; 
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '../config/apiKey';
import SpaceShipIcon from './SpaceShipIcon';

interface AlienShip {
  id: number;
  latitude: number;
  longitude: number;
  angle: number;
  name: string;
  attributes: {
    speed: number;
    size: string;
    color: string;
  };
}

let shipNumber = 10;
let scaleConstantBig = 10;
let scaleConstantSmall = 1;

const LocalAlienDetection: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alienShips, setAlienShips] = useState<AlienShip[]>([]);
  const [selectedShip, setSelectedShip] = useState<AlienShip | null>(null);

  const generateAlienShips = React.useCallback((userLat: number, userLng: number) => {
    const ships: AlienShip[] = [];
    for (let i = 0; i < shipNumber; i++) {
      const ship: AlienShip = {
        id: i,
        latitude: userLat + (Math.random() - 0.5) * scaleConstantSmall,
        longitude: userLng + (Math.random() - 0.5) * scaleConstantSmall,
        angle: Math.random() * 2 * Math.PI,
        name: `Alien Ship ${i + 1}`,
        attributes: {
          speed: Math.floor(Math.random() * 100),
          size: (Math.random()*scaleConstantBig + 20).toString(),
          color: ['Red', 'Blue', 'Green'][Math.floor(Math.random() * 3)],
        },
      };
      ships.push(ship);
    }
    setAlienShips(ships);
  }, []);

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
  }, [generateAlienShips]);

  // Update ship positions every half second
  useEffect(() => {
    const interval = setInterval(() => {
      setAlienShips((prevShips) =>
        prevShips.map((ship) => {
          // Generate a random angle between 0 and 2π
          let plusOrMinus = Math.random() > 0.5 ? 1 : -1;
          const newAngle = (ship.angle + (Math.random() * Math.PI * .1) * plusOrMinus);
          // Set a fixed distance for movement (in degrees)
          const distance = 0.0002;
          // Calculate new position using trigonometry
          const newLat = ship.latitude + distance * ship.attributes.speed * Math.cos(newAngle);
          const newLng = ship.longitude + distance * ship.attributes.speed * Math.sin(newAngle);
          return {
            ...ship,
            angle: newAngle,
            latitude: newLat,
            longitude: newLng,
          };
        })
      );
    }, 500); // Update every 500ms (half second)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  const handleShipClick = (ship: AlienShip) => {
    setSelectedShip(ship);
  };

  const handleCloseDialog = () => {
    setSelectedShip(null);
  };

  const center = location ? { lat: location.latitude, lng: location.longitude } : { lat: 37.235, lng: -115.8111 };

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
          <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map 
              defaultCenter={center} 
              defaultZoom={10} 
              mapId="739af084373f96fe"
              style={{width: '100vw', height: '100vh'}}
            >
              {alienShips.map((ship) => (
                <AdvancedMarker
                  key={ship.id}
                  position={{ lat: ship.latitude, lng: ship.longitude }}
                  onClick={() => handleShipClick(ship)}
                >
                <SpaceShipIcon color={ship.attributes.color} size={ship.attributes.size} />
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>
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
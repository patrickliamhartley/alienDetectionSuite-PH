import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '../config/apiKey';
import SpaceShipIcon from './SpaceShipIcon';
import TerminalLoading from './TerminalLoading';

type ShipColor = 'OrangeRed' | 'DeepPink' | 'Yellow';

const generateAlienName = () => {
  const prefixes = ['Zor', 'Xyl', 'Qua', 'Vex', 'Nyx', 'Kry', 'Zyl', 'Vex', 'Nex', 'Xen'];
  const middles = ['th', 'ph', 'x', 'z', 'q', 'k', 'v', 'n', 'm', 'l'];
  const suffixes = ['or', 'ix', 'ax', 'ex', 'ox', 'ux', 'yx', 'zx', 'qx', 'nx'];
  const numbers = Math.floor(Math.random() * 999);
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const middle = middles[Math.floor(Math.random() * middles.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix}${middle}${suffix}-${numbers}`;
};

interface AlienShip {
  id: number;
  latitude: number;
  longitude: number;
  angle: number;
  name: string;
  attributes: {
    speed: number;
    size: number;
    color: ShipColor;
  };
}

let scaleConstantBig = 20;
let scaleConstantSmall = 1;
let dangerLevels: Record<ShipColor, string> = { 
  'OrangeRed': 'Low', 
  'DeepPink': 'Medium', 
  'Yellow': 'High'
};
let shipNumber = 10;

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
        name: generateAlienName(),
        attributes: {
          speed: Math.floor(Math.random() * 100),
          size: Math.random() * scaleConstantBig + 20,
          color: ['OrangeRed', 'DeepPink', 'Yellow'][Math.floor(Math.random() * 3)] as ShipColor,
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
        <p>Locating {shipNumber} alien ships in your area, click on a ship to learn more about it.</p>
      </Typography>
      {loading && <TerminalLoading />}
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
              style={{width: '75vw', height: '75vh'}}
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
            <DialogTitle>Ship Name: {selectedShip.name}</DialogTitle>
            <DialogContent>
              <Typography variant="h6" sx={{ color: 'var(--terminal-green)', mb: 2 }}>Ship Specifications</Typography>
              <Typography>Speed: {selectedShip.attributes.speed} Km/s</Typography>
              <Typography>Size: {Math.floor(selectedShip.attributes.size)} meters</Typography>
              <Typography>Color: {selectedShip.attributes.color}</Typography>
              
              <Typography variant="h6" sx={{ color: 'var(--terminal-green)', mt: 3, mb: 2 }}>Location Data</Typography>
              <Typography>Latitude: {selectedShip.latitude.toFixed(6)}°</Typography>
              <Typography>Longitude: {selectedShip.longitude.toFixed(6)}°</Typography>
              <Typography>Heading: {((selectedShip.angle * 180 / Math.PI) % 360).toFixed(1)}°</Typography>
              
              <Typography variant="h6" sx={{ color: 'var(--terminal-green)', mt: 3, mb: 2 }}>Threat Assessment</Typography>
              <Typography>Status: {selectedShip.attributes.speed > 50 ? 'High Velocity' : 'Normal Speed'}</Typography>
              <Typography>Size Classification: {selectedShip.attributes.size > 30 ? 'Large Vessel' : 'Standard Size'}</Typography>
              <Typography>Risk Level: {selectedShip.attributes.color === 'Yellow' ? '⚠️ High Alert' : 
                selectedShip.attributes.color === 'DeepPink' ? '⚠️ Caution' : '✓ Low Risk'}</Typography>
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
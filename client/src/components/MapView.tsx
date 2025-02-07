// filepath: /root/utsa/project3/Community-Support/client/src/components/MapView.tsx
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Declare google as a global variable
declare const google: any;

// Load the Google Maps JavaScript API script
const loadGoogleMapsScript = (callback: () => void) => {
  const existingScript = document.getElementById('googleMaps');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.id = 'googleMaps';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  } else {
    if (callback) callback();
  }
};

const MapView: React.FC = () => {
  const volunteers = useSelector((state: RootState) => state.volunteers.list);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
          zoom: 10,
        });

        volunteers.forEach((volunteer) => {
          if (volunteer.location && volunteer.location.coordinates && volunteer.location.coordinates.length === 2) {
            new google.maps.Marker({
              position: { lat: volunteer.location.coordinates[0], lng: volunteer.location.coordinates[1] },
              map: map,
              title: volunteer.name,
            });
          }
        });
      }
    });
  }, [volunteers]);


  return <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />;
};

export default MapView;
